import {CanvasEvent} from "../canvas/canvasEvent";

export interface Strategy {

    animate(event: CanvasEvent, options:any): void

}