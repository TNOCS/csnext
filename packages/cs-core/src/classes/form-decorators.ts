// import 'reflect-metadata';

export interface IFormOptions {
  title: string;
  fields?: IFormFieldOptions[];
  saveButton?: boolean;
}

export interface IFormFieldOptions {
  title: string;
  type?: string;
  description?: string;
  required?: boolean;
  group?: string;
  _object?: any;
  _key?: string;
  _target?: any;
  _model?: any;
}

export function Form(options: IFormOptions) {
  return function decorator(target: any) {
    // console.log(target);
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
    options._object = object;
    options._key = key;
    options._target = target;
    options._model = object[key];

    // let meta = Reflect.getMetadata("design:returntype", object, key);
    if (!object.hasOwnProperty('_form')) {
      object._form = { fields: [options] };
    } else {
      object._form.fields.push(options);
    }
  };
}
