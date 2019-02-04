import 'reflect-metadata';

export interface IFormOptions {
  title: string;
  fields?: IFormFieldOptions[];
  saveButton?: boolean;
  isPanel?: boolean;
  isPanelOpen?: boolean;
}

export interface IFormObject {
  _form?: IFormOptions;
  save(): Promise<boolean>;
}

export interface IFormFieldBaseOptions {
  title: string;
  _object?: any;
  _index?: number;
  _key?: string;
  _target?: any;
  _model?: any;
}

export interface IFormUnionFieldOptions extends IFormFieldBaseOptions {
  title: string;
  types: IFormFieldOptions[];
}

export interface IFormFieldOptions extends IFormFieldBaseOptions {
  type?:
    | 'string'
    | 'number'
    | 'slider'
    | 'chips'
    | 'checkboxes-horizontal'
    | 'checkbox'
    | 'object'
    | 'selection'
    | 'array'
    | 'keyvalue'
    | 'union';
  defaultValue?: any;
  description?: string;
  required?: boolean;
  group?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: any[];
  arrayType?: IFormFieldOptions;
  form?: IFormOptions;
  canDelete?: boolean;
  canAdd?: boolean;
  typeSelector?(value: object): string;
}

export function Form(options: IFormOptions) {
  return function decorator(target: any) {
    // console.log('Meta');
    // const keys = Reflect.getMetadataKeys(target);
    // for (const key of keys) {
    //   const d = Reflect.getOwnMetadata(key, target);
    //   console.log(d);
    // }

    // console.log(target);
    if (!target.prototype.hasOwnProperty('_form')) {
      target.prototype._form = options;
    } else {
      target.prototype._form = { ...target.prototype._form, ...options };
    }
  };
}

export function FormField(options: IFormFieldOptions): any {
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

export function FormUnionFields(options: IFormUnionFieldOptions) {
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
