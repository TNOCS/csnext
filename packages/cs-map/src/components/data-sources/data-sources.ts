import vue from 'vue';
import Component from 'vue-class-component';
import './data-sources.css';
import simplebar from 'simplebar-vue';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { DataResource, DataSourceEvents } from '@csnext/cs-data';
import { WidgetBase } from '@csnext/cs-client';

@Component({
    name: 'data-sources',
    props: ['data'],
    components: { simplebar },
    template: require('./data-sources.html')
} as any)
export class DataSources extends WidgetBase {
    public data!: StatsDatasource;
    public formatFilter = this.allTitle;
    public organisationFilter = this.allTitle;

    public get source() : StatsDatasource | undefined {
        if (this.data) { return this.data; }
        if (this.widget.content) { return this.widget.content; } 
    }

    public get allTitle(): string {
        return $cs.Translate('ALL');
    }

    public downloadSource(source: DataResource) {
        if (!this.source) { return; }
        this.source.downloadSource(source);
    }

    public openSourceDetails(source: DataResource) {
        if (!this.source) { return; }
        this.source.openSourceDetails(source);
    }

    public async addSource(source: DataResource) {        
        if (this.source && source) {   
            this.source.addResourceToInsightView(source.name);
        };        
    }

    private uniques(prop: string) {
        let result = [this.allTitle];
        if (this.sources) {
            const ma = this.sources.map(a => a[prop]);
            if (ma.length > 0) {
                const se = new Set(ma);
                result = result.concat([...se]);
            }
        }
        return result;
    }

    public get sourceOrganisations(): string[] {
        return this.uniques('organisation');
    }

    public get sourceFormats(): string[] {
        return this.uniques('format');
    }

    public get filteredSources(): DataResource[] | undefined {
        if (this.sources && this.source?.dataPackage) {
            return this.sources.filter(s => ((this.formatFilter === this.allTitle || (s.format !== undefined && s.format === this.formatFilter)) && (this.organisationFilter === this.allTitle || (s.organisation !== undefined && s.organisation === this.organisationFilter))));
        }
    }

    public get sources() {
        if (this.source?.dataPackage) {
            return this.source.dataPackage.resources;
        }
    }

    public contentLoaded() {
        this.$forceUpdate();
        if (this.source?.events) {
            this.busManager.subscribe(this.source.events, DataSourceEvents.INSIGHT_VIEW, (a, e) => {
                this.$forceUpdate();
            });
        }
    }


}

vue.component('data-sources', DataSources);
