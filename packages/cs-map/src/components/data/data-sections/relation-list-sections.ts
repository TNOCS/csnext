import { BaseSection } from "./base-section";
import { Component } from "vue-property-decorator";
import { FeatureType, InfoPanelSection, PropertyType } from "@csnext/cs-data";
import { SimpleRelationListSection } from "./simple-relation-list-section";
@Component({
    name: "relation-list-sections",
    components: { SimpleRelationListSection },
    props: ["source"],
    template: `<div>  
  <div class="list-section" v-if="node">        
    <div v-for="(list,indx) in lists()" :key="indx">      
      <simple-relation-list-section  :source="source" :data="data" :node="node" :section="list" :featureType="featureType" :infoPanel="infoPanel"></simple-relation-list-section>
    </div>
  </div>
  </div>
</div>
`
})
export class RelationListSections extends BaseSection {
    private showMore = false;
    private total?: number;

    private relationName(n?: string) {
        if (!n) {
            return "";
        }
        return n.toLowerCase();
    }

    private findRelationPropertyType(
        featureType: FeatureType,
        classId: string
    ): PropertyType | undefined {
        if (!featureType.properties) {
            return;
        }
        return featureType.properties.find(p => p.relation?.type === classId);
    }

    private lists() {
        if (!this.node?._featureType || !this.source) {
            return [];
        }
        let res: InfoPanelSection[] = [];
        console.log("Get lists");

        if (this.node._incomming) {
            let incoming = this.node._incomming.filter(
                i => i.classId && i.from?._featureType
            );
            for (const i of incoming) {
                // const pt = this.findRelationPropertyType(
                //     i.from!._featureType!,
                //     i.classId!
                // );
                if (
                    i.classId &&
                    // pt &&
                    res.findIndex(r => r.relation === i.classId) === -1
                ) {                    
                    res.push({
                        sectionType: "simple-relation-list-section",
                        direction: 'incoming',
                        // title: `${i.from._featureType?.title}` || pt.label,
                        title: i.classId,
                        // filter: i.from.classId
                        relation: i.classId
                    });
                }
            }
        }

        if (this.node._outgoing) {
            let outgoing = this.node._outgoing.filter(i => i.classId && i.to);
            for (const o of outgoing) {
                // const pt = this.findRelationPropertyType(
                //     this.node._featureType,
                //     o.classId!
                // );
                if (res.findIndex(r => r.relation === o.classId) === -1) {
                    res.push({
                        direction: 'outgoing',
                        sectionType: "simple-relation-list-section",
                        title: o.classId,                         // pt.label ?? 
                        relation: o.classId
                    }); // filter: o.to!.classId })
                }
            }
        }

        return res;
    }

    public mounted() {}
}
