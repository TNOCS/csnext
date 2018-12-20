export type ILanguageString = string | ILanguageObject;

export interface ILanguageObject {
  [languageKey: string]: ILanguageString;
}

export interface ILanguageOptions {
  defaultLanguage?: string;
  fallbackLanguage?: string;
  localeMessages?: ILanguageObject;
  showLanguageSwitchMenu?: boolean;
}
