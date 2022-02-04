import { PropertyType, PropertyValueType } from '@csnext/cs-data';
import Vue, { VNode, CreateElement } from 'vue';
import { NodeChip } from '..';

export default Vue.extend({
  name: 'prop-value',
  props: ['value', 'proptype', 'prop', 'showUnit', 'source', 'element'],

  render(createElement: CreateElement): VNode  {
    let proptype = this.proptype;
    let val = this.value;

    if (!proptype && this.prop && this.element?._featureType?.propertyMap && this.element._featureType.propertyMap.hasOwnProperty(this.prop)) {
      proptype = this.element._featureType.propertyMap[this.prop];
    }

    if (!val && this.proptype && this.element?.properties && this.element.properties.hasOwnProperty(this.proptype)) {
      val = this.element.properties[this.proptype.key];
    }

    if (!proptype?.type) {
      return createElement('span', '');
    }
    const getElement = (value) => {
      switch (proptype.type as PropertyValueType) {
        case PropertyValueType.number:
          if (value) {
            let n = parseInt(value);
            if (n) {              
              if (proptype.mapping) {
                let indx = Object.values(proptype.mapping).findIndex(v => v === n);
                if (indx>=0) {
                  return createElement('span', Object.keys(proptype.mapping)[indx]);            

                } else {
                  return createElement('span', '');            
                }

              } else {

              value = n.toFixed(proptype.decimals || 0);
              if (this.showUnit && proptype.unit) {
                value += ' ' + proptype.unit;
              }       
                   
              return createElement('span', value);            
            }
            }
          } else {
            return createElement('span', '');
          }
        case PropertyValueType.image:
          return createElement('img', { class: 'info-image', attrs: { src: value } });
        case PropertyValueType.date:
          return createElement('span', new Date(value).toLocaleString());
        case PropertyValueType.epoch:
          if (value === undefined) {
            return createElement('span', $cs.Translate('NO_DATE'));
          }
          switch ((proptype as PropertyType).dateFormat) {
            case 'date':
              return createElement('span', new Date(value).toISOString().substr(0, 10));
            case 'time':
              return createElement('span', new Date(value).toISOString().substr(10, 20));
            default:
              return createElement('span', new Date(value).toLocaleDateString());
          }

        case PropertyValueType.boolean:
          return createElement('span', value ? $cs.Translate('YES') : $cs.Translate('NO'));
        case PropertyValueType.featurecollection:
          return createElement('span', '[feature collection]');
        case PropertyValueType.feature:
          return createElement('span', value?.geometry?.type || '[feature]');
        case PropertyValueType.tags:
          if (value && Array.isArray(value)) {
            const chips : VNode[] = [];
            for (const tag of value) {
              chips.push(createElement('v-chip', tag));              
            }
            return createElement('span', chips);
          } 
          return createElement('span', '');
          
        case PropertyValueType.wkt:
          return createElement('span', '[location]');
        case PropertyValueType.element:
          // find relation
          const linkres: VNode[] = [];
          // linkres.push(createElement('span', value));
          if (this.element?._elements && this.element._elements.hasOwnProperty(proptype.key)) {
            const link = this.element._elements[proptype.key];
            linkres.push(
              createElement(NodeChip, {
                props: {
                  node: link,
                  source: this.source,
                },
                class: 'element-prop-value',
              })
            );
            // <span class="link-title" @click.stop="activate()" v-on="on">{{node.title}}</span>
            // linkres.push(createElement('span', { attrs: { node: this.element }}, link.properties?.name));
          }
          return createElement('div', linkres);
        case PropertyValueType.relation:
          // find relation
          const res: VNode[] = [];
          if (this.element?._outgoing) {
            const rels = this.element._outgoing.filter((r) => r.classId === proptype.relation.type);
            if (rels) {
              for (const rel of rels) {
                if (rel.to?.properties) {
                  
                  res.push(createElement('span', { class: 'prop-node-link', attrs: {} }, 
                  rel.to?.properties?.name));
                }
              }
            }
          }
          return createElement('div', res);

        case PropertyValueType.json:
          return createElement('span', '[json]');
        case PropertyValueType.url:
          let url = !value.startsWith('http') ? 'https://' + value : value;
          if (proptype.urlTemplate) {
            url = proptype.urlTemplate.replace('$1', value);
          }
          return createElement('span', [createElement('a', { attrs: { target: '_blank', href: url } }, value), createElement('v-icon','mdi-open-in-new')]);
          // return createElement('a', { attrs: { target: '_blank', href: url } }, value);
        default:
          return createElement('span', { class: 'info-prop-text' }, value);
      }
    };
    if (proptype?.array && Array.isArray(val)) {
        if (val.length === 1) {
            return getElement(val[0])
        }   
    }
    return getElement(val);  
  },
});
