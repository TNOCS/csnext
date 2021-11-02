import { GraphElement, TextEntity } from '@csnext/cs-data';

export class EntityList {
  public id!: string
  public node?: GraphElement;
  public edge?: GraphElement;
  public instances: TextEntity[] = [];
  public _hover = false;
  public _approved = false;
  public _relations = 0;
  public _togglemore = false;
  
}

export class NodeEntities {
    public id!: string;
    public node?: GraphElement;
    public title?: string;
    public entities: EntityList[] = [];
    public _adding = false;    
    public _open = true;  
  }