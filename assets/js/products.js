/* ---------------------------------- modal --------------------------------- */

const toggleModals = $("[data-modal-toggler]");

// handle modal
toggleModals.each(function () {
  $(this).on("click", function () {
    const selector = $(
      "[data-modal-" + $(this).attr("data-modal-toggler") + "]"
    );
    selector.fadeIn(300);
    $(".js-overlay").addClass("is-visible");
    $(document.body).addClass("disable-scroll");
  });
});

// close modal
$("[close-modal]").each(function () {
  $(this).on("click", function () {
    $(".js-products-modal").fadeOut(300);
    $(".js-overlay").removeClass("is-visible");
    $(document.body).removeClass("disable-scroll");
  });
});

/* ------------------------------ custom cursor ----------------------------- */

const cursorPrev = document.querySelector(".cursor-prev");
const cursorNext = document.querySelector(".cursor-next");

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out",
    },
  });

  if (
    document.querySelector(".top_swiper .swiper-button-next") &&
    document.querySelector(".top_swiper .swiper-button-prev")
  ) {
    // hover section slider
    if (
      target.tagName.toLowerCase() === "button" &&
      target.closest(".top_swiper .swiper-button-next")
    ) {
      tl.to(cursorPrev, {
        opacity: 0,
      }).to(
        cursorNext,
        {
          opacity: 1,
        },
        "-=0.5"
      );
    } else if (
      target.tagName.toLowerCase() === "button" &&
      target.closest(".top_swiper .swiper-button-prev")
    ) {
      tl.to(cursorPrev, {
        opacity: 1,
      }).to(
        cursorNext,
        {
          opacity: 0,
        },
        "-=0.5"
      );
    } else {
      tl.to(".js-cursor", {
        opacity: 0,
      });
    }
  }
}

function mouseleaveHandler() {
  if (document.querySelector(".js-cursor")) {
    gsap.to(".js-cursor", {
      opacity: 0,
    });
  }
}

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);

/* ----------------------------- products swiper ---------------------------- */

const productsThumbs = new Swiper(".js-gallery-thumbnail", {
  spaceBetween: 15,
  slidesPerView: "auto",
  freeMode: false,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  watchOverflow: true,
});

const productsTop = new Swiper(".js-gallery-top", {
  centeredSlides: true,
  speed: 700,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      allowTouchMove: true,
      spaceBetween: 0,
    },
    1025: {
      slidesPerView: "auto",
      allowTouchMove: false,
      spaceBetween: 200,
    },
  },
  thumbs: {
    swiper: productsThumbs,
  },
  on: {
    slideChange: function () {
      let e = this.realIndex + 1;
      document.querySelector(".js-gallery-counter .current").innerHTML = e;
    },
    init: function (sw) {
      document.querySelector(".js-gallery-counter .total").innerHTML =
        sw.slides.length;
    },
  },
});

/* -------------------------------- fixedCart ------------------------------- */

$(window).on("pageshow scroll", function () {
  let hSize = $(".js-offset-top").offset().top,
    relatedSize = $(".js-proffset-top").offset().top,
    scroll = $(window).scrollTop();

  scroll >= 100
    ? $(".js-products-fixedcart").addClass("is-show")
    : $(".js-products-fixedcart").removeClass("is-show");
  scroll + 1000 >= relatedSize &&
    $(".js-products-fixedcart").removeClass("is-show");
});

/* ------------------------------- photoswipe ------------------------------- */

import PhotoSwipeLightbox from "https://unpkg.com/photoswipe@5.4.2/dist/photoswipe-lightbox.esm.js";
import PhotoSwipe from "https://unpkg.com/photoswipe@5.4.2/dist/photoswipe.esm.js";

const leftArrowSVGString =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="26.828" viewBox="0 0 14.828 26.828"> <g id="Group_486" data-name="Group 486" transform="translate(1.414 1.414)"> <line id="Line_7" data-name="Line 7" x1="12" y2="12" fill="none" stroke="#000" stroke-linecap="square" stroke-width="2"/> <line id="Line_8" data-name="Line 8" x1="12" y1="12" transform="translate(0 12)" fill="none" stroke="#000" stroke-linecap="square" stroke-width="2"/> </g> </svg>';
const rightArrowSVGString =
  '<svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="26.828" viewBox="0 0 14.828 26.828"> <g id="Group_479" data-name="Group 479" transform="translate(1.414 1.414)"> <line id="Line_7" data-name="Line 7" x2="12" y2="12" fill="none" stroke="#000" stroke-linecap="square" stroke-width="2"/> <line id="Line_8" data-name="Line 8" y1="12" x2="12" transform="translate(0 12)" fill="none" stroke="#000" stroke-linecap="square" stroke-width="2"/> </g> </svg>';
const closeSvgString =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="16.414" viewBox="0 0 16.414 16.414"> <g id="Group_484" data-name="Group 484" transform="translate(-1401.293 -26.293)"> <line id="Line_103483" data-name="Line 103483" x2="15" y2="15" transform="translate(1402 27)" fill="none" stroke="#000" stroke-width="2"/> <line id="Line_103484" data-name="Line 103484" x1="15" y2="15" transform="translate(1402 27)" fill="none" stroke="#000" stroke-width="2"/> </g> </svg>';
const zoomSvgString =
  '<svg id="Group_2" data-name="Group 2" xmlns="http://www.w3.org/2000/svg" width="17.414" height="17.414" viewBox="0 0 17.414 17.414"> <g id="Ellipse_1" data-name="Ellipse 1" fill="none" stroke="#000" stroke-width="2"> <circle cx="7" cy="7" r="7" stroke="none"/> <circle cx="7" cy="7" r="6" fill="none"/> </g> <line id="Line_3" data-name="Line 3" x2="4" y2="4" transform="translate(12 12)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="2"/> <g id="Group_485" data-name="Group 485" transform="translate(0 -0.5)"> <line id="Line_103485" data-name="Line 103485" x2="6.135" transform="translate(4 7.568)" fill="none" stroke="#000" stroke-width="1"/> <line id="Line_103486" data-name="Line 103486" x2="6.135" transform="translate(7.068 4.5) rotate(90)" fill="none" stroke="#000" stroke-width="1"/> </g> </svg>';

const photo_swipe_options = {
  arrowPrevSVG: leftArrowSVGString,
  arrowNextSVG: rightArrowSVGString,
  closeSVG: closeSvgString,
  zoomSVG: zoomSvgString,
  gallery: "#my-gallery",
  pswpModule: PhotoSwipe,
  bgOpacity: 1,
  showHideOpacity: true,
  children: "a",
  loop: true,
  showHideAnimationType: "fade" /* options: fade, zoom, none */,
  /* Click on image moves to the next slide */
  // imageClickAction: "next",
  // tapAction: "next",
  /* ## Hiding a specific UI element ## */
  // zoom: true,
  // close: true,
  // counter: true,
  // arrowKeys: true,
  // wheelToZoom: true,
};

const lightbox = new PhotoSwipeLightbox(photo_swipe_options);
lightbox.init();

lightbox.on("change", () => {
  const { pswp } = lightbox;
  productsTop.slideTo(pswp.currIndex, 0, false);
});

/* ### PhotoSwipe events ### */
lightbox.on("afterInit", () => {
  const { pswp } = lightbox;
  if (productsTop.params.autoplay.enabled) {
    productsTop.autoplay.stop();
  }
});

lightbox.on("closingAnimationStart", () => {
  const { pswp } = lightbox;
  productsTop.slideTo(pswp.currIndex, 0, false);
  if (productsTop.params.autoplay.enabled) {
    productsTop.autoplay.start();
  }
});
