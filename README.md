# 📖 Versículo del Día

App móvil (iOS + Android) en React Native / Expo que muestra un versículo bíblico cada día y permite agregarlo como **widget en la pantalla de inicio y en la pantalla de bloqueo**.

## Características

- ✅ Versículo diario determinista (todos los usuarios ven el mismo versículo el mismo día).
- ✅ Pull-to-refresh y botón para compartir.
- ✅ Widget nativo **iOS (WidgetKit)**: Home + Lock Screen (iOS 16+).
- ✅ Widget nativo **Android (AppWidget)** vía [`react-native-android-widget`].
- ✅ UI en español, traducción RVR1909 (dominio público).

## Stack

| Capa | Tecnología |
|---|---|
| App | Expo SDK + TypeScript |
| iOS widget | Swift + SwiftUI + WidgetKit (`@bacons/apple-targets`) |
| Android widget | `react-native-android-widget` (Kotlin + Glance bajo el capó) |
| Shared storage | App Groups (iOS) / SharedPreferences (Android) |
| Local cache | AsyncStorage |

## Estructura

```
├─ App.tsx                          # UI principal
├─ index.ts                         # Registra app + handler del widget Android
├─ src/
│  ├─ data/verses.ts                # Lista de versículos
│  └─ services/
│     ├─ dailyVerse.ts              # Selecciona el versículo del día
│     └─ widgetSync.tsx             # Publica versículo a los widgets nativos
├─ widgets/                         # Widget Android (TSX)
│  ├─ VerseWidget.tsx
│  └─ widgetTaskHandler.tsx
├─ targets/verse-widget/            # Widget iOS (Swift / SwiftUI)
│  ├─ VerseWidget.swift
│  └─ expo-target.config.json
└─ modules/verse-widget-bridge/     # Módulo Expo local: puente JS → App Group iOS
   ├─ index.ts
   └─ ios/VerseWidgetBridgeModule.swift
```

## Requisitos

- Node 18+
- **iOS**: macOS + Xcode 15+, cuenta Apple Developer (necesaria para App Groups y widgets en device).
- **Android**: Android Studio + SDK Platform 34+.

## Instalación

```bash
npm install
```

## Desarrollo

> ⚠️ Los widgets nativos **no corren en Expo Go**. Hay que usar `expo prebuild` + dev client.

### Android

```bash
npx expo prebuild -p android --clean
npx expo run:android
```

Para agregar el widget: mantené presionada la home de Android → Widgets → "Versículo del día".

### iOS

1. Reemplazá `REPLACE_WITH_YOUR_APPLE_TEAM_ID` en [app.json](./app.json).
2. Prebuild + run:
   ```bash
   npx expo prebuild -p ios --clean
   npx expo run:ios
   ```
3. En Xcode: verificá que **ambos targets** (app y widget) tengan activado el App Group `group.com.biblemobileapp.widget`.
4. Para agregar el widget: mantené presionada la home del iPhone → `+` → buscá "Versículo del día".
5. Para el **lock screen** (iOS 16+): editá la pantalla de bloqueo → agregar widget → elegí tamaño `accessoryRectangular`, `accessoryCircular` o `accessoryInline`.

## Cómo se sincroniza el versículo con el widget

`src/services/widgetSync.ts` escribe el versículo actual en:

- **iOS**: `UserDefaults(suiteName: "group.com.biblemobileapp.widget")` → clave `daily_verse` (JSON).  
  Después llama `WidgetCenter.shared.reloadTimelines(ofKind: "VerseWidget")`.
- **Android**: solicita un update a `react-native-android-widget`, que re-renderiza el componente `widgets/VerseWidget.tsx` con el versículo del día calculado por `dailyVerse.ts`.

El puente JS → App Group de iOS está implementado como módulo Expo local en [`modules/verse-widget-bridge/`](./modules/verse-widget-bridge) (`VerseWidgetBridge`). Se autoenlaza solo y sobrevive a `expo prebuild --clean`; ver [targets/verse-widget/README.md](targets/verse-widget/README.md).

## Ampliar la lista de versículos

Editá [src/data/verses.ts](src/data/verses.ts) y agregá objetos `{ reference, text }`. El servicio diario toma `dayIndex % VERSES.length`, así que cuantos más versículos, más tarda en repetirse el ciclo.

## Licencia

Traducción bíblica: **Reina-Valera 1909** (dominio público). La RVR1960 NO es de dominio público — su copyright pertenece a Sociedades Bíblicas Unidas — por eso usamos la 1909 (publicada hace más de 115 años, traductores fallecidos hace siglos).  
Código: MIT.
