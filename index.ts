import Constants, { ExecutionEnvironment } from 'expo-constants';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

// `react-native-android-widget` requiere código nativo, por lo que solo se
// registra cuando corremos en un dev client / standalone (no en Expo Go).
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

if (!isExpoGo) {
  // Import dinámico para que Expo Go ni siquiera intente cargar el módulo nativo.
  Promise.all([
    import('react-native-android-widget'),
    import('./widgets/widgetTaskHandler'),
  ])
    .then(([{ registerWidgetTaskHandler }, { widgetTaskHandler }]) => {
      registerWidgetTaskHandler(widgetTaskHandler);
    })
    .catch(() => {
      // Silencioso: el widget solo funciona en builds nativos.
    });
}
