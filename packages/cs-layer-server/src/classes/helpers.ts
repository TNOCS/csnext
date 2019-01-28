import { LayerSource } from './layer-source';

export class Helpers {
  public static guidGenerator() {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  public static idGenerator() {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  public static initFeatures(source: LayerSource) {
    if (source && source.features) {
      for (const feature of source.features) {
        if (!feature.id) {
          feature.id = Helpers.guidGenerator();
        }
      }
    }
  }
}
