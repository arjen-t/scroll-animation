import {CanvasEvent} from "../canvas/canvasEvent";
import {Strategy} from "./strategy";
import anime from 'animejs';

export class ViewportStrategy implements Strategy {

    private animation: anime;

    /**
     * Status of the animation
     *
     * -1 Not determine
     * 0 Exit
     * 1 Enter
     */
    private status: number = -1;

    constructor(animation: anime) {
        this.animation = animation;
    }

    public animate(event: CanvasEvent, options: any): void {
        let viewport = event.canvas.viewport;
        let elementOffsetEnter = (event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top - viewport.bottom;
        let enterScroll = 'down';

        if (options.viewport.trigger === 'top') {
            //Reverse the enter offset
            elementOffsetEnter = (((event.canvas.scroll.current.y - event.canvas.element.top) + viewport.top) * -1) + event.canvas.element.height;

            enterScroll = 'up';
        }

        let elementOffsetExit = (elementOffsetEnter) * -1;

        //Catch first event and determine element is in viewport
        if (event.type === 'init') {
            if (elementOffsetEnter > 0) {
                this.animation.play();

                this.status = 1;
            }
        } else if ((options.animation.repeat === false && this.status === -1) || options.animation.repeat === true) {
            let status: number = -1;

            //Determine if element is exit or enter the viewport
            if (event.canvas.scroll.current.direction === enterScroll && elementOffsetExit <= event.canvas.element.height && elementOffsetEnter >= 0) {
                status = 1;
            } else if (event.canvas.scroll.current.direction !== enterScroll && elementOffsetEnter <= event.canvas.element.height && elementOffsetExit >= 0 && this.status === 1) {
                status = 0;
            }

            //Determine if elementPosition cause a animation trigger
            if (status > -1 && status !== this.status) {
                if (this.status > -1) {
                    this.animation.reverse();
                }

                this.animation.play();
                this.status = status;
            }

            status = null;
        }

        //Cleanup variables
        viewport = null,
            elementOffsetEnter = null,
            enterScroll = null,
            elementOffsetExit = null;
    }
}