import {Strategy} from "./strategy";
import {CanvasEvent} from "../canvas/canvasEvent";
import anime from 'animejs';

declare var $: any;

export class ScrollStrategy implements Strategy {

    private animation: anime;

    constructor(animation: anime) {
        this.animation = animation;
    }

    animate(event: CanvasEvent, options: any): void {
        let viewport = event.canvas.viewport;
        let viewportHeight = (viewport.height - viewport.top - viewport.bottom);
        let elementScrollOffset = 0;

        if (options.scroll.trigger === 'top') {
            elementScrollOffset = ((event.canvas.scroll.current.y - event.canvas.element.top) - (event.canvas.element.height - viewport.top)) * -1;
        } else {
            elementScrollOffset = ((event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top) - viewport.bottom;
        }

        //Increase or decrease element scroll speed
        if (options.scroll.speed > 0) {
            elementScrollOffset = elementScrollOffset + (elementScrollOffset * (options.scroll.speed / 100));
        }

        //Calc the scroll percentage
        let scroll: any = ((elementScrollOffset / viewportHeight)).toFixed(2);

        if (scroll >= 0 || scroll <= 1 || event.type === 'init') {
            this.animation.seek(scroll * this.animation.duration);
        }

        //Cleanup variables
        viewport = null,
            viewportHeight = null,
            elementScrollOffset = null,
            scroll = null;
    }
}