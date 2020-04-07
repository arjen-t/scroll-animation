import {fromEvent, Subject, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Scroll} from "./scroll";

declare var $: any;

export class ScrollHandler {

    private static instance: ScrollHandler;

    public scrollObservable: Subject<{ previous: Scroll, current: Scroll }>;

    private scroll: Scroll;

    private constructor() {
        this.scrollObservable = new Subject();
        this.scroll = new Scroll($(window).scrollTop(), $(window).scrollLeft(), 'init');

        fromEvent(window, 'scroll').pipe(
            map(() => {
                return this.getScroll();
            })
        ).subscribe((scroll: any) => {
            this.scroll = scroll.current;

            this.scrollObservable.next(scroll);
        }, (error) => {
            this.scrollObservable.error(error);
        }, () => {
            this.scrollObservable.complete();
        });
    }

    static getInstance(): ScrollHandler {
        if (!ScrollHandler.instance) {
            ScrollHandler.instance = new ScrollHandler();
        }

        return ScrollHandler.instance;
    }

    public getScroll(init?: boolean): { previous: Scroll | null, current: Scroll } {
        if (init === true && this.scroll.direction === 'init') {
            return {
                previous: <Scroll>null,
                current: this.scroll
            }
        }

        const scroll = {
            previous: this.scroll,
            current: <Scroll>null
        };

        let nextScroll = new Scroll($(window).scrollTop(), $(window).scrollLeft(), 'up');

        if (nextScroll.y >= scroll.previous.y) {
            nextScroll.direction = 'down';
        }

        scroll.current = nextScroll;

        return scroll;
    }

    public subscribe(next?: (value: { previous: Scroll, current: Scroll }) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.scrollObservable.subscribe(next, error, complete);
    }
}