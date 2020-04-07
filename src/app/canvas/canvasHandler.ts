import {BehaviorSubject, fromEvent, Subscription} from "rxjs";
import {ScrollHandler} from "../scroll/scrollHandler";
import {debounceTime} from "rxjs/operators";
import {CanvasEvent} from "./canvasEvent";

export class CanvasHandler {

    private canvas: any;

    private scrollHandler: ScrollHandler;

    private canvasObservable: BehaviorSubject<CanvasEvent>;

    constructor(element: any, options: any) {
        this.scrollHandler = ScrollHandler.getInstance();

        this.canvas = this.createCanvas(element, options);
        this.canvas.scroll = this.scrollHandler.getScroll(true);

        this.canvasObservable = new BehaviorSubject(new CanvasEvent(this.canvas, 'init'));

        fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => {
                this.canvas = this.createCanvas(element, options);
                this.canvas.scroll = this.scrollHandler.getScroll();

                this.canvasObservable.next(new CanvasEvent(this.canvas, 'resize'));
            }, (error) => {
                this.canvasObservable.error(error);
            }, () => {
                this.canvasObservable.complete();
            });

        this.scrollHandler.subscribe(scroll => {
            this.canvas.scroll = scroll;

            this.canvasObservable.next(new CanvasEvent(this.canvas, 'scroll'));
        }, (error) => {
            this.canvasObservable.error(error);
        }, () => {
            this.canvasObservable.complete();
        });
    }

    private createCanvas(element: any, options: any) {
        const canvas = {
            viewport: {
                height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                top: 0,
                bottom: 0
            },
            element: {
                height: element.outerHeight(),
                top: element.offset().top
            },
            scroll: <any>null
        };

        if (options.viewport.top != null) {
            canvas.viewport.top = parseFloat(options.viewport.top);

            if (typeof options.viewport.top === 'string' && options.viewport.top.indexOf('%') > -1) {
                canvas.viewport.top = canvas.viewport.height * (canvas.viewport.top / 100);
            }
        }

        if (options.viewport.bottom != null) {
            canvas.viewport.bottom = parseFloat(options.viewport.bottom);

            if (typeof options.viewport.bottom === 'string' && options.viewport.bottom.indexOf('%') > -1) {
                canvas.viewport.bottom = canvas.viewport.height * (canvas.viewport.bottom / 100);
            }
        }

        return canvas;
    }

    public subscribe(next?: (value: CanvasEvent) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.canvasObservable.subscribe(next, error, complete);
    }
}