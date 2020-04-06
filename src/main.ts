import SimpleAnimation from "./app/simpleAnimation";

declare const jQuery: any;

(function ($) {
    $.fn.simpleAnimation = function () {

        this.each(function () {
            var $element = $(this);

            if (!$element.data("init")) {
                $element.data("init", new SimpleAnimation($element));
            }
        });

        return this;
    };
}(jQuery));

export default SimpleAnimation;