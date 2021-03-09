import { DashboardManagerBase } from '@csnext/cs-client';
import { IDashboard, IWidget } from '@csnext/cs-core';
import { CrossChart } from './components/chart/chart';
import { Stat, HeatMap, Histogram, RowChart, ScatterPlot, ChartEditor } from '.';
import { ChartOptions, IChartType } from ".";
import { CrossFilterDatasource } from './crossfilter-datasource';
import { GeoJsonFeature } from 'vega';
import { DataSourceEvents, PropertyValueType } from '@csnext/cs-data';

export class CrossDashboardManager extends DashboardManagerBase {

    public static id = 'cross-dashboard-manager';

    public source?: CrossFilterDatasource;
    public chartDashboard?: IDashboard;
    public chartTypes: { [id: string]: IChartType } = {};
    public static filterProp = 'dc_filter';    

    public start(dashboard: IDashboard) {        
        this.dashboard = dashboard;
        this.chartDashboard = dashboard;        
    }

    private getTitle(key: string) : string | undefined {
        if (this.source?.mainLayer?._source) {
            let prop = this.source?.mainLayer?._source.getPropertType(key);
            if (prop) {
                return prop.title;
            }
        }
        return '';
    }

    public createWidget(chartOptions: ChartOptions) : IWidget {
        if (this.source?.mainLayer?._source) {
            if (!chartOptions.title && chartOptions.key) {
                chartOptions.title = this.getTitle(chartOptions.key);
            }
            if (!chartOptions.titleX && chartOptions.keyX) {
                chartOptions.titleX = this.getTitle(chartOptions.keyX);
            }
            if (!chartOptions.titleY && chartOptions.keyY) {
                chartOptions.titleY = this.getTitle(chartOptions.keyY);
            }      
            
            if (!chartOptions.titleX && chartOptions.title) {
                chartOptions.titleX = chartOptions.title;
            }
        }

        let widget = {
            options: {
                width: chartOptions.width ?? 6,
                height: chartOptions.height ?? 2,
                class: 'full-height',                
                showToolbar: true,
                title: chartOptions.title,
                menus: [
                    {
                        type: 'icon',
                        icon: 'clear',
                        toolTip: 'clear',
                        method: 'clear'
                    },                    
                ],
                toolbarOptions: {
                    dense: true,
                    flat: true,
                    prominent: false,
                    backgroundColor: 'lightgray'                        
                }
            },
            component: CrossChart,                      
            data: {
                options: chartOptions
                    
            }
        } as IWidget;
        widget.options?.menus?.push({
            type: 'icon',
            icon: 'build',
            toolTip: 'edit chart',
            action: (s)=> {              
                $cs.openRightSidebarWidget({
                    component: ChartEditor,
                    datasource: this.source?.id,
                    data: {
                        chartOptions,
                        manager: this,
                        chart: widget
                    }
                }, {
                    open: true
                }, 'editor');                                        
            }});        
            widget.options?.menus?.push({
                type: 'icon',
                icon: 'map',
                toolTip: 'use as legend',
                action: (s)=> {       
                    if (this.source?.mainLayer) {
                        if (chartOptions.key) {
                            this.source.mainLayer.setLegend(chartOptions.key);
                        } else if (chartOptions.keyX) {
                            this.source.mainLayer.setLegend(chartOptions.keyX);
                        }
                    }                    
                }});        
        return widget;
    }

    public updateWidget(widget: IWidget) {
        if (!this.chartDashboard?.widgets) { return; }
        if (this.chartDashboard.widgets.findIndex(r => r.id === widget.id) !== -1) {
            this.chartDashboard.widgets = this.chartDashboard.widgets.filter(r => r.id === widget.id);
        }
        this.chartDashboard.widgets.push(widget)

    }

