export class FeatureType {
    public mode? : string;
    public notification?: string;
    public icon?: string;
    public properties? : { [key: string] : string | PropertyType}
}

export class PropertyType {
    public title?: string;
    public type?: string;
    public description?: string;
    public stringFormat?: string;
}

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }