import { PropertyType } from '@csnext/cs-data';
import Vue, { VNode } from 'vue';

export class PropertyValue {
    public key?: string;
    public value?: string;
    public propertyType?: PropertyType;
  }
  
  Vue.component('prop-value', {
      props: ['propValue', 'showUnit'],
      render(createElement): VNode {
          let pt = this.propValue.propertyType as PropertyType;
          let value = this.propValue.value;
          switch (pt.type) {
              case 'number':              
                  if (value) {
                      let v = parseInt(value).toFixed(pt?.decimals || 0);
                      if (this.showUnit && pt?.unit) { v+=' ' + pt.unit; }
                      return createElement('span', v);
                  } else {
                      return createElement('span', value);
                  }
              case 'epoch':
                  return createElement('span', new Date(value).toLocaleString());
              case 'image':
                  return createElement('img', { class: 'info-image', attrs: { src: value}} );
              case 'boolean':
                  return createElement('span', value ? $cs.Translate('YES') : $cs.Translate('NO'))
              case 'url':                
                  let url = (!value.startsWith('http')) ? 'https://' + value : value;
                  if (pt.urlTemplate) {
                    url = pt.urlTemplate.replace('$1', value)
                  }
                  return createElement('a', { attrs: { target:'_blank', href: url} }, value)
              default:
                  return createElement('span', value);
          }
      }
  });