    public updateWidgets() {        
        if (!this.chartDashboard || !this.source?.ndx) { return; }

        this.chartDashboard.widgets = [];

        this.chartTypes = {};
        this.chartTypes[Histogram.type] = new Histogram();
        this.chartTypes[RowChart.type] = new RowChart();
        this.chartTypes[ScatterPlot.type] = new ScatterPlot();        
        this.chartTypes['heatmap'] = new HeatMap();
        this.chartTypes[Stat.type] = new Stat();


        if (this.source.activeInsight?.dashboards?.crossfilter?.panels && this.source.activeInsight?.dashboards?.crossfilter?.panels.length>0) {
            let panel = this.source.activeInsight?.dashboards?.crossfilter?.panels[0];
            if (panel.sections) {
                for (const section of panel.sections) {
                    this.updateWidget(
                    this.createWidget({...{
                        _source: this.source,
                        _manager: this,                        
                    }, ...section}));
                }
            }
            // let section = this.source.activeInsight?.dashboards?.crossfilter?.panels
            // let charts = this.source.activeInsight?.dashboards?.crossfilter?.charts;
        }

        // this.updateWidget(
        //     this.createWidget({
        //         _source: this.source,
        //         _manager: this,
        //         type: ScatterPlot.type,
        //         bucketSize: 0.1,
        //         barPadding: 5,
        //         title: 'Average AHN',
        //         disableFilter: false,
        //         keyX: 'AHNsd[transform:mean]',
        //         keyY: 'nocloudNDVIcount[transform:max]'

        //     } as ChartOptions));
        // this.updateWidget(this.createWidget({
        //         _source: this.source,
        //         _manager: this,
        //         type: Histogram.type,
        //         bucketSize: 0.1,
        //         barPadding: 5,
        //         title: 'Distribution AHN',
        //         disableFilter: false,
        //         key: 'AHNsd[transform:mean]'

        //     } as ChartOptions));
        // this.updateWidget(
        //     this.createWidget({
        //         _source: this.source,                        
        //         _manager: this,
        //         type: RowChart.type,                        
        //         disableFilter: false,
        //         title: 'Province distribution',
        //         rowTimeMode: false,
        //         top: 5,
        //         key: 'provincieNaam'
        //     } as ChartOptions));
        

            // this.createWidget({
            //     id: 'histogram1',
            //     _source: this.source,
            //     _manager: this,
            //     type: ScatterPlot.type,
            //     bucketSize: 0.1,
            //     barPadding: 5,
            //     title: 'Lat',
            //     disableFilter: false,
            //     keyX: 'lat',
            //     keyY: 'lon'

            // } as ChartOptions),
            // this.createWidget({
            //     _source: this.source,
            //     _manager: this,
            //     type: Histogram.type,
            //     bucketSize: 0.1,
            //     barPadding: 5,
            //     title: 'Distribution AHN',
            //     disableFilter: false,
            //     key: 'AHNsd[transform:mean]'

            // } as ChartOptions),
            // this.createWidget({
            //     _source: this.source,                        
            //     _manager: this,
            //     type: RowChart.type,                        
            //     disableFilter: false,
            //     title: 'Province distribution',
            //     rowTimeMode: false,
            //     top: 5,
            //     key: 'lat'
            // } as ChartOptions)
        
    }

    public addChart(options: ChartOptions) {

    }

    public contentLoaded(source: CrossFilterDatasource) {

        
        this.source = source;             
        
        this.source.events.subscribe(CrossFilterDatasource.CROSSFILTER, (a: string, e: any) => {
            if (a === CrossFilterDatasource.CROSSFILTER_DATALOADED) {
                this.updateWidgets();
            }
        });

        this.source.events.subscribe(DataSourceEvents.INSIGHT_VIEW,  (a: string, e: any) => {
            if (a === DataSourceEvents.ACTIVATED) {                
                this.updateWidgets();
            }

        })


        this.source.events.subscribe(CrossFilterDatasource.FILTER_CHANGED, (a: string, e: any) => {
            let filtered = this.source?.ndx?.allFiltered();            
            let mapdata = this.source?.mainLayer?._source?._data;
            if (mapdata) {
                console.log(this.source?.mainLayer);                
                
                let ft = this.source?.mainLayer?._source?._featureType;
                if (ft && !ft?.propertyMap?.hasOwnProperty(CrossDashboardManager.filterProp)) {
                    ft?.properties?.push({key: CrossDashboardManager.filterProp, type: PropertyValueType.number, min: -1, max: Number.MAX_VALUE});
                    this.source?.mainLayer?._source?.updateFeatureTypePropertyMap(ft);
                    this.source?.mainLayer?.setFilter([">=",CrossDashboardManager.filterProp, 0])
                }                
                // ?.properties[this.filterProp]                                
                for (const feature of mapdata.features) {
                    if (!feature.properties) feature.properties = {};
                    let include =  filtered?.findIndex((f:GeoJsonFeature) => f.id === feature.id);
                    feature.properties[CrossDashboardManager.filterProp] = include;                    
                }
                this.source?.mainLayer?.updateGeojson(mapdata);
                
                                
            }
            
        })        
    }

    public stop() {
        
    }


    public dashboardLoaded() {
        // this.chartTypes['heatmap'] = new HeatMap();
    // this.chartTypes['time'] = new TimeChart();
        
    // this.chartTypes['scatter'] = new ScatterPlot();
    // this.chartTypes['row'] = new RowChart();
    // this.chartTypes['stat'] = new StatChart();
    // this.chartTypes['line'] = new LineChart();
        
        // alert('loaded');
    }

}