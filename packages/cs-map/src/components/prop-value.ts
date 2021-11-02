import { PropertyType, PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode, CreateElement } from 'vue'
import { NodeLink } from '..';

export default Vue.extend({
    name: 'prop-value',
    props: ['value', 'proptype', 'prop', 'showUnit', 'source', 'element'],
    
  render(createElement: CreateElement): VNode {      
      let proptype = this.proptype;
      if (!proptype && this.prop && this.element?._featureType?.propertyMap && this.element._featureType.propertyMap.hasOwnProperty(this.prop)) {
          proptype = this.element._featureType.propertyMap[this.prop];
      }
      if (!proptype?.type) { return createElement('span','') }
    switch (proptype.type as PropertyValueType) {
        case PropertyValueType.number:
            if (this.value) {
                let n = parseInt(this.value);
                if (n) {
                let value = n.toFixed(proptype.decimals || 0);
                if (this.showUnit && proptype.unit) { value+=' ' + proptype.unit; }
                return createElement('span', value);
                }
            } else {
                return createElement('span','');
            }
        case PropertyValueType.image:
          return createElement('img', { class: 'info-image', attrs: { src: this.value}} );
        case PropertyValueType.date:
          return createElement('span', new Date(this.value).toLocaleString());                
        case PropertyValueType.epoch:
            if (this.value === undefined) {
                return createElement('span', $cs.Translate('NO_DATE'));
            }
            switch ((proptype as PropertyType).dateFormat) {
                case 'date':                    
                    return createElement('span', new Date(this.value).toISOString().substr(0, 10));
                case 'time':
                    return createElement('span', new Date(this.value).toISOString().substr(10, 20));
                default:
                    return createElement('span', new Date(this.value).toLocaleDateString());
            }
            
        case PropertyValueType.boolean:
            return createElement('span', this.value ? $cs.Translate('YES') : $cs.Translate('NO'))
        case PropertyValueType.featurecollection:
            return createElement('span', '[feature collection]');
        case PropertyValueType.feature:
            return createElement('span', this.value?.geometry?.type || '[feature]');
        case PropertyValueType.wkt:
            return createElement('span', '[location]');                            
        case PropertyValueType.element:
            // find relation            
            const linkres : VNode[] = []; 
            // linkres.push(createElement('span', this.value));
            if (this.element?._elements && this.element._elements.hasOwnProperty(proptype.key)) {
                const link = this.element._elements[proptype.key];
                linkres.push(createElement(NodeLink, {
                    props: {
                        node: link,
                        source: this.source
                    }
                }));
                // <span class="link-title" @click.stop="activate()" v-on="on">{{node.title}}</span>
                // linkres.push(createElement('span', { attrs: { node: this.element }}, link.properties?.name));    
            }            
            return createElement('div', linkres);
        case PropertyValueType.relation:
            // find relation            
            const res : VNode[] = []; 
            if (this.element?._outgoing) {
                const rels = this.element._outgoing.filter(r => r.classId === proptype.relation.type);
                if (rels) {
                    for (const rel of rels) {
                        if (rel.to?.properties) {
                            res.push(createElement('a', { class: 'prop-node-link', attrs: { }}, rel.to?.properties?.name));    
                        }
                    }                    
                }
            }                
            return createElement('div', res);
            
        case PropertyValueType.json:
            return createElement('span', '[json]');
        case PropertyValueType.url:                
          let url = (!this.value.startsWith('http')) ? 'https://' + this.value : this.value;
          if (proptype.urlTemplate) {
            url = proptype.urlTemplate.replace('$1', this.value)
          }
          return createElement('a', { attrs: { target:'_blank', href: url} }, this.value)            
        default:
            return createElement('span', { class:'info-prop-text'}, this.value);
    }
    // return cre('div', this.$scopedSlots.default!({}))
  }
})
