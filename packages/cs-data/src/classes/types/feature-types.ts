import { Form } from '@csnext/cs-core';
import { InfoPanel } from '../..';
import { FeatureType } from './feature-type';

@Form({
  title: 'Feature Types',
})
export class FeatureTypes {
  [key: string]: FeatureType;
}

export class FeatureTypeHelpers {
  public static SlimTypes(types: FeatureTypes): FeatureTypes {
    let res: FeatureTypes = {};
    for (let [type, value] of Object.entries(types)) {
      let ft = value._originalFeatureType;
      if (ft) {
        if (!ft.properties) {
          ft.properties = [];
        }
        let f = JSON.parse(
          JSON.stringify(
            ft,
            (key, value: FeatureType) => {
              if (value.properties) {
                value.properties = value.properties.filter(
                  (t: any) => !t._originalType || t._originalType === value.type
                );
              } else {
                // value.properties = [];
              }
              if (key.startsWith('_')) {
                return undefined;
              }
              if (key === 'propertyMap') {
                return undefined;
              }
              if (value.infoPanels) {
                const newPanels: { [key: string]: InfoPanel } = {};
                Object.keys(value.infoPanels).forEach((key) => {
                  if (
                    key &&
                    value?.infoPanels &&
                    value.infoPanels[key] &&
                    !value.infoPanels[key]._originalType
                  ) {
                    newPanels[key] = value.infoPanels[key];
                  }
                });
                value.infoPanels = newPanels;
              }
              return value;
            },
            2
          )
        );
        res[type] = f;
      }
    }
    return res;
  }
}
