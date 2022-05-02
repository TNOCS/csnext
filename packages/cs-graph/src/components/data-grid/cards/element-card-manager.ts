import { Component } from "vue";
import DefaultElementCard from "./default-element-card.vue";
import { GraphElement } from '@csnext/cs-data';

export class ElementCardManager {
    public static cards: { [type: string] : Component} = {};

    public static getElementCard(element: GraphElement ) : string | Component | Vue {
        const id = element.classId;
        if (id && ElementCardManager.cards?.hasOwnProperty(id)) {
            return ElementCardManager.cards[id];
        }            
        if (ElementCardManager.cards?.hasOwnProperty('node')) {
            return ElementCardManager.cards['node'];
        }
        return DefaultElementCard;        
    }
}