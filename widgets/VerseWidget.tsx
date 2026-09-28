import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';
import type { BibleVerse } from '../src/data/verses';

interface Props {
  verse: BibleVerse;
}

/**
 * Widget Android (home screen) renderizado por react-native-android-widget.
 * Para lock screen en Android moderno (Android 14+) los widgets de home
 * pueden agregarse al Lock Screen desde Ajustes > Pantalla de bloqueo.
 */
export function VerseWidget({ verse }: Props) {
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      accessibilityLabel="Abrir la app Versículo del Día"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#0f172a',
        borderRadius: 24,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <TextWidget
        text={`"${verse.text}"`}
        maxLines={5}
        style={{
          fontSize: 13,
          color: '#f1f5f9',
          fontStyle: 'italic',
        }}
      />
      <TextWidget
        text={`— ${verse.reference}`}
        style={{
          fontSize: 12,
          color: '#fbbf24',
          fontWeight: '700',
          marginTop: 8,
        }}
      />
    </FlexWidget>
  );
}
