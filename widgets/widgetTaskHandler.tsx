import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { VerseWidget } from './VerseWidget';
import { getTodayVerse } from '../src/services/dailyVerse';

const nameToWidget = {
  Verse: VerseWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];
  if (!Widget) return;

  const verse = getTodayVerse();

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget verse={verse} />);
      break;
    default:
      break;
  }
}
