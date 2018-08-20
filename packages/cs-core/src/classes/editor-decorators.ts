import 'reflect-metadata';

export interface IFormOptions {
  title: string;
  fields: IFormFieldOptions[];
}

export interface IFormFieldOptions {
  title: string;
}

export function Form(options: IFormOptions) {
  return function decorator(target: any) {
    target.prototype._form = options;
  };
}

export function FormField(options: IFormFieldOptions) {
  return function decorator(target: any) {
  };
}
