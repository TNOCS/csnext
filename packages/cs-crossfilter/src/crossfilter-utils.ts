import { ChartOptions } from ".";

export class CrossFilterUtils {
    
    public static timeBuckets = [
        'hour',
        'day of the week',
        'day of the month',
        'day of the year',
        'week',
        'month',
        'year',
        'month - year',
        'week - year'
      ];

      
  public static getDayString(o: any, bucket: string): string {
    switch (bucket) {
      case this.timeBuckets[1]: // day of the week
        return o.hour;
      case this.timeBuckets[1]: // day of the week
        return this.weekNames[o.dayofweek];
      case this.timeBuckets[2]: // day of the month
        return o.dayofmonth;
      case this.timeBuckets[3]: // day of the year
        return o.dayofyear;
      case this.timeBuckets[4]: // week
        return o.week;
      case this.timeBuckets[5]: // month
        return this.monthNames[o.month];
      case this.timeBuckets[6]: // year
        return o.year;
      case this.timeBuckets[7]: // year - month
        return this.monthNames[o.month] + ' ' + o.year;
      case this.timeBuckets[8]: // week - month
        return o.week + ' ' + o.year;
      default:
        return o.time;
    }
  }

      public static getYearMonthTitle(d: number): string {
        let year = Math.floor(d);
        return (
          year.toString() +
          ' ' +
          CrossFilterUtils.monthNames[Math.floor((d - year) * 12)]
        );
      }

      public static monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
    
      public static transforms = [
        'count',
        'mean',
        'stddev',
        'spread',
        'min',
        'max',
        'avg'
      ];
    

      public static weekNames = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ];
    

      public static RoundCorrect(num: number, precision = 2) {
        // half epsilon to correct edge cases.
        var c = 0.5 * Number.EPSILON * num;
        //	var p = Math.pow(10, precision); //slow
        var p = 1;
        while (precision-- > 0) p *= 10;
        if (num < 0) p *= -1;
        return Math.round((num + c) * p) / p;
      }
    
      public static getValue(c: ChartOptions, d: any, key?: string) {
        if (!key) { key = c.key; }
        if (!key) {
          return 0;
        }
        if (d.hasOwnProperty('properties') && d.properties.hasOwnProperty(key)) {
            return d.properties[key];
        }

        if (d.hasOwnProperty('_flat') && d._flat.hasOwnProperty(key)) {
          return d._flat[key];
      }
        if (c.enums && c.enums.length > 0) {
          return d[key];
          // let index = c.enums.indexOf(d[c.key]);
          // if (index >= 0) return index; return c.enums.length;
        }
        if (d.hasOwnProperty(key)) {
        // console.log(d[c.key]);
          return d[key];
        }
      }
      

    public static getDayProperty(o: any, bucket: string): number {
        switch (bucket) {
          case this.timeBuckets[0]: // hours
            return o.hour;
          case this.timeBuckets[1]: // day of the week
            return o.dayofweek;
          case this.timeBuckets[2]: // day of the month
            return o.dayofmonth;
          case this.timeBuckets[3]: // day of the year
            return o.dayofyear;
          case this.timeBuckets[4]: // week
            return o.week;
          case this.timeBuckets[5]: // month
            return o.month;
          case this.timeBuckets[6]: // year
            return o.year;
          case this.timeBuckets[7]: // year - month
            return o.year + this.RoundCorrect(o.month / 12);
          case this.timeBuckets[8]: // year - month
            return o.year + this.RoundCorrect(o.week / 53);
          default:
            return o[bucket];
        }
      }

    public static getKeyValue(key: string, c: ChartOptions, d: any) {
        if (d.hasOwnProperty('properties') && d.properties.hasOwnProperty(key)) {
            return d.properties[key];
        }

        if (d.hasOwnProperty('_flat') && d._flat.hasOwnProperty(key)) {
          return d._flat[key];
      }

        if (!d.hasOwnProperty(key)) {
          return 'test';
        }
        if (c.enums && c.enums.length > 0) {
          return d[key];
          // let index = c.enums.indexOf(d[c.key]);
          // if (index >= 0) return index; return c.enums.length;
        }
        if (d.hasOwnProperty(key)) {
          return d[key];
        }
        return 'unknown';
      }

}