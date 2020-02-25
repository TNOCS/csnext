import Component from 'vue-class-component';
import { DataResource, Insight, InsightView, DataSourceEvents } from '@csnext/cs-data';
import './source-details.css';
import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { Watch } from 'vue-property-decorator';

// tslint:disable-next-line: max-classes-per-file
@Component({
    name: 'source-details',
    components: { simplebar },
    template: require('./source-details.html')
} as any)
export class SourceDetails extends WidgetBase {

    public groups: any[] = [];

    public get source(): DataResource | undefined {
        if (this.widget && this.widget.data) {
            return this.widget.data.source;
        }
    }

    public get manager(): StatsDatasource | undefined {
        if (this.widget && this.widget.data) {
            return this.widget.data.manager;

        }
    }

    public closeSidebar() {
        $cs.closeRightSidebar();
    }

    public beforeMount() {
        this.updateGroups();
    }

    @Watch('widget.data.source')
    public updateGroups() {
        if (!this.source || !this.source.schema || !this.source.schema.fields) { return; }
        const defaultGroup = {
            id: 'default',
            title: $cs.Translate('PROPERTIES'),
            fields: []
        };
        const result: any[] = [defaultGroup];

        /** find feature type */

        /** lookup all properties */
        for (const field of this.source.schema.fields) {
            let group = result[0];
            if (field.group) {
                group = result.find(g => g.id === field.group);
                if (!group) {
                    group = {
                        id: field.group,
                        title: field.group,
                        fields: []
                    };
                    result.push(group);
                }
            }
            group.fields.push(field);
        }
        this.groups = result;
        // vue.set(this, 'groups', result);

    }

    public openSourceDetails() {
        if (this.source && this.manager) {
            this.manager.openSourceDetails(this.source);
        }
    }
}
