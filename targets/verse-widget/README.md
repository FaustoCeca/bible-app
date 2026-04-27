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

## Puente nativo recomendado

Para escribir en el App Group desde JS, creá un módulo nativo simple
`VerseWidgetBridge` (Swift) que haga:

```swift
let d = UserDefaults(suiteName: appGroup)
d?.set(jsonString, forKey: "daily_verse")
WidgetCenter.shared.reloadTimelines(ofKind: "VerseWidget")
```
