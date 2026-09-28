import ExpoModulesCore
import WidgetKit

/// Puente nativo entre la app React Native y la extensión de widget (WidgetKit).
///
/// Escribe el versículo del día en el `UserDefaults` del App Group compartido
/// para que el widget (`targets/verse-widget/VerseWidget.swift`) lo pueda leer,
/// y le pide a WidgetKit que recargue las timelines.
public class VerseWidgetBridgeModule: Module {
  /// Clave bajo la que el widget espera leer el versículo.
  /// Debe coincidir con `VerseProvider.storageKey` en `VerseWidget.swift`.
  private static let storageKey = "daily_verse"

  public func definition() -> ModuleDefinition {
    Name("VerseWidgetBridge")

    AsyncFunction("setVerse") { (appGroup: String, reference: String, text: String) -> Bool in
      guard let defaults = UserDefaults(suiteName: appGroup) else {
        throw InvalidAppGroupException(appGroup)
      }

      let payload = ["reference": reference, "text": text]
      let data = try JSONSerialization.data(withJSONObject: payload, options: [])

      guard let json = String(data: data, encoding: .utf8) else {
        throw EncodingFailedException()
      }

      defaults.set(json, forKey: Self.storageKey)
      return true
    }

    Function("reloadTimelines") { (kind: String) in
      WidgetCenter.shared.reloadTimelines(ofKind: kind)
    }

    Function("reloadAllTimelines") {
      WidgetCenter.shared.reloadAllTimelines()
    }
  }
}

/// El App Group no existe o no está habilitado en las capabilities del target.
internal final class InvalidAppGroupException: GenericException<String> {
  override var reason: String {
    "No se pudo acceder al App Group '\(param)'. Verificá que esté habilitado " +
    "en las capabilities del target de la app y del widget."
  }
}

/// El versículo no se pudo serializar a JSON UTF-8.
internal final class EncodingFailedException: Exception {
  override var reason: String {
    "No se pudo serializar el versículo a JSON."
  }
}
