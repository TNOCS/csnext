import { VueConstructor } from 'vue';
declare global {
    interface StringConstructor {
        format(format: string, ...value: any): string;
    }
}





