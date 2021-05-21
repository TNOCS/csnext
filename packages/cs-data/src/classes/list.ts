import { ListItem } from './list-item';

export class Lists extends Array<List> {

}

export class List
{
    public title?: string;
    public description?: string;
    public items?: ListItem[];
}
