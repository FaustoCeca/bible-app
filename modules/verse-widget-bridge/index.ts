import { requireOptionalNativeModule } from 'expo-modules-core';

/**
 * API del módulo nativo `VerseWidgetBridge` (iOS).
 *
 * Escribe el versículo del día en el `UserDefaults` del App Group compartido
 * para que la extensión de widget (WidgetKit) lo pueda leer.
 */
export interface VerseWidgetBridgeModule {
  /**
   * Guarda el versículo (JSON `{ reference, text }`) en el `UserDefaults` del
   * App Group indicado, bajo la clave `daily_verse`.
   * Resuelve en `true` si se escribió correctamente; rechaza si el App Group
   * no está habilitado en las capabilities del target.
   */
  setVerse(appGroup: string, reference: string, text: string): Promise<boolean>;
  /** Pide a WidgetKit que recargue las timelines del widget con ese `kind`. */
  reloadTimelines(kind: string): void;
  /** Recarga las timelines de todos los widgets de la app. */
  reloadAllTimelines(): void;
}

/**
 * Instancia del módulo nativo, o `null` cuando no está disponible:
 * Android, Expo Go, web, o un build hecho antes de correr `expo prebuild`.
 * Quien lo use debe contemplar el caso `null`.
 */
const VerseWidgetBridge = requireOptionalNativeModule<VerseWidgetBridgeModule>(
  'VerseWidgetBridge',
);

export default VerseWidgetBridge;
