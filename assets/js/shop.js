/* ------------------------- shop detail mainvisual ------------------------- */

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
});

/* --------------------------- scroll shop detail --------------------------- */

if (document.getElementById("detailshoppage")) {
  $(window).on("pageshow scroll", function () {
    let hSizeDetail = $(".js-offset-top").offset().top,
      scrollDetail = $(window).scrollTop(),
      bottomDetail = $(".js-offset-top").height();

    scrollDetail + 80 >= hSizeDetail
      ? $(".js-detail-sticky, .js-detail-backtolist").addClass("is-show")
      : $(".js-detail-sticky, .js-detail-backtolist").removeClass("is-show");

    scrollDetail >= bottomDetail &&
      $(".js-detail-backtolist").removeClass("is-show");
  });
}

/* ------------------------------ stockist page ----------------------------- */

if (document.getElementById("stockist")) {
  let filterActive;

  function filterCategory(category) {
    if (filterActive != category) {
      // reset results list
      $("li.stockist_items").removeClass("active");

      // elements to be filtered
      $("li.stockist_items")
        .filter('[data-tag="' + category + '"]')
        .addClass("active");

      // reset active filter
      filterActive = category;
      $(".js-stockist-option").removeClass("active");
    }
  }

  $(window).on("pageshow load", function () {
    const hash = window.location.hash.substring(1);

    if (hash == "") {
      $(".js-stockist-option").addClass("active");
      $("li.stockist_items").addClass("active");
    } else {
      $("li.stockist_items")
        .filter('[data-tag="' + hash + '"]')
        .addClass("active");
      $(".js-stockist-option")
        .filter('[data-filter-tag="' + hash + '"]')
        .addClass("active");
    }
  });

  $(".js-stockist-option").click(function () {
    filterCategory($(this).attr("data-filter-tag"));
    $(this).addClass("active");
  });
}
