<template>    
    <div class="indicator-card">
      <div class="element-card-name">{{element.properties.name}}</div>
      <div v-if="element.properties.value_type">
        <!-- {{ element.properties.value_type }} -->
        <template v-if="element.properties.value_type === 'number'">          
          <div v-if="element.properties.layout === 'Pie Chart'">
            pie chart
          </div>
          <div v-else class="number-value" >
            {{ element.properties.n_value}} <span class="number-value-unit">{{ element.properties.unit}}</span>
          </div>
        </template>
        <div class="string-value" v-if="element.properties.value_type === 'string'">          
          {{ element.properties.s_value}}
        </div>
        <div class="boolean-value" v-if="element.properties.value_type === 'boolean'">          
          {{ element.properties.b_value ? 'YES' : 'NO'}}
        </div>
      </div> 
      <v-rating full-icon="radio_button_checked" class="indicator-rating" v-model="element.properties.assessment" size="20" hover length="5" @input="saveIndicator()"></v-rating>         
      <div class="assessment-rating" :style="getAssessmentStyle()"></div>
      <v-layout class="indicator-actions">
      <v-btn icon v-if="element.properties.indicator_type === 'Manual'"><v-icon small >person</v-icon></v-btn>
      <v-btn icon v-else><v-icon small>calculate</v-icon></v-btn>
      <v-btn icon><v-icon small>map</v-icon></v-btn>
      </v-layout>
      <!-- <div class="element-card-value">{{element.properties.indicator_type}}</div> -->
    </div> 
</template> 
<style scoped>

.indicator-card {
  /* background: green; */
  padding: 10px;
  height: 100%;
  /* height: 600px; */
}

.indicator-actions {
    position: absolute;
    left: 4px;
    bottom: 4px;
}

.assessment-rating {
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 0px;
    width: 4px;
    display:none;
}

.indicator-card:hover + .assessment-rating { display: inline}

.indicator-rating {
    position: absolute;
    right: 4px;
    bottom: 4px;
}

.element-card-value {
  font-size: 14px;
}

.number-value {
  font-size: 50px;
  font-weight: 600;

}

.number-value-unit {
  font-size: 30px;
  font-weight: 600;
}

.string-value {
  font-size: 30px;

}

.boolean-value {
font-size: 30px;
}

.element-card-name {
  font-size: 16px;  
}
</style>
<script lang="ts">
import { GraphElement } from "@csnext/cs-data";
import { Component } from "vue-property-decorator";

import DefaultElementCard from './default-element-card.vue';

@Component({
  name: "indicator-element-card",  
  components: {
      
  },
})

export default class IndicatorElementCard extends DefaultElementCard {

    mounted() {
        // console.log(this.element);
    }

    public hover = false;

    public getAssessmentStyle() {
        if (!this.element) { return; }
        return {
            background: this.getNodeColor(this.element)
        } as any;
    }

     private getNodeColor(e: GraphElement) {
    if (e.classId === 'indicator') {
      switch (e.properties?.assessment) {
        case 1: return '#1a9641';
        case 2: return '#a6d96a';
        case 3: return '#ffffbf';
        case 4: return '#fdae61';
        case 5: return '#d7191c';
        default: return '#c0c2c0';
      }
    }
  }

    public saveIndicator() {        
        if (!this.source || !this.element) { return; }
        this.$forceUpdate();
        this.source.saveNode(this.element);
    }

}

    

</script>