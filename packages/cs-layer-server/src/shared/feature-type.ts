import { Form, FormField } from './';
import { PropertyType, PropertyCollection } from './';


export class FeatureType {
    public title?: string;
    public mode?: string;
    public notification?: string;
    public icon?: string;
    public properties?: PropertyCollection;
}

// "circle": {
//     "mode": "draw_circle",
//     "notification": "Begin met tekenen",
//     "icon": "images/circle.png",
//     "properties": {
//       "type": "radius"
//     }
//   }
