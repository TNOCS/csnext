export class WktUtils {
    public static PointParser(wkt: string) : number[] | undefined {
        const wktstring = wkt.toUpperCase();
        if (wktstring.indexOf('POINT') === 0) {
        const values = wktstring.replace('POINT (', '').replace('POINT(', '').replace(')', '').split(' ');
        if (values.length === 2) {
            return [parseFloat(values[1]), parseFloat(values[0])]
        }}
        return;
    }
}