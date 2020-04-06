import {CanvasHandler} from "./canvas/canvasHandler";
import {AbstractAnimationFactory, AnimeFactory} from "./animeFactory";
import {StrategyContainer} from "./strategy/strategyContainer";
import {ViewportStrategy} from "./strategy/viewportStrategy";
import {AnchorStrategy} from "./strategy/anchorStrategy";
import {ScrollStrategy} from "./strategy/scrollStrategy";

declare var $: any;

export default class SimpleAnimation {

    private canvasHandler: CanvasHandler;

    private readonly element: any;

    private static animations: any = [];

    private static animationFactory: AbstractAnimationFactory = null;

    constructor(element: any) {
        this.element = element;

        let options = this.options();
        let strategyContainer = this.createStrategy(options);

        if (strategyContainer.size() > 0) {
            this.canvasHandler = new CanvasHandler(this.element, options);
            this.canvasHandler.subscribe(event => {
                strategyContainer.animate(event, options);
            });
        } else {
            this.element = null;
            options = null;
            strategyContainer = null;
        }
    }

    private createStrategy(options: any): StrategyContainer {
        const animation = this.element.data('sa'),
            animationAnchor = this.element.data('saAnchor'),
            animationScroll = this.element.data('saScroll');

        const container = new StrategyContainer();
        let animationFactory = SimpleAnimation.getAnimationFactory();

        if (animation !== undefined) {
            const viewportAnimation = animationFactory.makeAnimation(animation, options);

            if (viewportAnimation !== null) {
                container.add(new ViewportStrategy(viewportAnimation));
            }
        }

        if (animationAnchor !== undefined && (options.anchor.target !== null && options.anchor.target.length > 0)) {
            const anchorAnimation = animationFactory.makeAnimation(animationAnchor, options);

            if (anchorAnimation !== null) {
                container.add(new AnchorStrategy(anchorAnimation));
            }
        }

        if (animationScroll !== undefined) {
            const scrollAnimation = animationFactory.makeAnimation(animationScroll, options);

            if (scrollAnimation !== null) {

                if (options.scroll.duration !== null) {
                    scrollAnimation.duration = options.scroll.duration;
                }

                container.add(new ScrollStrategy(scrollAnimation));
            }
        }

        animationFactory = null;

        return container;
    }

    private options() {
        const target = this.element.data('saTarget'),
            anchorTarget = this.element.data('anchorTarget'),
            repeat = this.element.data('saRepeat'),
            viewportTrigger = this.element.data('vpTrigger'),
            viewportTop = this.element.data('vpOffsetTop'),
            viewportBottom = this.element.data('vpOffsetBottom'),
            scrollTrigger = this.element.data('scrollTrigger'),
            scrollSpeed = this.element.data('scrollSpeed'),
            scrollDuration = this.element.data('scrollSpeed'),
            duration = this.element.data('saDuration');

        return {
            animation: {
                target: (target !== undefined ? this.element.find(target).toArray() : this.element[0]),
                repeat: (repeat !== undefined ? repeat : true),
                duration: (duration !== undefined ? duration : null)
            },
            viewport: {
                top: viewportTop || 0,
                bottom: viewportBottom || 0,
                trigger: viewportTrigger || 'bottom'
            },
            scroll: {
                trigger: scrollTrigger || 'bottom',
                speed: scrollSpeed || 0,
                duration: (scrollDuration !== undefined ? scrollDuration : null)
            },
            anchor: {
                target: (anchorTarget !== undefined ? $(anchorTarget) : null)
            }
        };
    }

    public static getAnimationFactory(): AbstractAnimationFactory {
        if (SimpleAnimation.animationFactory === null) {
            SimpleAnimation.animationFactory = new AnimeFactory();
        }

        return SimpleAnimation.animationFactory;
    }

    public static addAnimation(name: string, animationSetting: object): any {
        SimpleAnimation.animations[name] = animationSetting;

        return SimpleAnimation;
    }

    public static getAnimation(name: string, fallback: any = null): any {
        return SimpleAnimation.animations[name] || fallback;
    }
}