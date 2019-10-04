import { ILayoutManagerConfig } from '@csnext/cs-core';

export class LayoutManager {
  /** Available dashboard managers for layouting */
  public static layoutManagers: { [id: string]: ILayoutManagerConfig } = {};

  /** Registration of a new dashboard manager */
  public static add(manager: ILayoutManagerConfig) {
    LayoutManager.layoutManagers[manager.id] = manager;
  }

  public static addLayoutManager(comp: any) {
    if (comp.hasOwnProperty('id')) {
      const manager: ILayoutManagerConfig = { id: comp.id, name: comp.id, component: comp};
      LayoutManager.add(manager);
    }
  }
}
