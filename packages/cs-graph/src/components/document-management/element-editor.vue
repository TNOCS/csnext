<template>
  <div class="cs-scroll-container" v-if="source && document && document.properties && formDef !== null">    
    <cs-form :data="document.properties" :formdef="formDef" class="pt-2" id="detailcsform" @saved="saveElement"></cs-form>
  </div>
</template>

<style scoped>
.card-class-title {
  margin-left: 5px;
}

.entity-card {
  width: 110px;
  height: 110px;
  margin: 5px;
  /* float:left; */
  border: 1px solid;
}
.entity-link {
  margin: 5px;

  padding: 5px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase } from '@csnext/cs-client';
import { DocDatasource } from '../../datasources/doc-datasource';
import { IFormOptions } from '@csnext/cs-core';

import { NodeLink } from '@csnext/cs-map';
import { GraphElement } from '@csnext/cs-data';
import { DataGridOptions } from '../data-grid/data-grid-options';

@Component({
  components: { NodeLink },
})
export default class ElementEditor extends WidgetBase {
  public formDef: IFormOptions | null = null;

  public openEntity(entity: GraphElement) {
    if (this.source) {
      this.source.selectElement(entity);
    }
  }

  private getEntityColor(entity?: GraphElement) {
    if (entity) {
      return GraphElement.getBackgroundColor(entity);
    } else {
      return 'gray';
    }
  }

  public openViewer(element: GraphElement) {
    if (!this.source || !this.document) {
      return;
    }
    if (element.properties?.format && this.source?.viewerPlugins) {
      const viewer = this.source.viewerPlugins.find((v) => v.formats && v.formats.includes(element.properties!.format));
      if (viewer) {
        viewer.call(element, this.document, this.source);
      }
    }
  }

  public async selectElement(e: GraphElement, options?: DataGridOptions) {
    // if (!this.source && this.widget?.datasource) {
    //   this.widget.content = await $cs.loadDatasource<DocDatasource>(this.widget.datasource);
    // }
    if (this.state) {
      this.state.element = e;
    }
    this.document = e;
    this.updateForm();
    this.$forceUpdate();
  }

  public saveElement() {
    if (!this.source || !this.document) {
      return;
    }    

    this.source.saveNode(this.document);
  }
  public document?: GraphElement | null = null;

  public source: DocDatasource | null = null;

  public updateForm() {
    if (!this.source || !this.document) {
      return;
    }
    const form = this.source.elementEditorForm(this.document);
    form.title = '';
    Vue.set(this, 'formDef', form);
  }

  @Watch('data.element')
  public documentChanged() {
    alert('new document');
  }

  public contentLoaded() {
    if (!this.source) {
      return;
    }

    if (!this.state?.element && this.state?.elementId) {
      this.state.element = this.source.getElement(this.state.elementId);
    }

    if (!this.state?.element) {
      return;
    }
    this.document = this.state.element;
    this.updateForm();

    // this.document.updateOriginals();

    this.busManager.subscribe(this.source!.bus, DocDatasource.DOCUMENT, (a: string, d: any) => {      
      this.selectElement(d);
    });
  }

  async mounted() {
    if (!this.widget?.content && this.widget?.datasource) {
      this.widget.content = await $cs.loadDatasource<DocDatasource>(this.widget.datasource);
    }
    if (this.widget?.content) {
      this.source = this.widget.content as DocDatasource;
    }

    if (this.source) {
      this.contentLoaded();
    }
    // this.updateForm();
  }
}
</script>
