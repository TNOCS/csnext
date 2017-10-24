import { Widget } from './widget';
import { Page } from './page';

export class Dashboard {
    public id?: string;
    public path?: string;
    public title?: string;
    public manager?: string;
    public widgets?: Widget[];
    public active?: boolean;
}