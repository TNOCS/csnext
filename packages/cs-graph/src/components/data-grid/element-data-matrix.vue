<template>
  <simplebar>
    <v-btn @click="toggleAxis()">toggle</v-btn>
    <div class="matrix" :style="matrixStyle" v-if="boxes !== null">
      <div
        v-for="(hor, indh) in horizontals"
        class="hor-axis"
        :style="getHorCellStyle(hor, indh)"
        :class="{ 'focus-hor': focus_hor === indh }"
      >
        {{ hor.properties.name }}
        <strong>{{ hor.properties[options.horizontalParentProperty] }}</strong>
      </div>

      <div
        v-for="(ver, indh) in verticals"
        class="ver-axis"
        :style="getVerCellStyle(ver, indh)"
        :class="{ 'focus-ver': focus_ver === indh }"
      >
        {{ ver.properties.name }}
      </div>

      <!-- matrix {{ boxes.length}} -->
      <div
        v-for="(box, indx) in boxes"
        :key="indx"
        class="matrix-box"
        :style="getCellStyle(box)"
        :class="{
          'focus-hor': focus_hor === box.pos_hor || focus_ver === box.pos_ver
        }"
        @mouseenter="enterBox(box)"
        @mouseleave="leaveBox(box)"
      >
        <v-checkbox />
        <!-- {{ box.el_ver.properties.name }}
      {{ box.pos_hor }} {{ box.pos_ver }} -->
      </div>
    </div>
  </simplebar>
</template>



<style scoped>
.focus-hor {
  /* background: lightgray; */
  /* font-weight: 700; */
}

.focus-ver {
  /* background: lightgray; */
  /* font-weight: 700; */
}

.matrix {
  display: grid;
  margin: 10px;
  /* background: blue; */
  min-height: 500px;
  min-width: 500px;
  /* grid-template-columns: repeat(10, 1fr); */
}

.matrix-box {
  padding: 4px;
  align-self: center;
  height: 70px;
  /* background: red; */
}

.ver-axis {
  border: 1;
  padding: 2;
  text-align: right;
  max-width: 300px;
  min-width: 300px;
  height: 70px;
  align-self: center;
  /* align-self: center; */
}

.hor-axis {
  border: 1;
  /* transform: rotate(-90deg); */
  writing-mode: vertical-rl;
  transform: rotate(-180deg);
  padding-bottom: 10px;

  text-orientation: mixed;

  max-height: 200px;
  /* transform-origin: left; */
  padding: 2;
}
</style>

<script lang="ts">
import { Component, Ref, Watch } from 'vue-property-decorator';
import { AppState, WidgetBase } from '@csnext/cs-client';
import { DataInfoPanel, NodeLink } from '@csnext/cs-map';

// import { FeatureType } from "../../classes";
import { FeatureType, GraphDatasource, GraphElement, PropertyType, PropertyValueType } from '@csnext/cs-data';
import simplebar from 'simplebar-vue';

import { AppStateBase, guidGenerator, WidgetOptions } from '@csnext/cs-core';
import Vue from 'vue';
import { DocDatasource, DataMatrixOptions, GridView } from '../..';

// import Placeholder from "@tiptap/extension-placeholder";

export type Box = {
  title: string;
  pos_ver: number;
  pos_hor: number;
  el_ver: GraphElement;
  el_hor: GraphElement;
};

@Component({
  name: 'element-data-matrix',
  components: {
    simplebar,
    DataInfoPanel,
    NodeLink
  }
})
export default class ElementDataGrid extends WidgetBase {
  public featureType: FeatureType | null = null;
  public classTypes: FeatureType[] = [];
  public items: GraphElement[] | undefined = []; // this.generateFakeDataRows(100);

  public verticals: GraphElement[] | undefined = [];
  public horizontals: GraphElement[] | undefined = [];
  public boxes: Box[] | null = [];
  public matrixStyle: any = {};
  public focus_hor = -1;
  public focus_ver = -1;

  public get source(): DocDatasource | undefined {
    if (this.widget?.content) {
      return this.widget.content as DocDatasource;
    }
  }

  public toggleAxis() {
    if (!this.options) {
      return;
    }
    let old = { ...this.widget.options } as DataMatrixOptions;
    this.options.horizontalType = old.verticalType;
    this.options.verticalType = old.horizontalType;
    this.options.horizontalFilter = old.verticalFilter;
    this.options.verticalFilter = old.horizontalFilter;
    this.updateItems();
  }

  public enterBox(box: Box) {
    this.focus_hor = box.pos_hor;
    this.focus_ver = box.pos_ver;
  }

  public leaveBox(box: Box) {
    this.focus_hor = -1;
    this.focus_ver = -1;
  }

  public get options(): DataMatrixOptions {
    return (this.widget?.options as DataMatrixOptions) || new DataMatrixOptions();
  }

  public getHorCellStyle(hor: GraphElement, pos: number) {
    return {
      'grid-row': 1,
      'grid-column': pos + 2
    };
  }

  public getVerCellStyle(ver: GraphElement, pos: number) {
    return {
      'grid-row': pos + 2,
      'grid-column': 1
    };
  }

  public getCellStyle(box: Box) {
    return {
      'grid-row': box.pos_ver + 2,
      'grid-column': box.pos_hor + 2,
      border: 1,
      padding: 2
    };
  }

  public updateItems() {
    if (
      !this.source ||
      !this.options?.horizontalFilter ||
      !this.options.verticalFilter ||
      !this.options.horizontalType ||
      !this.options.verticalType
    ) {
      return;
    }
    console.log('update items');
    this.verticals = this.source.getClassElements(
      this.options.horizontalType,
      true,
      this.options.horizontalFilter
    );
    this.horizontals = this.source.getClassElements(
      this.options.verticalType,
      true,
      this.options.verticalFilter
    );
    // this.boxes = [];
    let b: Box[] = [];
    let verpos = 0;
    let horpos = 0;

    for (const ver of this.verticals) {
      for (const hor of this.horizontals) {
        b.push({
          title: '',
          pos_ver: verpos,
          pos_hor: horpos,
          el_ver: ver,
          el_hor: hor
        });
        horpos += 1;
      }
      horpos = 0;
      verpos += 1;
    }

    Vue.set(this, 'boxes', b);
    this.boxes = b;
    console.log(this.verticals);
    console.log(this.horizontals);
    console.log(this.boxes);
    this.matrixStyle = { background: 'transparent' };
  }

  public contentLoaded(source: DocDatasource) {
    if (!source) {
      return;
    }
    this.updateItems();
  }

  mounted() {
    this.updateItems();
  }
}
</script>
