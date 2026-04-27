import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

type OS = 'ios' | 'android';
type Location = 'home' | 'lock';

interface Step {
  icon: string;
  title: string;
  description: string;
}

const TUTORIALS: Record<OS, Record<Location, Step[]>> = {
  ios: {
    home: [
      {
        icon: '👆',
        title: 'Mantené presionada la pantalla',
        description:
          'Tocá un espacio vacío de la pantalla de inicio del iPhone y mantené el dedo apretado hasta que los íconos comiencen a moverse.',
      },
      {
        icon: '➕',
        title: 'Tocá el botón "+"',
        description:
          'Aparecerá un signo más (+) en la esquina superior izquierda. Tocalo para abrir la galería de widgets.',
      },
      {
        icon: '🔍',
        title: 'Buscá "Versículo del Día"',
        description:
          'Escribí el nombre de la app en la barra de búsqueda o desplazate hasta encontrarla en la lista.',
      },
      {
        icon: '📐',
        title: 'Elegí el tamaño',
        description:
          'Deslizá para ver los tamaños disponibles (chico o mediano) y tocá el que prefieras.',
      },
      {
        icon: '✅',
        title: 'Tocá "Agregar Widget"',
        description:
          'Presioná el botón azul, ubicá el widget donde más te guste y tocá "Listo" arriba a la derecha.',
      },
    ],
    lock: [
      {
        icon: '🔒',
        title: 'Bloqueá tu iPhone',
        description:
          'Necesitás iOS 16 o más nuevo. Apretá el botón lateral una vez para bloquear la pantalla.',
      },
      {
        icon: '👆',
        title: 'Mantené presionada la pantalla bloqueada',
        description:
          'Sin desbloquearla, mantené el dedo sobre la pantalla bloqueada hasta que aparezca el botón "Personalizar".',
      },
      {
        icon: '🎨',
        title: 'Tocá "Personalizar"',
        description: 'Elegí "Pantalla bloqueada" para editar los widgets disponibles.',
      },
      {
        icon: '➕',
        title: 'Agregá un widget',
        description:
          'Tocá el recuadro debajo de la hora y buscá "Versículo del Día" en la lista.',
      },
      {
        icon: '✅',
        title: 'Guardá los cambios',
        description:
          'Tocá "Listo" arriba a la derecha. ¡El versículo aparecerá en la pantalla de bloqueo!',
      },
    ],
  },
  android: {
    home: [
      {
        icon: '👆',
        title: 'Mantené presionada la pantalla',
        description:
          'Tocá un espacio vacío de la pantalla principal y mantené el dedo apretado por 2 segundos.',
      },
      {
        icon: '🧩',
        title: 'Tocá "Widgets"',
        description:
          'Aparecerá un menú abajo. Tocá la opción "Widgets" (puede tener un ícono de cuadritos).',
      },
      {
        icon: '🔍',
        title: 'Buscá "Versículo del Día"',
        description:
          'Desplazate por la lista hasta encontrar la app, o usá el buscador si tu celular lo tiene.',
      },
      {
        icon: '✋',
        title: 'Arrastrá el widget',
        description:
          'Mantené presionado el widget y arrastralo hasta el lugar de la pantalla donde querés ponerlo.',
      },
      {
        icon: '✅',
        title: '¡Listo!',
        description:
          'Soltá el dedo y el widget quedará fijo. Si querés moverlo después, mantenelo presionado.',
      },
    ],
    lock: [
      {
        icon: '⚙️',
        title: 'Abrí los Ajustes',
        description:
          'En Android 14 o más nuevo, abrí la app de Ajustes (el ícono del engranaje).',
      },
      {
        icon: '🔒',
        title: 'Entrá en "Pantalla de bloqueo"',
        description:
          'Buscá la opción "Pantalla de bloqueo" o "Lock screen" dentro de los ajustes.',
      },
      {
        icon: '🧩',
        title: 'Activá los widgets',
        description:
          'Buscá la opción "Widgets" o "Mostrar widgets en la pantalla bloqueada" y activala.',
      },
      {
        icon: '➕',
        title: 'Agregá "Versículo del Día"',
        description:
          'Elegí los widgets que querés ver bloqueado y seleccioná el de esta app.',
      },
      {
        icon: 'ℹ️',
        title: 'Si no aparece la opción',
        description:
          'Algunos celulares Android no permiten widgets en la pantalla de bloqueo. En ese caso, podés usarlo en la pantalla de inicio.',
      },
    ],
  },
};

export function TutorialModal({ visible, onClose }: Props) {
  const [os, setOs] = useState<OS>(Platform.OS === 'ios' ? 'ios' : 'android');
  const [location, setLocation] = useState<Location>('home');

  const steps = TUTORIALS[os][location];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cómo agregar el widget</Text>
          <Pressable
            onPress={onClose}
            style={styles.closeBtn}
            hitSlop={16}
            accessibilityLabel="Cerrar tutorial"
            accessibilityRole="button"
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>Tu celular es:</Text>
          <View style={styles.tabs}>
            <TabButton
              label="📱 iPhone"
              active={os === 'ios'}
              onPress={() => setOs('ios')}
            />
            <TabButton
              label="🤖 Android"
              active={os === 'android'}
              onPress={() => setOs('android')}
            />
          </View>

          <Text style={styles.sectionLabel}>¿Dónde lo querés ver?</Text>
          <View style={styles.tabs}>
            <TabButton
              label="🏠 Inicio"
              active={location === 'home'}
              onPress={() => setLocation('home')}
            />
            <TabButton
              label="🔒 Bloqueada"
              active={location === 'lock'}
              onPress={() => setLocation('lock')}
            />
          </View>

          <View style={styles.stepsContainer}>
            {steps.map((step, idx) => (
              <View key={idx} style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepIcon}>{step.icon}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipText}>
              💡 Si tenés alguna duda, pedile ayuda a un familiar o conocido. ¡Una vez que lo
              agregues, el versículo se actualizará solo cada día!
            </Text>
          </View>

          <Pressable style={styles.doneBtn} onPress={onClose}>
            <Text style={styles.doneBtnText}>Entendido</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, active && styles.tabActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalRoot: { flex: 1, backgroundColor: '#0f172a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '700', flex: 1 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  scroll: { padding: 20, paddingBottom: 40 },
  sectionLabel: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 12,
  },
  tabs: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: { backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
  tabText: { color: '#cbd5e1', fontSize: 15, fontWeight: '600' },
  tabTextActive: { color: '#0f172a', fontWeight: '800' },
  stepsContainer: { marginTop: 20, gap: 14 },
  stepCard: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { color: '#0f172a', fontSize: 18, fontWeight: '800' },
  stepIcon: { fontSize: 36 },
  stepTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  stepDescription: { color: '#cbd5e1', fontSize: 16, lineHeight: 24 },
  tipBox: {
    backgroundColor: '#0c4a6e',
    borderRadius: 14,
    padding: 18,
    marginTop: 24,
  },
  tipText: { color: '#e0f2fe', fontSize: 15, lineHeight: 22 },
  doneBtn: {
    backgroundColor: '#fbbf24',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  doneBtnText: { color: '#0f172a', fontSize: 18, fontWeight: '800' },
});
