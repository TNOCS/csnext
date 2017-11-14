
import { Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { WidgetBase } from './widgetbase';
import './youtubebackgroundwidget.css';

// import './home.scss';
@Component(<any>{
    name: 'youtubebackgroundwidget',
    template: '<div class="video-background"><div class="video-foreground"><iframe :src="\'https://www.youtube.com/embed/\' + widget.data.id + \'?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1\'" frameborder=0 allowfullscreen></iframe></div></div>'
})
// tslint:disable-next-line:class-name
export class youtubebackgroundwidget extends WidgetBase {

    beforeMount() {        
        this.beforeMount();
    }

}