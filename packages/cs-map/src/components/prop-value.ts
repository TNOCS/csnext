import { PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode } from 'vue';

Vue.component('prop-value', {
    props: ['value', 'proptype', 'showUnit', 'element'],
    render(createElement): VNode {
        switch (this.proptype.type as PropertyValueType) {
            case PropertyValueType.number:
                if (this.value) {
                    let n = parseInt(this.value);
                    if (n) {
                    let value = n.toFixed(this.proptype.decimals || 0);
                    if (this.showUnit && this.proptype.unit) { value+=' ' + this.proptype.unit; }
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
                return createElement('span', new Date(this.value).toLocaleString());
            case PropertyValueType.boolean:
                return createElement('span', this.value ? $cs.Translate('YES') : $cs.Translate('NO'))
            case PropertyValueType.featurecollection:
                return createElement('span', '[feature collection]');
            case PropertyValueType.feature:
                return createElement('span', this.value?.geometry?.type || '[feature]');
            case PropertyValueType.wkt:
                return createElement('span', '[location]');                            
            case PropertyValueType.relation:
                // find relation
                if (this.element?._outgoing) {
                    const rel = this.element._outgoing.find(r => r.classId === this.proptype.relation.type);
                    if (rel) {
                        console.log(rel);
                        return createElement('a', { attrs: { }}, rel.to?.properties?.name);
                    }
                }                
                return createElement('span', '');
                
            case PropertyValueType.json:
                return createElement('span', '[json]');
            case PropertyValueType.url:                
              let url = (!this.value.startsWith('http')) ? 'https://' + this.value : this.value;
              if (this.proptype.urlTemplate) {
                url = this.proptype.urlTemplate.replace('$1', this.value)
              }
              return createElement('a', { attrs: { target:'_blank', href: url} }, this.value)            
            default:
                return createElement('span', { class:'info-prop-text'}, this.value);
        }
    }
});