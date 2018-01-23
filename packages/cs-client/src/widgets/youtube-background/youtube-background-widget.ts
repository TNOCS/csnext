import Component from 'vue-class-component';
import { WidgetBase } from '../..';
import './youtube-background-widget.css';

@Component({
  name: 'youtube-background-widget',
  template: '<div class="video-background"><div class="video-foreground"><iframe :src="\'https://www.youtube.com/embed/\' + widget.data.id + \'?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1\'" frameborder=0 allowfullscreen></iframe></div></div>'
} as any)
export class YoutubeBackgroundWidget extends WidgetBase {
}
