import anime from "animejs";

declare var $: any;

export default class ScrollToAnimation {

    private readonly scrollSpeed: number = 750;

    constructor(element: any) {
        const self = this;

        const duration = element.data('sa-duration');
        this.scrollSpeed = (duration !== undefined ? parseInt(duration) : this.scrollSpeed);

        element.click(function (event: any) {
            event.preventDefault();

            self.scrollTo(event.currentTarget.getAttribute('href'));
        });
    }

    private scrollTo(id: string) {
        let scrollTop: number = 0;

        if (id !== "#") {
            const elementTarget = $(id);

            if (elementTarget !== undefined) {
                scrollTop = elementTarget.offset().top;
            }
        }

        anime.remove("html, body",);
        anime({
            targets: "html, body",
            scrollTop: scrollTop,
            duration: this.scrollSpeed,
            easing: 'easeInOutQuad',
            loop: false
        });
    }

}