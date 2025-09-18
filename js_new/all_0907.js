// image 載入後進畫面
(function () {
  var imgs = document.images,
    len = imgs.length,
    counter = 0;
  [].forEach.call(imgs, function (img) {
    if (img.complete) incrementCounter();
    else img.addEventListener('load', incrementCounter, false);
  });

  function incrementCounter() {
    counter++;
    if (counter === len) {
      console.log('All img load');
    }
  }
  var loadingtime = 800;

  function countDown() {
    console.log(loadingtime);
    loadingtime -= 100;
    if (loadingtime < 0 || counter === len) {
      clearInterval(timer);
      $('.mask').fadeOut(100);
    }
  }
  var timer = setInterval(countDown, 100);
})();

$(window).on('load', function () {
  var $windowTop = 0;

  // [右方小輪播]
  var topSlider = new Swiper('.top-section__slider .swiper-container', {
    autoplay: true,
    loop: true,
    speed: 500,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // [banner輪播]
  if ($('.banner').length == 1) {
    var bannerSlider = new Swiper('.banner .swiper-container', {
      autoplay: true,
      loop: true,
      speed: 1000,
      watchOverflow: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    if (bannerSlider.slides.length - 2 === 1) {
      bannerSlider.autoplay.stop();
      bannerSlider.allowTouchMove = false;
      $('.swiper-button-next, .swiper-button-prev').css('display', 'none');
      $('.swiper-pagination').css('display', 'none');
    }
  }
  // [右邊GoTop]--// 滾動出現
  function rightBox() {
    var $windowTop = $(window).scrollTop();
    if ($windowTop >= 1) {
      $('.right__box').fadeIn(300);
    } else {
      $('.right__box').fadeOut(300);
    }
  }
  // [右邊GoTop]--// 捲動至頂
  $('.gotop').click(function () {
    $('html,body').animate(
      {
        scrollTop: '0px',
      },
      300
    );
  });

  // [影片modal]--//變更連結
  var videoSrc;
  $('.pd__video').on('click', function (e) {
    e.preventDefault();
    videoSrc = $(this).data('src');
    $('#modal-video').attr('src', videoSrc + '?autoplay=1&modestbranding=1&showinfo=0');
  });

  // scroll reveal
  var rate = 1;
  if ($(window).width() > 768) {
    rate = 1;
  } else {
    rate = 0.6;
  }
  window.sr = ScrollReveal({ viewOffset: { bottom: 100 * rate }, duration: 500 });
  sr.reveal('.pd [class^=col]', { origin: 'bottom', distance: '40px', interval: 30 });

  //-------------------mobile---------------------

  if ($(window).width() < 769) {
    navPaneAni();
    footerAddHeight();
    // fixed top slider to bottom
    var $topSlider = $('.top-section__slider').detach();
    $('.wrap').append($topSlider);
  }
  // [top-section__btn]--//面版收合
  $('.top-section__btn').on('touchstart', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-opened');
    $('.nav').toggleClass('show');
  });

  // [nav__tab]--// 下拉選單展開&滑動上方
  function navPaneAni() {
    var drag = false;
    $('.nav__tab')
      .not(':eq(0), .nodrop')
      .on('touchstart', '>a', function () {
        drag = false;
      });
    $('.nav__tab')
      .not(':eq(0), .nodrop')
      .on('touchmove', '>a', function () {
        drag = true;
      });
    $('.nav__tab')
      .not(':eq(0), .nodrop')
      .on('touchend', '>a', function (e) {
        e.preventDefault();
        if (drag == false) {
          var $this = $(this);
          $this.parent('.nav__tab').siblings('.nav__tab').removeClass('tab-active');
          $this.parent('.nav__tab').toggleClass('tab-active');
          // 先收合後再定位
          $('.nav__pane').hide();
          var thisPos = $this.parent('.nav__tab').position().top;
          $('.nav').animate(
            {
              scrollTop: thisPos,
            },
            200
          );
          $('.tab-active .nav__pane').fadeIn(200);
        }
      });
  }

  // [footer&rightBox]--//加高
  function footerAddHeight() {
    var topSectionHeight = $('.top-section__slider').height();
    $('.footer').css('padding-bottom', topSectionHeight);
    $('.right__box').css('bottom', topSectionHeight + 20);
  }

  // [window]--//滾動監聽
  $(window).on('scroll', function () {
    $windowTop = $(window).scrollTop();
    // [右邊GoTop]

    rightBox();
  });
});

// 關閉變更連結，不可放在onload裡
$('#video').on('hide.bs.modal', function () {
  console.log('close');
  $('#modal-video').attr('src', '');
});
