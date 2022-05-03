import { GraphElement } from '@csnext/cs-data';

export class DragUtils {
  public static setElementData(evt: DragEvent, element?: GraphElement) {
    if (!element || !evt.currentTarget || !evt.dataTransfer) { return; }
    (evt.currentTarget as any).style.border = 'dashed';
    (evt.currentTarget as any).style['border-width'] = '0.5px';
    evt.dataTransfer.setData('text', JSON.stringify({ elementid: element.id, ft: element._featureType?.type }));
    evt.dataTransfer.effectAllowed = 'copy';
    evt.dataTransfer.dropEffect = 'copy';
  }

  public static getElementData(event: DragEvent): { elementid?: string; ft?: string }  {
    if (event.dataTransfer) {
      const info = event.dataTransfer.getData('text');
      if (info.startsWith('{') && info.endsWith('}')) {
        const data = JSON.parse(info);
        return data;
      }        
    }
    return {
      elementid: undefined,
      ft: undefined
    }
  }
}
