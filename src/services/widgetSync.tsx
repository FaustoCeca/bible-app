import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BibleVerse } from '../data/verses';
import VerseWidgetBridge from '../../modules/verse-widget-bridge';
import { VerseWidget } from '../../widgets/VerseWidget';

/**
 * Sincroniza el versículo del día con los widgets nativos.
 *
 * iOS:
 *   El widget (WidgetKit) corre en un proceso aparte y no puede ejecutar el JS
 *   de la app, así que lee el versículo de un App Group compartido. La app lo
 *   escribe ahí con el módulo nativo `VerseWidgetBridge`.
 *
 * Android:
 *   `react-native-android-widget` renderiza el widget ejecutando JS, así que el
 *   propio `widgetTaskHandler` ya calcula el versículo del día y el widget se
 *   actualiza solo. Acá además pedimos un refresco inmediato de las instancias
 *   ya agregadas a la home, para que no haya que esperar al próximo ciclo.
 */

const APP_GROUP = 'group.com.biblemobileapp.widget';
const STORAGE_KEY = 'daily_verse';
/** Debe coincidir con `kind` en targets/verse-widget/VerseWidget.swift. */
const IOS_WIDGET_KIND = 'VerseWidget';
/** Debe coincidir con el `name` del widget en app.json. */
const ANDROID_WIDGET_NAME = 'Verse';

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
  // `VerseWidgetBridge` es un módulo Expo local (modules/verse-widget-bridge).
  // Es `null` en Expo Go o en un build hecho antes de correr `expo prebuild`.
  if (!VerseWidgetBridge) {
    if (__DEV__) {
      console.warn(
        '[widgetSync] VerseWidgetBridge no disponible. El widget iOS necesita un dev build: ' +
          'corré `expo prebuild -p ios` y `expo run:ios` (no funciona en Expo Go).',
      );
    }
    return;
  }

  try {
    await VerseWidgetBridge.setVerse(APP_GROUP, verse.reference, verse.text);
    VerseWidgetBridge.reloadTimelines(IOS_WIDGET_KIND);
  } catch (err) {
    console.warn('[widgetSync] iOS sync failed', err);
  }
}

async function syncAndroid(verse: BibleVerse) {
  try {
    // Import dinámico: es un módulo nativo que solo existe en builds de Android.
    const mod = await import('react-native-android-widget').catch(() => null);
    if (!mod?.requestWidgetUpdate) return;

    // Re-renderiza todas las instancias del widget ya agregadas con el
    // versículo de hoy. `renderWidget` debe devolver el widget real:
    // devolver `null` hace que la librería falle al construir el árbol.
    await mod.requestWidgetUpdate({
      widgetName: ANDROID_WIDGET_NAME,
      renderWidget: () => <VerseWidget verse={verse} />,
      widgetNotFound: () => {
        // El usuario aún no agregó el widget a la home. Silencioso.
      },
    });
  } catch (err) {
    console.warn('[widgetSync] Android sync failed', err);
  }
}
