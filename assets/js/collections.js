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

function handleTabChange(tab) {
  $(".js-nav-tab .indicator").css({
    width: tab.outerWidth(),
    left: tab.position() ? tab.position().left : 0,
  });
  tab = tab + 1;
}

$(document).on("click", ".js-options-tab p", function () {
  handleTabChange($(this));
});
handleTabChange($(".js-options-tab li.active"));

/* ------------------------- handle detail products ------------------------- */

let numberIndex = 0;
$(window).on("load", function () {
  handleTabChange($(".detail_nav li.active"));
});

$(document).on("click", ".detail_nav li", function () {
  numberIndex = $(this).index();

  if (!$(this).is("active")) {
    $(".detail_nav li").removeClass("active");
    $(".detail_content").removeClass("active");
    // tab
    $(this).addClass("active");
    handleTabChange($(this));
    // content
    $(".detail_content:eq(" + numberIndex + ")").addClass("active");
  }
});

/* --------------------------------- filter --------------------------------- */

if ($(".c-filter")) {
  function countFilter() {
    $(".js-filter-count").text($(".js-filter-items.is-active").length);
  }

  $(window).on("pageshow scroll", function () {
    countFilter();
    let scrollf = $(window).scrollTop();
    scrollf >= 100
      ? $(".c-filter").addClass("is-show")
      : $(".c-filter").removeClass("is-show");
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
