# iOS Widget (WidgetKit)

Este target se compila como una extensión de widget nativa en iOS usando
`@bacons/apple-targets`. Soporta:

- **Home Screen**: `systemSmall`, `systemMedium`
- **Lock Screen (iOS 16+)**: `accessoryRectangular`, `accessoryInline`, `accessoryCircular`

## Cómo lee el versículo

El widget lee de `UserDefaults(suiteName: "group.com.biblemobileapp.widget")`
la clave `daily_verse` (JSON: `{ reference, text }`). La app RN lo escribe
en `src/services/widgetSync.ts`.

## Setup

1. Poné tu Apple Team ID en [app.json](../../app.json) en el plugin `@bacons/apple-targets`.
2. Ejecutá `npx expo prebuild -p ios --clean`.
3. Abrí `ios/bible-mobile-app.xcworkspace` y verificá que:
   - El target principal y el widget comparten el App Group `group.com.biblemobileapp.widget`.
   - Ambos tienen el mismo Team ID firmado.
4. `npx expo run:ios` (o desde Xcode).

## Puente nativo (`VerseWidgetBridge`)

El puente que escribe en el App Group desde JS **ya está implementado** como
módulo Expo local en [`modules/verse-widget-bridge/`](../../modules/verse-widget-bridge):

- `ios/VerseWidgetBridgeModule.swift` — escribe `daily_verse` en el
  `UserDefaults` del App Group y llama `WidgetCenter.shared.reloadTimelines`.
- `index.ts` — expone `setVerse()`, `reloadTimelines()` y `reloadAllTimelines()`
  a JavaScript.

Al estar en `modules/` (fuera de `ios/`), Expo lo autoenlaza solo y **sobrevive
a `expo prebuild --clean`** — no hay que agregar nada en Xcode a mano.

`src/services/widgetSync.ts` lo usa así:

```ts
import VerseWidgetBridge from '../../modules/verse-widget-bridge';

await VerseWidgetBridge.setVerse(appGroup, reference, text);
VerseWidgetBridge.reloadTimelines('VerseWidget');
```
