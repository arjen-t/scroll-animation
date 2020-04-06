import {CanvasEvent} from "../canvas/canvasEvent";
import {Scroll} from "../scroll/scroll";
import {Strategy} from "./strategy";
import anime from 'animejs';

export class ViewportStrategy implements Strategy {

    private animationScroll: Scroll = null;

    private animation: anime;

    constructor(animation: anime) {
        this.animation = animation;
    }

    public animate(event: CanvasEvent, options: any): void {
        const viewport = event.canvas.viewport;

        let elementOffsetTop = (event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top - viewport.bottom;

        if (options.viewport.trigger === 'top') {
            elementOffsetTop = elementOffsetTop - (viewport.height - viewport.top - viewport.bottom);
        }

        const elementOffsetBottom = (elementOffsetTop - event.canvas.element.height) * -1;

        //Catch first event and determine element is in viewport
        if (event.type === 'init') {
            if (options.viewport.trigger === 'top') {
                if (elementOffsetBottom > 0) {
                    this.animation.play();
                    this.animationScroll = event.canvas.scroll.current;
                }
            } else {
                if (elementOffsetTop > 0) {
                    this.animation.play();
                    this.animationScroll = event.canvas.scroll.current;
                }
            }
        } else if (event.canvas.element.height > elementOffsetTop && event.canvas.element.height > elementOffsetBottom) {
            //Continue when element is in viewport
            if (this.animationScroll === null || (options.animation.repeat === true && event.canvas.scroll.current.direction !== this.animationScroll.direction)) {

                //Determine if animation should be played
                if (this.animationScroll === null ||
                    this.animationScroll.direction !== 'init' ||
                    (options.viewport.trigger === 'top' && event.canvas.scroll.current.direction === 'down') ||
                    (options.viewport.trigger !== 'top' && event.canvas.scroll.current.direction === 'up')) {

                    //If true the animation was played before so let's reverse it
                    if (this.animationScroll !== null) {
                        this.animation.reverse();
                    }

                    this.animation.play();
                }

                //Store current scroll
                this.animationScroll = event.canvas.scroll.current;
            }
        }
    }
}