import {CanvasEvent} from "../canvas/canvasEvent";
import {Strategy} from "./strategy";
import anime from 'animejs';

export class ViewportStrategy implements Strategy {

    private animation: anime;

    private status: any = {
        position: -1,
        played: false
    };

    constructor(animation: anime) {
        this.animation = animation;
    }

    public animate(event: CanvasEvent, options: any): void {
        const viewport = event.canvas.viewport;

        let elementOffsetEnter = (event.canvas.scroll.current.y + viewport.height) - event.canvas.element.top - viewport.bottom;
        let elementOffsetExit = (elementOffsetEnter - event.canvas.element.height) * -1;
        let enterScroll = 'down';

        if (options.viewport.trigger === 'top') {
            //Reverse the exit en enter offset
            elementOffsetExit = elementOffsetEnter - (viewport.height - viewport.top - viewport.bottom);
            elementOffsetEnter = (elementOffsetExit - event.canvas.element.height) * -1;

            enterScroll = 'up';
        }

        //Catch first event and determine element is in viewport
        if (event.type === 'init') {
            if (elementOffsetEnter > 0) {
                this.animation.play();

                this.status.position = 1;
                this.status.played = true;
            }
        } else if((options.animation.repeat === false && this.status.played === false) || options.animation.repeat === true) {
            let elementPosition = -1;

            //Determine if element is exit or enter the viewport
            if (enterScroll === event.canvas.scroll.current.direction && elementOffsetExit <= event.canvas.element.height && elementOffsetEnter >= 0) {
                elementPosition = 1;
            } else if (enterScroll !== event.canvas.scroll.current.direction && elementOffsetExit >= 0 && elementOffsetEnter < event.canvas.element.height) {
                elementPosition = 0;
            }

            if ((elementPosition > -1 || event.type === 'resize') && elementPosition !== this.status.position) {
                if (this.status.played) {
                    this.animation.reverse();
                }

                this.animation.play();
                this.status.position = elementPosition;
                this.status.played = true;
            }
        }
    }
}