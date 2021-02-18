import vue from 'vue';
import Component from 'vue-class-component';
import './data-table.css';
import simplebar from 'simplebar-vue';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { DataResource, DataSourceEvents, Insight } from '@csnext/cs-data';
import { WidgetBase } from '@csnext/cs-client';
import { Watch } from 'vue-property-decorator';

@Component({
    name: 'data-table',
    props: ['data'],
    components: { simplebar },
    template: require('./data-table.html')
} as any)
export class DataTable extends WidgetBase {
    public data!: StatsDatasource;    
    public insights: Insight[] | null = null;
    public search: string = '';
    public searchSelection: any = null;
    public searchResult: any[] = [];
    public fullscreen: boolean = false;
    public tableHeaders: any[] = [];
    public tableProperties: string[] = [];

    public get source() : StatsDatasource | undefined {
        if (this.data) { return this.data; }
        if (this.widget.content) { return this.widget.content; } 
    }
    
    public downloadPackage() {
        if (this.source && this.source.mainLayer) {
            this.source.downloadFile(this.source.mainLayer);
        }
    }

    public tableOpenFeature(f: any) {
        if (this.source && this.source.mainLayer) {
            this.source.selectFeature(f, this.source.mainLayer, true);
        }
    }

    public toggleTableSize() {
        this.fullscreen = !this.fullscreen;
        $cs.closeRightSidebar();
        this.updateTableHeaders();
    }

    @Watch('tableProperties')
    public updateTableHeaders() {
        if (this.source && this.source.mainLayer && this.source.mainLayer.style) {
            const headers: any[] = [
                {
                    text: 'Title',
                    align: 'left',
                    filterable: false,
                    value: 'properties.' + this.source.mainLayer.style.title
                }];
            if (this.fullscreen) {
                if (this.source.mainLayer._source && this.source.mainLayer._source._featureType && this.source.mainLayer._source._featureType.properties) {
                    if (this.tableProperties.length === 0) {
                        let p = 0;
                        for (const prop of this.source.mainLayer._source._featureType.properties) {
                        if (p < 10 && prop.type === 'number' && prop.key) {
                            this.tableProperties.push(prop.key);
                            p += 1;
                        }
                    }
                    }
                    for (const prop of this.tableProperties) {
                        if (this.source.mainLayer._source._featureType?.propertyMap?.hasOwnProperty(prop)) {
                            const p = this.source.mainLayer._source._featureType.propertyMap[prop];
                            headers.push({
                                text: p.title,
                                align: 'right',
                                value: 'properties.' + p.key
                            });
                        }
                    }
                }
            } else {
                if (this.source.mainLayer._legends) {
                    for (const legend of this.source.mainLayer._legends) {
                        if (legend.propertyInfo) {
                            headers.push({
                                text: legend.propertyInfo.title,
                                align: 'right',
                                value: 'properties.' + legend.property
                            });
                        }
                    }
                }
            }
            this.$set(this, 'tableHeaders', headers);
        }
    }

    @Watch('searchSelection')
    public searchSelectionChanged(value: any) {
        if (this.source && this.source.mainLayer && value) {
            this.source.selectFeature(value, this.source.mainLayer, true);
        }
    }

    @Watch('search')
    public doSearch(val: string) {
        if (this.source && this.source.mainLayer && this.source.mainLayer._source && this.source.mainLayer._source._data) {
            this.searchResult = this.source.mainLayer._source._data.features;
        }
    }
    
    public contentLoaded() {    
        this.updateTableHeaders();
        if (this.source?.events) {
            this.busManager.subscribe(this.source.events, DataSourceEvents.INSIGHT_VIEW, (a, e) => {
                this.updateTableHeaders();
            });
        }
    }


}

vue.component('data-table', DataTable);
