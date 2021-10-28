import { customAlphabet } from 'nanoid/non-secure';
export function guidGenerator(length = 10) : string {
  return customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', length).toString();
  // const S4 = () => {
  //   // tslint:disable-next-line:no-bitwise
  //   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  // };
  // return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

export function idGenerator() {
  const S4 = () => {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4());
}

export function numberGenerator() {
  return Math.round(Math.random() * 10000);
}

export function generateHash(text: string) {
  var hash = 0, i, chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
      chr = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
