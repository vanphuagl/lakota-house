$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionSelector: ".vertical-scrolling",
        anchors: ["1", "2", "3", "4", "5", "6"],
        controlArrows: false,
        scrollingSpeed: 1200,
        easingcss3: "cubic-bezier(.5,.03,0,.99)",
        scrollOverflow: false,
        normalScrollElements: ".scrollable-element",
        scrollBar: false,
        autoScrolling: true,
        afterLoad: function (anchorLink, index) {
            scrolling = false;
            if (index === 6) {
                $('.c-header').removeClass("c-header--white");
            } else {
                $('.c-header').addClass("c-header--white");

            }
        },
        onLeave: function (index, nextIndex, direction) {
            scrolling = true;
        }
    });

    $(window).on("resize orientationchange", function () {
        init()
    });
    init();

    function init() {
        var $normalScroll = $(".scrollable-element"),
            top = -1,
            bottom = -1,
            end = $normalScroll[0].scrollHeight,
            window_height2 = $(window).height();

        $(".about_mainvisual").outerHeight(window_height2);
        $normalScroll.css("max-height", window_height2);

        $normalScroll.scroll(function () {
            top = $(this).scrollTop(), bottom = top + window_height2
        });
        $normalScroll.bind("mousewheel", function (e) {
            e.originalEvent.wheelDelta / 120 > 0
                ? $normalScroll >= window_height2
                    ? top == 0 && $.fn.fullpage.moveSectionUp()
                    : scrolling || $.fn.fullpage.moveSectionUp()
                : bottom == end && $.fn.fullpage.moveSectionDown()
        });
    }
});