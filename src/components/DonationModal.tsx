import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  /**
   * Opcional: link de donación (Cafecito, Mercado Pago, PayPal,
   * Buy Me a Coffee, etc.). Si no se provee, se oculta el botón.
   */
  donationUrl?: string;
}

export function DonationModal({ visible, onClose, donationUrl }: Props) {
  const handleDonate = async () => {
    if (!donationUrl) return;
    // Si no incluye un esquema (http://, https://, mailto:, etc.) le anteponemos https://
    // así podés escribir el link sin protocolo y siempre se abrirá correctamente.
    const url = /^[a-z][a-z0-9+.-]*:/i.test(donationUrl)
      ? donationUrl
      : `https://${donationUrl}`;
    try {
      await Linking.openURL(url);
    } catch {
      // Silencioso: si falla, no bloqueamos al usuario.
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🙏</Text>
          <Text style={styles.title}>Una palabra antes de empezar</Text>

          <Text style={styles.body}>
            Esta app es <Text style={styles.bold}>totalmente gratuita</Text> y la creé con un
            único propósito: <Text style={styles.bold}>difundir la Palabra de Dios</Text> a
            quienes quieran tener un versículo cada día en su celular.
          </Text>

          <Text style={styles.body}>
            Mantenerla y mejorarla tiene un costo (servidores, licencias y tiempo). Si quisieras
            colaborar, tu aporte es <Text style={styles.bold}>completamente opcional</Text> y se
            usará únicamente para mantener la app viva y agregar nuevas funciones.
          </Text>

          <Text style={styles.verse}>
            "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque
            Dios ama al dador alegre."{'\n'}
            <Text style={styles.verseRef}>— 2 Corintios 9:7</Text>
          </Text>

          {donationUrl ? (
            <Pressable
              style={styles.donateBtn}
              onPress={handleDonate}
              accessibilityRole="button"
              accessibilityLabel="Hacer una donación"
            >
              <Text style={styles.donateBtnText}>❤️ Quiero colaborar</Text>
            </Pressable>
          ) : null}

          <Pressable
            style={styles.closeBtn}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Continuar a la app"
          >
            <Text style={styles.closeBtnText}>Continuar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 440,
    borderWidth: 1,
    borderColor: '#334155',
  },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
  title: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  body: { color: '#cbd5e1', fontSize: 16, lineHeight: 24, marginBottom: 14 },
  bold: { color: '#f8fafc', fontWeight: '700' },
  verse: {
    color: '#fde68a',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    marginBottom: 22,
  },
  verseRef: { color: '#fbbf24', fontWeight: '700', fontStyle: 'normal' },
  donateBtn: {
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  donateBtnText: { color: '#0f172a', fontWeight: '800', fontSize: 16 },
  closeBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
  },
  closeBtnText: { color: '#f8fafc', fontWeight: '700', fontSize: 16 },
});
