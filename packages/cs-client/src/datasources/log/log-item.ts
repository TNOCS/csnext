export interface ILogItem {
  className?: string;
  content?: any;
  end?: Date | null;
  group?: any;
  id?: string;
  startDate?: number | null;
  endDate?: number | null;
  start: Date | null;
  style?: string;
  subgroup?: string;
  title?: string;
  type?: string;
  editable?: boolean;
}
