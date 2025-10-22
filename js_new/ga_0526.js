

$(window).on('load', function () {

  // [選單GA]
  $('.nav__tab').each(function (index) {
    var gaClass = 'L';         // 代號
    var gaAction = gaClass + '_' + index;    // 分類1
    if (index > 0) {
      // 查看更多
      $(this).on('click', '.more>a', function () {

        console.table({ 'eventAction': gaAction, 'eventLabel': 0 })
        dataLayer.push({
          'event': 'click-ga',
          'eventCategory': 'applesite',
          'eventAction': gaAction,
          'eventLabel': 0,
        });

      })
      if ($(window).width() > 768) {
        // 桌機
        $(this).on('click', '>a', function () {

          console.table({ 'eventAction': gaAction, 'eventLabel': 0 })
          dataLayer.push({
            'event': 'click-ga',
            'eventCategory': 'applesite',
            'eventAction': gaAction,
            'eventLabel': 0,
          });

        })
        // 小banner
        $(this).find('.nav__pane--ad').each(function (index) {
          var gaLabel = gaClass.toLowerCase() + '_' + (index + 1); // 分類2:
          $(this).on('click', function () {

            console.table({ 'eventAction': gaAction, 'eventLabel': gaLabel })
            dataLayer.push({
              'event': 'click-ga',
              'eventCategory': 'applesite',
              'eventAction': gaAction,
              'eventLabel': gaLabel,
            });

          })
        })
      }
    }
  })

  // [除了選單所有GA]
  $('[data-class]').each(function () {
    var $this = $(this);
    var isSlider = $this.hasClass('ga-slider'); // 區塊是否為輪播圖
    var gaClass = $this.data('class');          // 取得區塊 GA 代號
    var total;                                  // 區塊 ga-bn 總張數
    if (!isSlider) {
      total = $this.find('.ga-bn').length;
    } else {
      total = $this.find('.ga-bn').length - 2;  // 區塊若為輪播則-2(swiper前後自動各加一張)
    }
    var gaAction = gaClass + '_' + total;     // GA第一類別 代號_總張數
    $this.find('.ga-bn').each(function (index) {
      var gaLabel;                              // GA第二類別 代號(小寫)_目前張數
      if (!isSlider) {
        gaLabel = gaClass.toLowerCase() + '_' + (index + 1);
      } else {
        gaLabel = gaClass.toLowerCase() + '_' + ($(this).data('swiper-slide-index') + 1)
      }
      $(this).on('click', function () {

        console.table({ 'isSlider': isSlider, 'eventAction': gaAction, 'eventLabel': gaLabel })
        dataLayer.push({
          'event': 'click-ga',
          'eventCategory': 'applesite',
          'eventAction': gaAction,
          'eventLabel': gaLabel,
        });

      })
    })
  })

  // $('a').on('click', function (e) {
  //   e.preventDefault();
  // })

})



