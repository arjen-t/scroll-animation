import {Strategy} from "./strategy";
import {CanvasEvent} from "../canvas/canvasEvent";
import anime from 'animejs';

export class ScrollStrategy implements Strategy {

    private animation: anime;

    constructor(animation: anime) {
        this.animation = animation;
    }

    animate(event: CanvasEvent, options: any): void {
        const viewport = event.canvas.viewport;

        const viewportHeight = (viewport.height - viewport.top - viewport.bottom);
        let elementScrollOffset = 0;

        if (options.scroll.trigger === 'top') {
            elementScrollOffset = viewportHeight - (((event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top) - viewport.top - event.canvas.element.height);
        } else {
            elementScrollOffset = ((event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top) - viewport.bottom;
        }

        //Increase or decrease element scroll speed
        if (options.scroll.speed !== 0) {
            elementScrollOffset = elementScrollOffset + (elementScrollOffset * (options.scroll.speed / 100));
        }

        //Calc the scroll percentage
        const scroll: any = ((elementScrollOffset / viewportHeight)).toFixed(2);

        if (scroll >= 0 || scroll <= 1 || event.type === 'init') {
            this.animation.seek(scroll * this.animation.duration);
        }
    }
}