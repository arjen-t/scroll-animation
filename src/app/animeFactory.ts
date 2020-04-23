import SimpleAnimation from "./simpleAnimation";

declare var $: any;
declare var anime: any;

export abstract class AbstractAnimationFactory {

    public abstract makeAnimation(name: string, options: any): any;

}

export class AnimeFactory extends AbstractAnimationFactory {

    public makeAnimation(name: string, options: any): Object | null {
        let animation = SimpleAnimation.getAnimation(name, null);

        if (animation !== null) {
            animation = $.extend({}, animation);

            if (Array.isArray(options.animation.target)) {
                animation.targets = [];

                for (let i: number = 0, end: number = options.animation.target.length; i < end; i++) {
                    const childElement = options.animation.target[i];

                    animation.targets.push(childElement);

                    const timeline = $(childElement).data('timeline');

                    if (timeline !== undefined) {
                        if (animation.timeline === undefined) {
                            animation.timeline = [];
                        }

                        animation.timeline.push({
                            belongsTo: childElement,
                            offset: timeline
                        });
                    }
                }
            } else {
                animation.targets = options.animation.target;
            }

            if (animation.build) {
                animation = animation.build(options, animation);

                //Remove from config
                delete animation.build;
            }

            if (options.animation.duration !== null) {
                animation.duration = options.animation.duration;
            }

            //Set default autoplay to false when no autoplay is defined
            if (animation.autoplay === undefined) {
                animation.autoplay = false;
            }

            animation = this.createAnime(animation);
        }

        return animation;
    }

    private createAnime(config: any): Object {
        if (config.timeline !== undefined) {
            const primaryConfig = $.extend({}, config),
                timelineConfig = $.extend({}, config);

            //Cleanup the properties which aren't needed for the timeline steps
            delete timelineConfig.targets;
            delete timelineConfig.easing;
            delete timelineConfig.duration;
            delete timelineConfig.delay;
            delete timelineConfig.endDelay;
            delete timelineConfig.loop;
            delete timelineConfig.direction;
            delete timelineConfig.timeline;
            delete timelineConfig.autoplay;

            //Cleanup the properties off all
            delete primaryConfig.timeline;
            delete primaryConfig.targets;

            let timeline = anime.timeline(primaryConfig),
                step: any,
                offset: any,
                timelineLength: number = config.timeline.length;

            for (let i = 0, end: number = config.targets.length; i < end; i++) {
                step = {
                    targets: config.targets[i]
                };
                offset = null;

                for (let a: number = 0; a < timelineLength; a++) {
                    if (config.timeline[a]['belongsTo'] === step.targets) {
                        offset = config.timeline[a]['offset'];
                        break;
                    }
                }

                $.extend(step, timelineConfig);

                if (offset != null) {
                    timeline.add(step, offset);
                } else {
                    timeline.add(step);
                }
            }

            step = null;
            offset = null;
            timelineLength = null;

            return timeline;
        }

        return anime(config);
    }
}