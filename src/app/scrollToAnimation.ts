declare var $: any;
declare var anime: any;

export default class ScrollToAnimation {

    constructor(element: any) {
        const self = this;

        let dataDuration = element.data('saDuration'),
            dataOffset = element.data('vpOffsetTop');
        const duration = (dataDuration !== undefined ? parseInt(dataDuration) : 750);
        let offset = (dataOffset !== undefined ? parseInt(dataOffset) : 0);

        element.click(function (event: any) {
            event.preventDefault();

            if (typeof dataOffset === 'string' && dataOffset.indexOf('%') > -1) {
                offset = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * (offset / 100);
            }

            self.scrollTo(event.currentTarget.getAttribute('href'), duration, offset);
        });

        dataDuration = null;
    }

    private scrollTo(id: string, scrollDuration: number, offset?: number) {
        let scrollTop: number = 0;

        if (id !== "#") {
            const elementTarget = $(id);

            if (elementTarget.length > 0) {
                scrollTop = elementTarget.offset().top;
            }
        }

        if (offset !== undefined) {
            scrollTop = scrollTop + offset;
        }

        anime.remove("html, body",);
        anime({
            targets: "html, body",
            scrollTop: scrollTop,
            duration: scrollDuration,
            easing: 'easeInOutQuad',
            loop: false
        });
    }

}