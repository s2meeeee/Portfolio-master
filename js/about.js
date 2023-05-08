//visual slide
// https://stackoverflow.com/a/36389263
var getTimeout = (function () {
  var e = setTimeout,
    b = {};
  setTimeout = function (a, c) {
    var d = e(a, c);
    b[d] = [Date.now(), c];
    return d;
  };
  return function (a) {
    return (a = b[a]) ? Math.max(a[1] - Date.now() + a[0], 0) : NaN;
  };
})();

function sanitisePercentage(i) {
  return Math.min(100, Math.max(0, i));
}

var percentTime;
var tick;
var progressBar = document.querySelector(".swiper-hero-progress");

var SubSwiper = new Swiper(".sub_swiper .swiper-container", {
  centeredSlides: true,
  // centeredSlidesBounds: true,
  // rewind: true,
  loopedSlides: 3,
  loopAdditionalSlides: 30,
  slidesPerView: 4,
  direction: "vertical",
});

var MainSwiper = new Swiper(".main-swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  oopedSlides: 3,
  loopAdditionalSlides: 30,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  speed: 1000,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".visual .swiper-pagination",
    clickable: true,
    type: "fraction",

    renderFraction: function (currentClass, totalClass) {
      return (
        '<span class= "bold"> 0</span>' +
        '<span class= " ' +
        currentClass +
        '"></span>' +
        " / " +
        " 0" +
        '<span class= "' +
        totalClass +
        '"></span>'
      );
    },
  },
  watchSlidesProgress: true,
});

MainSwiper.controller.control = SubSwiper;
SubSwiper.controller.control = MainSwiper;

function updateSwiperProgressBar(bar, slideDelay) {
  function startProgressBar() {
    resetProgressBar();
    tick = setInterval(progress, 20);
  }

  function progress() {
    var timeLeft = getTimeout(MainSwiper.autoplay.timeout);

    if (MainSwiper.autoplay.running && !MainSwiper.autoplay.paused) {
      percentTime = sanitisePercentage(
        100 - Math.round((timeLeft / slideDelay) * 100)
      );
      bar.style.width = percentTime + "%";

      if (percentTime > 100) {
        resetProgressBar();
      }
    }

    if (MainSwiper.autoplay.paused) {
      bar.style.width = percentTime + "%";
    }
  }

  function resetProgressBar() {
    percentTime = 0;
    bar.style.width = 0;
    clearInterval(tick);
  }

  startProgressBar();
}

$(".swiper-play-btn").click(function () {
  MainSwiper.autoplay.start();
});
$(".swiper-stop-btn").click(function () {
  MainSwiper.autoplay.stop();
});
$(".controll-btn").click(function () {
  $(".swiper-play-btn, .swiper-stop-btn").toggleClass("active");
});

$(".title").click(function () {
  $(this).addClass("active");
  $(this).siblings(".title").removeClass("active");
  $(this).siblings(".desc").stop().slideUp();
  $(this).next().stop().slideDown();
});

// $(window).scroll(function(){
//   let sticky = $('.skillbar2'), // 따라올려는 부모
//       scroll = $(window).scrollTop();// 높이값

//   if (scroll >= 1300) sticky.addClass('on');
//   // 상단에서 500px 도달시 상단 고정 fixed 로 클래스 수정
//   else sticky.removeClass('on');
// });
