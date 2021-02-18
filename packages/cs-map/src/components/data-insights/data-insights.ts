import vue from 'vue';
import Component from 'vue-class-component';
import './data-insights.css';
import simplebar from 'simplebar-vue';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { DataResource, DataSourceEvents, Insight, InsightView } from '@csnext/cs-data';
import { WidgetBase } from '@csnext/cs-client';
import { Watch } from 'vue-property-decorator';

@Component({
    name: 'data-insights',
    props: ['data'],
    components: { simplebar },
    template: require('./data-insights.html')
} as any)
export class DataInsights extends WidgetBase {
    public data!: StatsDatasource;    
    public insights: Insight[] | null = null;

    public get source() : StatsDatasource | undefined {
        if (this.data) { return this.data; }
        if (this.widget.content) { return this.widget.content; } 
    }
    
    @Watch('widget.content.dataPackage.insights')
    public updateInsights() {
        console.log('update insights');
        console.group(this.source?.dataPackage);
        if (this.source?.dataPackage?.insights) {
            this.insights = this.source?.dataPackage.insights;
            console.log(this.insights);
        }
    }

    
    public activateInsight(insight: Insight) {
        if (!this.source) { return; }
        this.source.activateInsight(insight);
        // this.collapsed = true;
    }

    public activateInsightView(view: InsightView, insight: Insight) {
        if (!this.source) { return; }
        this.source.activateInsightView(view, insight);
        // this.collapsed = true;
    }

    public insightResources(insight: Insight): DataResource[] {
        const result: DataResource[] = [];
        if (insight.views && this.source?.dataPackage) {
            for (const view of insight.views) {
                if (view.resources && this.source.dataPackage) {
                    for (const resource of view.resources) {
                        const re = this.source.dataPackage.resources.find(s => s.name === resource);
                        if (re && re.path) {
                            if (result.findIndex(r => re && r && r.path === re.path) === -1) {
                                result.push(re);
                            }
                        }
                    }
                }
            }
        }
        return result;
    }



    public contentLoaded() {
        this.updateInsights();        
        if (this.source?.events) {
            this.busManager.subscribe(this.source.events, DataSourceEvents.INSIGHT_VIEW, (a, e) => {
                this.updateInsights();
            });
        }
    }


}

vue.component('data-insights', DataInsights);
