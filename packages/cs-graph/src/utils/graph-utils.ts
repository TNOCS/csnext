import G6 from "@antv/g6";

export class GraphUtils {
    public static fittingString(str: string, maxWidth: number, fontSize: number) {
        let currentWidth = 0;
        let res = str;
        const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
        str.split('').forEach((letter: string, i: number) => {
          if (currentWidth > maxWidth) return;
          if (pattern.test(letter)) {
            // Chinese charactors
            currentWidth += fontSize;
          } else {
            // get the width of single letter according to the fontSize
            currentWidth += G6.Util.getLetterWidth(letter, fontSize);
          }
          if (currentWidth > maxWidth) {
            res = `${str.substr(0, i)}\n${str.substr(i)}`;
          }
        });
        return res;
      }
}