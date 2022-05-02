<template>
  <div style="height: 100%">
    find element
    </div>
</template>

<style>
</style>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator';
import { WidgetBase, IframeWidget } from '@csnext/cs-client';
import { GraphElement, LinkInfo } from '@csnext/cs-data';
import { DocDatasource} from '../..'

import { Component as VueComponent } from 'vue';


@Component({
  components: { },
})
export default class FindElement extends WidgetBase {
  
  constructor() {
    super();
  }


  public get source(): DocDatasource | undefined {
    if (this.widget.content) {
      return this.widget.content as DocDatasource;
    }
  }

}
</script>
