import WidgetKit
import SwiftUI

// MARK: - Data model shared with the React Native app via App Groups.

struct DailyVerse: Codable {
    let reference: String
    let text: String

    static let placeholder = DailyVerse(
        reference: "Juan 3:16",
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito..."
    )
}

// MARK: - Entry

struct VerseEntry: TimelineEntry {
    let date: Date
    let verse: DailyVerse
}

// MARK: - Provider

struct VerseProvider: TimelineProvider {
    static let appGroup = "group.com.biblemobileapp.widget"
    static let storageKey = "daily_verse"

    private func loadVerse() -> DailyVerse {
        guard
            let defaults = UserDefaults(suiteName: Self.appGroup),
            let raw = defaults.string(forKey: Self.storageKey),
            let data = raw.data(using: .utf8),
            let verse = try? JSONDecoder().decode(DailyVerse.self, from: data)
        else {
            return .placeholder
        }
        return verse
    }

    func placeholder(in context: Context) -> VerseEntry {
        VerseEntry(date: Date(), verse: .placeholder)
    }

    func getSnapshot(in context: Context, completion: @escaping (VerseEntry) -> Void) {
        completion(VerseEntry(date: Date(), verse: loadVerse()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<VerseEntry>) -> Void) {
        let now = Date()
        let entry = VerseEntry(date: now, verse: loadVerse())
        // Refresca a la próxima medianoche.
        let nextMidnight = Calendar.current.nextDate(
            after: now,
            matching: DateComponents(hour: 0, minute: 1),
            matchingPolicy: .nextTime
        ) ?? now.addingTimeInterval(60 * 60)
        completion(Timeline(entries: [entry], policy: .after(nextMidnight)))
    }
}

// MARK: - Views

struct VerseWidgetEntryView: View {
    var entry: VerseEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .accessoryRectangular:
            // Lock screen rectangular.
            VStack(alignment: .leading, spacing: 2) {
                Text(entry.verse.reference)
                    .font(.caption2.bold())
                Text(entry.verse.text)
                    .font(.caption2)
                    .lineLimit(3)
            }
        case .accessoryInline:
            Text("📖 \(entry.verse.reference)")
        case .accessoryCircular:
            VStack {
                Text("📖").font(.title3)
                Text(entry.verse.reference)
                    .font(.system(size: 8, weight: .bold))
                    .lineLimit(1)
            }
        default:
            // Home screen.
            VStack(alignment: .leading, spacing: 8) {
                Text("Versículo del día")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Text("“\(entry.verse.text)”")
                    .font(.system(size: 13))
                    .italic()
                    .lineLimit(5)
                Spacer(minLength: 0)
                Text("— \(entry.verse.reference)")
                    .font(.caption.bold())
                    .foregroundColor(Color("AccentColor", bundle: nil))
            }
            .padding(12)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        }
    }
}

// MARK: - Widget

@main
struct VerseWidget: Widget {
    let kind = "VerseWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: VerseProvider()) { entry in
            if #available(iOS 17.0, *) {
                VerseWidgetEntryView(entry: entry)
                    .containerBackground(Color(red: 0.06, green: 0.09, blue: 0.16), for: .widget)
            } else {
                VerseWidgetEntryView(entry: entry)
                    .background(Color(red: 0.06, green: 0.09, blue: 0.16))
            }
        }
        .configurationDisplayName("Versículo del día")
        .description("Muestra el versículo bíblico diario.")
        .supportedFamilies([
            .systemSmall,
            .systemMedium,
            .accessoryRectangular,
            .accessoryInline,
            .accessoryCircular
        ])
    }
}
