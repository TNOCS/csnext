export interface Insight {
    name?: string;
    title?: string;
    image?: string;
    description?: string;
    /** list of views */
    views?: InsightView[];
    /** configured dashboards for all views */
    dashboards?: { [key: string]: InsightDashboard};
}

export interface InsightDashboard {
    panels: InsightDashboardPanel[];
}

export interface InsightDashboardPanel {
    title: string;
    sections: InsightSection[];
}

export interface InsightSection {
    title: string;
    type: string;
    style: string;
    groups: string[];
}

export interface InsightView {
    name?: string;
    /** view title */
    title?: string;
    style?: any;
    /** view description */
    description?: string;
    /** list of active resource names */
    resources?: string[];
    manager?: string;
    /** map options */
    map?: any;
    /** selected feature */
    selection?: string;
    /** view position (auto generated) */
    pos?: number;
    /** collection of configured dashboards */
    dashboards?: { [key: string]: InsightDashboard};
}
