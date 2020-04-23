import {Strategy} from "./strategy";
import {CanvasEvent} from "../canvas/canvasEvent";
import {Scroll} from "../scroll/scroll";

export class AnchorStrategy implements Strategy {

    private animation: any;

    private animationScroll: Scroll = null;

    private anchorTop = 0;

    constructor(animation: any) {
        this.animation = animation;
    }

    animate(event: CanvasEvent, options: any): void {
        if (event.type === 'init' || event.type === 'resize') {
            this.anchorTop = (event.canvas.scroll.current.y - event.canvas.element.top) + options.anchor.target.offset().top;
        }

        let anchorOffset = this.anchorTop - event.canvas.scroll.current.y;

        if (event.type === 'init' || this.animationScroll === null) {
            if (event.canvas.element.height >= anchorOffset) {
                this.animation.play();

                this.animationScroll = event.canvas.scroll.current;
            }
        } else if (
            (
                (event.canvas.element.height >= anchorOffset && event.canvas.scroll.current.direction === 'down') ||
                (event.canvas.element.height <= anchorOffset && event.canvas.scroll.current.direction === 'up')
            ) &&
            event.canvas.scroll.current.direction !== this.animationScroll.direction
        ) {
            //If true the animation was played before so let's reverse and play it
            if ((this.animationScroll.direction === 'init' && event.canvas.scroll.current.direction === 'up') || this.animationScroll.direction !== 'init') {
                this.animation.reverse();
                this.animation.play();
            }

            //Store current scroll
            this.animationScroll = event.canvas.scroll.current;
        }

        //Cleanup variables
        anchorOffset = null;
    }
}