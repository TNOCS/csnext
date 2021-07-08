import { VueConstructor } from 'vue';
import { Command } from '@tiptap/vue-2/dist/tiptap-vue-2.esm';

declare global {
    interface StringConstructor {
        format(format: string, ...value: any): string;
    }
}

declare module 'interactjs';

declare module '@tiptap/core' {
    interface Commands {
      textParagraph: {
        /**
         * Set a heading node
         */
         setTextParagraph: () => Command,        
      }
    }
  }





