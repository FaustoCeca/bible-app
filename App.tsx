import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Share,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { getTodayVerse } from './src/services/dailyVerse';
import { syncVerseToWidget } from './src/services/widgetSync';
import type { BibleVerse } from './src/data/verses';
import { TutorialModal } from './src/components/TutorialModal';
import { DonationModal } from './src/components/DonationModal';

// Reemplazá con tu link real de donaciones (Cafecito, Mercado Pago, PayPal, etc.)
// o dejá undefined para ocultar el botón.
const DONATION_URL: string | undefined = 'link.mercadopago.com.ar/faustoceca';

export default function App() {
  const [verse, setVerse] = useState<BibleVerse>(() => getTodayVerse());
  const [refreshing, setRefreshing] = useState(false);
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [donationVisible, setDonationVisible] = useState(true); 

  const today = useMemo(
    () =>
      new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    [],
  );

  useEffect(() => {
    syncVerseToWidget(verse).catch(() => undefined);
  }, [verse]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const v = getTodayVerse();
    setVerse(v);
    await syncVerseToWidget(v);
    setRefreshing(false);
  }, []);

  const onShare = useCallback(async () => {
    await Share.share({
      message: `"${verse.text}"\n— ${verse.reference}`,
    });
  }, [verse]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
          }
        >
          <Text style={styles.date}>{today}</Text>
          <Text style={styles.title}>Versículo del día</Text>

          <View style={styles.card}>
            <Text style={styles.verseText}>“{verse.text}”</Text>
            <Text style={styles.reference}>— {verse.reference}</Text>
          </View>

          <Pressable style={styles.button} onPress={onShare}>
            <Text style={styles.buttonText}>Compartir</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => setTutorialVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Cómo agregar el widget"
          >
            <Text style={styles.secondaryButtonText}>📖 Cómo agregar el widget</Text>
          </Pressable>

          <Text style={styles.hint}>
            Mantené presionada tu pantalla de inicio para añadir el widget y ver el versículo
            del día sin abrir la app.
          </Text>
        </ScrollView>
        <TutorialModal
          visible={tutorialVisible}
          onClose={() => setTutorialVisible(false)}
        />
        <DonationModal
          visible={donationVisible}
          onClose={() => setDonationVisible(false)}
          donationUrl={DONATION_URL}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  container: { flexGrow: 1, padding: 24, paddingTop: 48 },
  date: {
    color: '#94a3b8',
    fontSize: 14,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '700', marginBottom: 24 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 24, marginBottom: 24 },
  verseText: { color: '#f1f5f9', fontSize: 20, lineHeight: 30, fontStyle: 'italic' },
  reference: {
    color: '#fbbf24',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#fbbf24',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  secondaryButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 16,
  },
  hint: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 32,
    textAlign: 'center',
    lineHeight: 20,
  },
});
