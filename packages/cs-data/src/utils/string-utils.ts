export class StringUtils {
    public static SentenceCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toUpperCase() : word.toLowerCase();
        });
      }
}