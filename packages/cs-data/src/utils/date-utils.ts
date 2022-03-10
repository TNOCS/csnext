import { GraphElement } from '..';
import distanceToNow from 'date-fns/formatDistanceToNow';

export class DateUtils {

  public static dateDistanceString(element: GraphElement) {
    if (element?.properties?.point_in_time) {
      return distanceToNow(element.properties.point_in_time);
    } else {
      return '';
    }
  }
}