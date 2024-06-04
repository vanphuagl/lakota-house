/* --------------------------------- options -------------------------------- */

$(".js-navi_btn_option").click(function () {
  let target = $(this).attr("data-target");
  $(".js-navi_option").stop().fadeOut(300);

  $(this).hasClass("is-active")
    ? $(this).removeClass("is-active")
    : ($(".js-navi_btn_option").removeClass("is-active"),
      $(this).addClass("is-active"),
      $("#" + target)
        .stop()
        .fadeIn(300));
});

$(document).on("click", ".tab-option", function () {
  let tabID = $(this).attr("data-tab");

  $(this).addClass("active").siblings().removeClass("active");
  $("#option-" + tabID)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

/* -------------------------- handle option mobile -------------------------- */

function handleTabOption(tab) {
  $(".js-options-tab .is-indicator").css({
    width: tab.outerWidth(),
    left: tab.position() ? tab.position().left : 0,
  });
  tab = tab + 1;
}

$(document).on("click", ".js-options-tab p", function () {
  handleTabOption($(this));
});
handleTabOption($(".js-options-tab li.active"));

/* --------------------------------- filter --------------------------------- */

if ($(".c-filter")) {
  function countFilter() {
    $(".js-filter-count").text($(".js-filter-items.is-active").length);
  }

  $(window).on("pageshow scroll", function () {
    countFilter();
    let scrollf = $(window).scrollTop();
    let footerSetTop = $(".c-footer").offset().top;

    scrollf >= 100
      ? $(".c-filter").addClass("is-show")
      : $(".c-filter").removeClass("is-show");

    scrollf + 1000 >= footerSetTop && $(".c-filter").removeClass("is-show");
  });

  $("[data-filter-toggler]").on("click", function () {
    $(".js-overlay").addClass("is-visible");
    $(document.body).addClass("disable-scroll");
    $("[data-filter-popup]").addClass("is-open");
  });

  $("[close-filter-popup]").on("click", function () {
    $(".js-overlay").removeClass("is-visible");
    $(document.body).removeClass("disable-scroll");
    $("[data-filter-popup]").removeClass("is-open");
  });

  // handle filter popup
  $(".js-filter-items").on("click", function () {
    $(this).toggleClass("is-active");
    countFilter();
  });

  $(".js-filter-clear").on("click", function () {
    $(".js-filter-items").removeClass("is-active");
    countFilter();
  });
}
