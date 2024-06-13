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

$(".js-overlay").on("click", function () {
  $(".js-c-menu").removeClass("is-open");
  $(".js-c-search").removeClass("is-open");
  $(".js-c-cart").removeClass("is-open");
  detectOverlay(false);
});

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

// handle quantity
const minusBtn = document.querySelector(".js-cart-qty-descrease");
const plusBtn = document.querySelector(".js-cart-qty-increase");
const inputBox = document.querySelector(".js-cart-qty-number");

if (
  inputBox !== undefined &&
  minusBtn !== undefined &&
  plusBtn !== undefined &&
  inputBox !== null &&
  minusBtn !== null &&
  plusBtn !== null
) {
  updateButtonStates();

  plusBtn.addEventListener("click", increaseValue);
  minusBtn.addEventListener("click", decreaseValue);
  inputBox.addEventListener("input", handleQuantityChange);

  function updateButtonStates() {
    const value = parseInt(inputBox.value);
    minusBtn.disabled = value <= 1;
    plusBtn.disabled = value >= parseInt(inputBox.max);
  }

  function decreaseValue() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : Math.max(value - 1, 1);
    inputBox.value = value;
    updateButtonStates();
    handleQuantityChange();
  }

  function increaseValue() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : Math.min(value + 1, parseInt(inputBox.max));
    inputBox.value = value;
    updateButtonStates();
    handleQuantityChange();
  }

  function handleQuantityChange() {
    let value = parseInt(inputBox.value);
    value = isNaN(value) ? 1 : value;
    // Execute your code here based on the updated quantity value
    console.log("Quantity changed:", value);
  }
}

/* ---------------------------------- mega ---------------------------------- */

$(".c-header .js-show-mega").hover(
  function () {
    $(".c-header").addClass("open-mega");
  },
  function () {
    $(".c-header").removeClass("open-mega");
  }
),
  $(window).scroll(function () {
    $(".c-header").removeClass("open-mega");
  });

$(document).on("click", ".tab-link", function () {
  let tabID = $(this).attr("data-tab");

  $(this).addClass("active").siblings().removeClass("active");
  $("#tab-" + tabID)
    .addClass("active")
    .siblings()
    .removeClass("active");
});

/* --------------------------------- archor --------------------------------- */

$(document).on(
  "click",
  'a:not([href^="#"]):not([target]):not([href^="mailto"]):not([href^="tel"]):not(".open-gallery")',
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

/* ------------------------------- products ------------------------------ */

const swiperProducts = new Swiper(".js-products-swiper", {
  observer: true,
  observeParents: true,
  grabCursor: true,
  speed: 700,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

/* ---------------------------------- blogs --------------------------------- */
const categoryBtn = document.querySelector(".js-blogs-selector");
const categoryPanel = document.querySelector(".blog_group");

if (categoryBtn) {
  categoryBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    if (categoryPanel.style.maxHeight) {
      categoryPanel.style.maxHeight = null;
    } else {
      categoryPanel.style.maxHeight = categoryPanel.scrollHeight + "px";
    }
  });
}

/* --------------------------------- contact -------------------------------- */

if (document.getElementById("contactpage")) {
  // handle checkbox
  $("#js-checkbox").change(function () {
    let isCheck = this.checked;
    if (isCheck) {
      $(this).addClass("active");
      $(this)
        .closest("#js-contact-form")
        .find(".js-contact-confirm")
        .addClass("active");
    } else {
      $(this).removeClass("active");
      $(this)
        .closest("#js-contact-form")
        .find(".js-contact-confirm")
        .removeClass("active");
    }
  });

  // handle clear
  $(".js-contact-clear").click(function () {
    $("#js-contact-form").find("input, textarea").val("");
  });
}

/* ------------------------------ scroll to top ----------------------------- */

$(".js-scrollTop").click(function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ------------------------------- handle tabs ------------------------------ */

function handleTabChange(tab) {
  $(".js-nav-tab .is-indicator").css({
    width: tab.outerWidth(),
    left: tab.position() ? tab.position().left : 0,
  });
  tab = tab + 1;
}

let numberIndex = 0;
$(window).on("load", function () {
  if ($(".js-nav-tab")) {
    handleTabChange($(".js-nav-tab li.active"));
  }
});

$(document).on("click", ".js-nav-tab li", function () {
  numberIndex = $(this).index();

  if (!$(this).is("active")) {
    $(".js-nav-tab li").removeClass("active");
    $(".js-content-tab").removeClass("active");
    // tab
    $(this).addClass("active");
    handleTabChange($(this));
    // content
    $(".js-content-tab:eq(" + numberIndex + ")").addClass("active");
  }
});
