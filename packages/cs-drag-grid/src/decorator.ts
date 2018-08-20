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
        console.log(target.prototype);
    };
}

export function FormField(options: IFormFieldOptions) {
    console.log(options);

    return function decorator(object: any, key: string, target: any) {
        let res = Object.getOwnPropertyDescriptor(object,key);
        console.log(res);
        let meta = Reflect.getMetadata("design:returntype", object, key);
        console.log(meta);
        if (!object.hasOwnProperty('_form')) {
            object._form = { fields: [options] };
        } else {
            object._form.fields.push(options);
        }        
    };

    //   return function decorator(target: any) {
    //     console.log(target);
    //   };
}
