export class CanvasEvent {

    public canvas: any;

    public type: string;

    constructor(canvas: any, type: string) {
        this.canvas = canvas;
        this.type = type;
    }

}