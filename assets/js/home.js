"use strict";

/* ------------------------------ header scroll ----------------------------- */

$(document).ready(function () {
  // scroll invert header
  $(window).scroll(function () {
    let hSize = $(".js-offset-top").offset().top,
      scroll = $(window).scrollTop();

    scroll >= hSize
      ? $(".js-header-top").removeClass("c-header--white")
      : $(".js-header-top").addClass("c-header--white");
  });

  // setHeight
  function setHeight() {
    let footdivheight = $(".js-c-attention").height(),
      hSize = $(window).height(),
      heightVisual = hSize - footdivheight;

    $(".js-header-top").css("top", footdivheight);
    $(".mainvisual").css("height", heightVisual);
  }
  setHeight();
  $(window).resize(function () {
    setHeight();
  });

  // handle close attention
  $(".js-close-attention").click(function () {
    $(this).parent().hide(), setHeight();
  });

  // scroll position
  $(".js-header-top").css("position", "absolute");
  $(window).scroll(function () {
    let footdivheight = $(".c-attention").height(),
      hMain = $(".mainvisual").offset().top,
      scroll = $(window).scrollTop();

    scroll >= hMain
      ? ($(".js-header-top").css("top", 0),
        $(".js-header-top").css("position", "fixed"))
      : ($(".js-header-top").css("top", footdivheight),
        $(".js-header-top").css("position", "absolute"));
  });
});

/* ------------------------------- mainvisual ------------------------------- */

const swiperMainvisual = new Swiper(".js-mainvisual-swiper", {
  effect: "fade",
  speed: 1000,
  autoplay: {
    delay: 6000,
  },
  allowTouchMove: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
    },
  },
  on: {
    init: doSomethingWithActiveSlide,
    slideChange: doSomethingWithActiveSlide,
  },
});

function doSomethingWithActiveSlide() {
  const mainvisualPagination = document.querySelector(
    ".mainvisual_swiper .swiper-pagination"
  );
  const mainvisualTitle = document.querySelectorAll(
    ".homepage .mainvisual_info"
  );

  mainvisualPagination.style.setProperty(
    "bottom",
    mainvisualTitle[this.activeIndex].offsetHeight + "px"
  );
}
