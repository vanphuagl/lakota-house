"use strict";

/* --------------------------- resize mobile 100vh -------------------------- */

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );

  // height menu
  const windowHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  document.getElementById("cmenu").style.height = windowHeight + "px";
  document.getElementById("ccart").style.height = windowHeight + "px";
};
window.addEventListener("resize", appHeight);
appHeight();

/* --------------------------------- fadeout -------------------------------- */

$(window).on("pageshow load", function () {
  $("body").removeClass("fadeout");
});

function detectOverlay(detect) {
  if (detect) {
    $(".js-overlay").addClass("is-visible");
    $(document.body).addClass("disable-scroll");
  } else {
    $(".js-overlay").removeClass("is-visible");
    $(document.body).removeClass("disable-scroll");
  }
}

/* ---------------------------------- menu ---------------------------------- */

// toggle menu
$(".js-btn-menu").on("click", function () {
  if ($(".js-c-menu").hasClass("is-open")) {
    $(".js-c-menu").removeClass("is-open");
    detectOverlay(false);
  } else {
    $(".js-c-menu").addClass("is-open");
    detectOverlay(true);
  }
});

// handle link menu
$(".c-menu_link, .c-menu_bg").on("click", function () {
  $(".js-c-menu").removeClass("is-open");
  detectOverlay(false);
});

// toggle collapse
let accordion = document.getElementsByClassName("js-collapse");
let panel = document.getElementsByClassName("js-panel");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("open");
    if (panel[i].style.maxHeight) {
      panel[i].style.maxHeight = null;
    } else {
      panel[i].style.maxHeight = panel[i].scrollHeight + "px";
    }
  });
}

/* --------------------------------- search --------------------------------- */

// toggle search
$(".js-btn-search").on("click", function () {
  if ($(".js-c-search").hasClass("is-open")) {
    $(".js-c-search").removeClass("is-open");
    detectOverlay(false);
  } else {
    $(".js-c-search").addClass("is-open");
    detectOverlay(true);
  }
});

/* ---------------------------------- cart ---------------------------------- */

// toggle cart
$(".js-btn-cart").on("click", function () {
  if ($(".js-c-cart").hasClass("is-open")) {
    $(".js-c-cart").removeClass("is-open");
    detectOverlay(false);
  } else {
    $(".js-c-cart").addClass("is-open");
    setTimeout(() => {
      detectOverlay(true);
    }, 50);
  }
});

$(".js-cart-checkbox").change(function () {
  let isCheck = this.checked;
  if (isCheck) {
    $(this).addClass("active");
  } else {
    $(this).removeClass("active");
  }
});

/* --------------------------------- archor --------------------------------- */

$(document).on(
  "click",
  'a:not([href^="#"]):not([target]):not([href^="mailto"]):not([href^="tel"])',
  function (e) {
    e.preventDefault();
    const url = $(this).attr("href");
    if (url !== "") {
      const idx = url.indexOf("#");
      const hash = idx != -1 ? url.substring(idx) : "";
      if ($(hash).length > 0) {
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          300
        );
        return false;
      }
      $("body").addClass("fadeout");
      setTimeout(function () {
        window.location = url;
      }, 500);
    }
    return false;
  }
);
