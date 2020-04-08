import SimpleAnimation from "./app/simpleAnimation";
import ScrollToAnimation from "./app/scrollToAnimation";

declare const jQuery: any;

(function ($) {
    $.fn.simpleAnimation = function () {

        this.each(function () {
            var $element = $(this);

            if (!$element.data("initSA")) {
                $element.data("initSA", new SimpleAnimation($element));
            }
        });

        return this;
    };

    $.fn.scrollToAnimation = function () {

        this.each(function () {
            var $element = $(this);

            if (!$element.data("initSTA")) {
                $element.data("initSTA", new ScrollToAnimation($element));
            }
        });

        return this;
    };
}(jQuery));

export default SimpleAnimation;