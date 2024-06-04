/* ------------------------------- mainvisual ------------------------------- */

const swiperMainvisual = new Swiper(".js-mainvisual-swiper", {
  effect: "fade",
  speed: 1200,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
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

/* ------------------------------- collection ------------------------------- */
let numberIndexCollection = 0;

$(document).on("click", ".collection_tabs li", function () {
  numberIndexCollection = $(this).index();
  if (!$(this).is("active")) {
    $(".collection_tabs li").removeClass("active");
    $(".collection_thumbs li").removeClass("active");
    $(".collection_content").removeClass("active");

    // tab
    $(this).addClass("active");
    // content
    $(".collection_content:eq(" + numberIndexCollection + ")").addClass(
      "active"
    );
    $(".collection_thumbs li:eq(" + numberIndexCollection + ")").addClass(
      "active"
    );
  }
});

// ===== resize =====
const resizeTabCollection = () => {
  const collection_tabs = document.querySelector(".collection_tabs");
  const collection_content = document.querySelectorAll(".collection_content");
  collection_content.forEach((query) => {
    query.style.setProperty("top", collection_tabs.offsetHeight + 47 + "px");
  });
};
["resize", "load"].forEach((evt) => {
  window.addEventListener(evt, () => {
    resizeTabCollection();
  });
});
resizeTabCollection();

/* -------------------------------- recommend ------------------------------- */

const swiperRecommend = new Swiper(".js-recommend-swiper", {
  observer: true,
  observeParents: true,
  grabCursor: true,
  spaceBetween: 20,
  speed: 700,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.145,
    },
    1025: {
      slidesPerView: 4,
    },
  },
});

/* ---------------------------------- shop ---------------------------------- */
const swiperShop = new Swiper(".js-shop-swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "fade",
  speed: 1200,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      allowTouchMove: true,
    },
    1025: {
      allowTouchMove: false,
    },
  },
  on: {
    init: function () {
      $(".shop_progress").removeClass("animate");
      $(".shop_progress").addClass("animate");
    },
    slideChangeTransitionStart: function () {
      $(".shop_progress").removeClass("animate");
    },
    slideChangeTransitionEnd: function () {
      $(".shop_progress").addClass("animate");
    },
  },
});
