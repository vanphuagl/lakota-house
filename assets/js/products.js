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

  if ($(window).width() > 1023) {
    scroll >= hSize
      ? $(".js-products-fixedcart").addClass("is-show")
      : $(".js-products-fixedcart").removeClass("is-show");
  } else {
    scroll >= 100
      ? $(".js-products-fixedcart").addClass("is-show")
      : $(".js-products-fixedcart").removeClass("is-show");
  }
  scroll + 1000 >= relatedSize &&
    $(".js-products-fixedcart").removeClass("is-show");
});

/* ------------------------------- photoswipe ------------------------------- */

import PhotoSwipeLightbox from "https://unpkg.com/photoswipe@5.4.2/dist/photoswipe-lightbox.esm.js";
import PhotoSwipe from "https://unpkg.com/photoswipe@5.4.2/dist/photoswipe.esm.js";

const photo_swipe_options = {
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