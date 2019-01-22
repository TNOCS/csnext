import { AppState } from '.';
import { VueConstructor } from 'vue';

declare module '*.json' {
  const value: any;
  export default value;
}

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

