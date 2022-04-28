import 'reflect-metadata';

export interface IFormOptions {
  title?: string;
  fields?: IFormFieldOptions[];
  saveButton?: boolean;
  isPanel?: boolean;
  hideTitle?: boolean;
  showToolbar?: boolean;
  toolbarClass?: string;
  showPanels?: boolean;
  icon?: string;
  verbose?: boolean;
  isPanelOpen?: boolean;
  optionalSupport?: boolean;
  data?: any;
  keys?: boolean;
  groups?: { [name: string]: IFormGroupOptions };
  keyValuesType?(): object;
  triggerCallback?(obj: object, field: IFormFieldOptions): undefined;
}

export interface IFormObject {
  _form?: IFormOptions;
  save?(obj?: any): Promise<boolean>;
}

export interface IFormFieldBaseOptions {
  title: string;
  subTitle?: string;
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

export interface IFormGroupOptions {
  visible?(object: IFormObject, form: IFormOptions): boolean;
}
export interface IFormFieldOptions extends IFormFieldBaseOptions {
  type?:
  | 'string'
  | 'textarea'
  | 'number'
  | 'slider'
  | 'chips'
  | 'colorpicker'
  | 'combobox'
  | 'combobox-objects'
  | 'checkboxes-horizontal'
  | 'checkbox'
  | 'object'
  | 'selection'  
  | 'keyvalue'
  | 'switch'
  | 'form'
  | 'union'
  | 'keysobject'
  | 'datetimepicker'
  | 'url'
  | 'group-buttons'
  | 'epochdatetimepicker'
  | 'datepicker'
  | 'button-trigger'
  | 'rating'
  | 'component'
  | 'imagelist';
  defaultValue?: any;
  description?: string;
  required?: boolean;
  group?: string;
  section?: string;
  array?: boolean;
  min?: number;
  max?: number;
  step?: number;
  sortWeight?: number;
  options?: any[] | (()=>any[]) | (() => Promise<any[]>);
  arrayType?: IFormOptions;
  arrayFieldType?: string;
  form?: IFormOptions;
  canDelete?: boolean;  
  clearable?: boolean;
  canAdd?: boolean;
  canEditKey?: boolean;
  data?: any;
  placeholder?: string;
  filled?: boolean;
  rounded?: boolean;
  addUsingDialog?: boolean;
  newItem?: ()=>any;
  readonly?: boolean;
  keyText?: string;
  urlTemplate?: string;
  keyValue?: string;
  icon?: string;
  colors?: string[];
  component?: any;
  selectedText?: string;
  hint?: string;
  persistentHint?: boolean;
  locale?: string;
  optional?: boolean;
  requirements?: ((value: object) => boolean)[];
  arrayFilter?: ((value: object) => boolean);
  _appendIcon?: string;
  _isError?: boolean;
  keyValuesType?(): object;
  typeSelector?(value: object): string;
  triggerCallback?(obj: object, field: IFormFieldOptions);
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

export function FormField(options: IFormFieldOptions): any {
  return function decorator(object: any, key: string, target: any) {
    const res = Object.getOwnPropertyDescriptor(object, key);
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
