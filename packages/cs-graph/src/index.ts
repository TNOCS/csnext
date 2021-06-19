export *  from "./components/data-grid/data-grid-options";
export * from "./datasources/doc-datasource";
export * from "./plugins/document-plugin";
export * from "./plugins/import-plugin";
export * from "./classes/"
import Vue from 'vue';
import NetworkGraph from "./components/graph/graph.vue";
import GraphElements from "./components/entity-management/graph-elements.vue";
import ElementDataGrid  from "./components/data-grid/element-data-grid.vue"
import ClassOverview from "./components/datamodel/class-overview.vue";
import ClassViewer from "./components/datamodel/class-viewer.vue";
import ElementInfo from "./components/element/element-info.vue";
import DocumentViewer from './components/document/document-viewer.vue';
import DocumentEditor from './components/document-management/document-editor.vue';
import DocumentEntities from './components/document/document-entities.vue';
import ReportEditor from './components/document-management/report-editor.vue';
// export * from "./classes";
import VueDragDrop from 'vue-drag-drop';
export { ElementDataGrid , ReportEditor, NetworkGraph, GraphElements, ClassOverview, ClassViewer, ElementInfo, DocumentViewer, DocumentEditor, DocumentEntities }

// export GraphElements from "./components/entity-management/graph-elements.vue";
// export ElementDataGrid  from "./components/data-grid/element-data-grid.vue"
// export ClassOverview from "./components/datamodel/class-overview.vue";
// export ClassViewer from "./components/datamodel/class-viewer.vue";
// export ElementInfo from "./components/element/element-info.vue";
// export DocumentViewer from './components/document/document-viewer.vue';
// export DocumentEditor from './components/document-management/document-editor.vue';
// export DocumentEntities from './components/document/document-entities.vue';
// export ReportEditor from './components/document-management/report-editor.vue';

Vue.use(VueDragDrop);

// export default {
//     components: {
//         ElementDataGrid,
//         NetworkGraph
//     }
// }

// export * from "./components";
// import "./components/data-grid/element-data-grid.vue";

// 


// export ElementDataGrid;
