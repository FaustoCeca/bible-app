# Bible Mobile App - Copilot Instructions

## Project Overview
React Native (Expo) TypeScript app that shows a daily Bible verse, with native widgets on iOS (WidgetKit) and Android (AppWidget / Jetpack Glance) for both home screen and lock screen.

## Stack
- Expo SDK (prebuild workflow) + TypeScript
- React Navigation
- AsyncStorage / expo-secure-store for local persistence
- iOS widgets: `@bacons/apple-targets` (Swift + SwiftUI / WidgetKit)
- Android widgets: `react-native-android-widget`
- Shared storage between app and widget: App Groups (iOS) / SharedPreferences (Android)

## Architecture
- `src/data/verses.ts` – list of Bible verses
- `src/services/dailyVerse.ts` – picks a deterministic verse per day
- `src/services/widgetSync.ts` – writes current verse to shared storage for widgets
- `targets/verse-widget/` – iOS widget (Swift)
- `widgets/` – Android widget components (TSX rendered by react-native-android-widget)

## Conventions
- Spanish UI strings
- Use RVR1960 or similar public-domain Bible translation
- Never commit signing keys or Apple Team IDs
