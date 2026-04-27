import { Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BibleVerse } from '../data/verses';

/**
 * Sincroniza el versículo del día con el almacenamiento que leen los widgets nativos.
 *
 * iOS:
 *   El widget (WidgetKit) lee un UserDefaults con suite `group.com.biblemobileapp.widget`.
 *   Hay que configurar App Groups en el target de la app y del widget.
 *
 * Android:
 *   `react-native-android-widget` expone un API JS para actualizar el widget;
 *   alternativamente se puede escribir en SharedPreferences. Aquí usamos el paquete.
 */

const APP_GROUP = 'group.com.biblemobileapp.widget';
const STORAGE_KEY = 'daily_verse';

export async function syncVerseToWidget(verse: BibleVerse): Promise<void> {
  // Caché local para la app.
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(verse));

  if (Platform.OS === 'ios') {
    await syncIOS(verse);
  } else if (Platform.OS === 'android') {
    await syncAndroid(verse);
  }
}

async function syncIOS(verse: BibleVerse) {
  try {
    // Expo SDK expone SharedGroupPreferences a través de `expo-shared-preferences`
    // o podés escribir un módulo nativo simple. Placeholder: módulo nativo `VerseWidgetBridge`.
    const bridge = (NativeModules as any).VerseWidgetBridge;
    if (bridge?.setVerse) {
      await bridge.setVerse(APP_GROUP, verse.reference, verse.text);
      bridge.reloadTimelines?.('VerseWidget');
    } else {
      console.warn(
        '[widgetSync] VerseWidgetBridge no está registrado. Correr `expo prebuild` y configurar el target iOS.',
      );
    }
  } catch (err) {
    console.warn('[widgetSync] iOS sync failed', err);
  }
}

async function syncAndroid(verse: BibleVerse) {
  try {
    // `react-native-android-widget` expone `requestWidgetUpdate` al que le pasamos
    // el nuevo estado. El componente del widget lee de SharedPreferences a través
    // del hook que le pasamos en `renderWidget`. Para simplificar, guardamos el
    // versículo en AsyncStorage (respaldado por SharedPreferences) y disparamos
    // la actualización desde el componente widget.
    const mod = await import('react-native-android-widget').catch(() => null);
    if (mod?.requestWidgetUpdate) {
      mod.requestWidgetUpdate({
        widgetName: 'Verse',
        renderWidget: (_props: any) => null as any, // el componente real se define en /widgets
        widgetNotFound: () => {
          // El usuario aún no agregó el widget a la home. Silencioso.
        },
      });
    }
  } catch (err) {
    console.warn('[widgetSync] Android sync failed', err);
  }
}
