import {Strategy} from "./strategy";
import {CanvasEvent} from "../canvas/canvasEvent";

export class StrategyContainer implements Strategy {

    private list: Strategy[];

    private listLength: number = 0;

    constructor() {
        this.list = [];
    }

    animate(event: CanvasEvent, options: any): void {
        for (let i = 0; i < this.listLength; i++) {
            this.list[i].animate(event, options);
        }
    }

    public add(strategy: Strategy) {
        this.list.push(strategy);

        this.listLength = this.list.length;
    }

    public size() {
        return this.listLength;
    }
}