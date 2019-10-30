import { PropertyType } from '..';

export function isNullOrEmpty(s: string): boolean {
    return !isNumber(s) && !s;
}

/**
 * String formatting
 * 'Added {0} by {1} to your collection'.f(title, artist)
 * 'Your balance is {0} USD'.f(77.7)
 */
export function format(s: string, ...args: string[]): string {
    var i = args.length;

    while (i--) {
        // "gm" = RegEx options for Global search (more than one instance) and for Multiline search
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), args[i]);
    }
    return s;
};

/*
 * Returns true if we are dealing with a number, false otherwise.
 */
// export function isDate(n: any): boolean {
//     return moment(n, moment.ISO_8601).isValid();
// }

/*
 * Returns true if we are dealing with a number, false otherwise.
 */
export function isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
 * Returns true if we are dealing with a boolean, false otherwise.
 */
export function isBoolean(s: any): boolean {
    return s === 'true' || s === 'false';
    //if (typeof s === 'boolean') return true;
}

/*
 * Returns true if we are dealing with a array, false otherwise.
 */
export function isArray(s: any): boolean {
    return s && s.constructor === Array;
}

/*
 * Returns true if we are dealing with a bbcode, false otherwise.
 */
export function isBbcode(s: any): boolean {
    return false;
    // if (s == null) return false;
    // return s.indexOf("[b]") > 0 || s.indexOf("[i]") > 0 || s.indexOf("[url") > 0;
}

 /**
     * Convert a property value to a display value using the property info.
     */
    export function convertPropertyInfo(pt: PropertyType, text: any): string {
        var displayValue: string = '';
        // if (!csComp.StringExt.isNullOrEmpty(text) && !$.isNumeric(text))
        //     text = text.replace(/&amp;/g, '&');
        if (text === undefined || text === null || !pt.type) return text;
        switch (pt.type) {            
            case 'number':
                if (!isNumber(text)) {
                    if (typeof text === 'string' && pt.stringFormat && isNumber(text.replace(',', '.'))) {
                        // E.g. "9,876E-02" is not recognized as numeric, but "9.876E-02" is.
                        displayValue = String.format(pt.stringFormat, parseFloat(text.replace(',', '.')));
                    } else {
                        displayValue = text;
                    }
                } else if (isNaN(text)) {
                    displayValue = '';
                } else if (!pt.stringFormat) {
                    displayValue = text.toString();
                } else {
                    displayValue = String.format(pt.stringFormat, parseFloat(text));
                }
                break;
            case 'options':
                if (!isNumber(text)) {
                    displayValue = text;
                } else if (pt.options) {
                    displayValue = pt.options[text];
                }
                break;
            case 'rank':
                var rank = text.split(',');
                if (rank.length !== 2) return text;
                if (pt.stringFormat) {
                    displayValue = String.format(pt.stringFormat, rank[0], rank[1]);
                } else {
                    displayValue = String.format('{0} / {1}', rank[0], rank[1]);
                }
                break;
            case 'hierarchy':
                var hierarchy = text.split(';');
                var count = hierarchy[0];
                var calculation = hierarchy[1];
                displayValue = count.toString();
                break;
            case 'date':
                var d: Date;
                if (isNumber(text)) {
                    d = new Date(text);
                } else {
                    d = new Date(Date.parse(text));
                }
                displayValue = pt.stringFormat
                    ? String.format(pt.stringFormat, d)
                    : d.toLocaleString();
                break;
            case 'duration': //in ms
                if (!isNumber(text)) {
                    displayValue = text;
                } else {
                    var d0 = new Date(0); var d1 = new Date(text);
                    var h = d1.getHours() - d0.getHours();
                    var m = d1.getMinutes() - d0.getMinutes();
                    var s = d1.getSeconds() - d0.getSeconds();
                    displayValue = ('0' + h).slice(-2) + 'h' + ('0' + m).slice(-2) + 'm' + ('0' + s).slice(-2) + 's';
                }
                break;
            default:
                displayValue = pt.stringFormat
                    ? String.format(pt.stringFormat, text)
                    : text;
                break;
        }
        return displayValue;
    }
