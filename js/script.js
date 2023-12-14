const swiper1 = new Swiper(".mySwiper1", {
  loop: true,
  slidesPerView: 4,
  autoplay: false,
  breakpoints: {
    400: {
      slidesPerView: 1,
    },
    599: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
  },
  pagination: {
    el: false,
  },
  navigation: {
    nextEl: ".swiperBtnNex1",
    prevEl: ".swiperBtnPre1",
  },
  scrollbar: {
    el: false,
  },
});
const swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  slidesPerView: 3,
  autoplay: true,
  breakpoints: {
    599: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
  pagination: {
    el: false,
  },
  navigation: {
    nextEl: ".swiperBtnNex2",
    prevEl: ".swiperBtnPre2",
  },
  scrollbar: {
    el: false,
  },
});
const swiper3 = new Swiper(".mySwiper3", {
  loop: true,
  slidesPerView: 2,
  autoplay: false,
  breakpoints: {
    599: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
  pagination: {
    el: false,
  },
  navigation: {
    nextEl: ".swiperBtnNex3",
    prevEl: ".swiperBtnPre3",
  },
  scrollbar: {
    el: false,
  },
});
//jquery
//jquery
$(document).ready(function () {
  var mixer = mixitup(".allProductsWrapper");
});
