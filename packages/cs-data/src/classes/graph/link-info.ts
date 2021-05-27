import { GraphElement } from './graph-element';

export class LinkInfo {
    public direction: "to" | "from" = "to";
    public element?: GraphElement;
    public link?: GraphElement;
  }