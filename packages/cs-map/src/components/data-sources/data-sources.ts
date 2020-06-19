import vue from 'vue';
import Component from 'vue-class-component';
import './data-sources.css';
import simplebar from 'simplebar-vue';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { DataResource, DataSource } from '@csnext/cs-data';
import { PropertySection } from '../..';

@Component({
    name: 'data-sources',
    props: ['data'],
    components: { simplebar },
    template: require('./data-sources.html')
} as any)
export class DataSources extends vue {
    public data!: StatsDatasource;
    public formatFilter = this.allTitle;
    public organisationFilter = this.allTitle;

    public get allTitle(): string {
        return $cs.Translate('ALL');
    }

    public downloadSource(source: DataResource) {
        this.data.downloadSource(source);
    }

    public openSourceDetails(source: DataResource) {
        this.data.openSourceDetails(source);
    }

    public async addSource(source: DataResource) {        
        if (this.data && source) {   
            this.data.addResourceToInsightView(source.name);
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
        if (this.sources && this.data && this.data.dataPackage) {
            return this.sources.filter(s => ((this.formatFilter === this.allTitle || (s.format !== undefined && s.format === this.formatFilter)) && (this.organisationFilter === this.allTitle || (s.organisation !== undefined && s.organisation === this.organisationFilter))));
        }
    }

    public get sources() {
        if (this.data.dataPackage) {
            return this.data.dataPackage.resources;
        }
    }


}

vue.component('data-sources', DataSources);
