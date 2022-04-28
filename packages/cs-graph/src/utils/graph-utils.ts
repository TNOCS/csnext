import G6 from "@antv/g6";

export class GraphUtils {
  public static fittingString(str: string, maxWidth: number, fontSize: number) {
    let currentWidth = 0;
    let res = str;
    str.split('').forEach((letter: string, i: number) => {
      if (currentWidth > maxWidth) return;
        currentWidth += G6.Util.getLetterWidth(letter, fontSize);
      if (currentWidth > maxWidth) {
        res = `${str.substr(0, i)}\n${str.substr(i)}`;
      }
    });
    return res;
  }
}