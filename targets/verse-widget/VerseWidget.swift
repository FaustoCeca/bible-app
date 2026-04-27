import WidgetKit
import SwiftUI

// MARK: - Data model shared with the React Native app via App Groups.

struct DailyVerse: Codable {
    let reference: String
    let text: String

    static let placeholder = DailyVerse(
        reference: "Juan 3:16",
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
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

    private let accent = Color(red: 0.98, green: 0.75, blue: 0.14) // amber-400

    var body: some View {
        switch family {

        // Lock screen: rectangular
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 3) {
                HStack(spacing: 4) {
                    Image(systemName: "book.fill")
                        .font(.system(size: 9, weight: .semibold))
                    Text(entry.verse.reference)
                        .font(.system(size: 10, weight: .semibold))
                }
                Text(entry.verse.text)
                    .font(.system(size: 11))
                    .lineLimit(4)
                    .opacity(0.85)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

        // Lock screen: inline
        case .accessoryInline:
            Label(entry.verse.reference, systemImage: "book.fill")
                .font(.system(size: 12, weight: .medium))

        // Lock screen: circular
        case .accessoryCircular:
            ZStack {
                Circle()
                    .fill(.ultraThinMaterial)
                VStack(spacing: 1) {
                    Image(systemName: "book.fill")
                        .font(.system(size: 14, weight: .semibold))
                    Text(entry.verse.reference
                            .components(separatedBy: ":").first ?? "")
                        .font(.system(size: 8, weight: .bold))
                        .lineLimit(1)
                }
            }

        // Home screen: small
        case .systemSmall:
            VStack(alignment: .leading, spacing: 6) {
                Image(systemName: "book.fill")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(accent)
                Spacer(minLength: 0)
                Text("\u{201C}\(entry.verse.text)\u{201D}")
                    .font(.system(size: 11, weight: .medium, design: .serif))
                    .italic()
                    .lineLimit(7)
                    .foregroundColor(.white.opacity(0.92))
                Text(entry.verse.reference)
                    .font(.system(size: 9, weight: .bold))
                    .foregroundColor(accent)
            }
            .padding(12)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)

        // Home screen: medium & larger
        default:
            HStack(alignment: .top, spacing: 12) {
                RoundedRectangle(cornerRadius: 2)
                    .fill(accent)
                    .frame(width: 3)

                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 6) {
                        Image(systemName: "book.fill")
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(accent)
                        Text("Versículo del día")
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(accent)
                        Spacer()
                    }
                    Text("\u{201C}\(entry.verse.text)\u{201D}")
                        .font(.system(size: 13, weight: .regular, design: .serif))
                        .italic()
                        .lineLimit(6)
                        .minimumScaleFactor(0.75)
                        .foregroundColor(.white.opacity(0.92))
                    Spacer(minLength: 0)
                    Text("\u{2014} \(entry.verse.reference)")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(accent)
                }
            }
            .padding(14)
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
