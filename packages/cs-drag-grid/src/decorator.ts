import 'reflect-metadata';

export interface IFormOptions {
    title: string;
}

export interface IFormFieldOptions {
    title: string;
}

export function Form(options: IFormOptions) {
    return function decorator(target: any) {
        if (!target.prototype.hasOwnProperty('_form')) {
            target.prototype._form = options;
        } else {
            target.prototype._form = { ...target.prototype._form, ...options };
        }        
    };
}

export function FormField(options: IFormFieldOptions) {

    return function decorator(object: any, key: string, target: any) {
        // let res = Object.getOwnPropertyDescriptor(object,key);
        
        // let meta = Reflect.getMetadata("design:returntype", object, key);
        // if (!object.hasOwnProperty('_form')) {
        //     object._form = { fields: [options] };
        // } else {
        //     object._form.fields.push(options);
        // }        
    };
}
