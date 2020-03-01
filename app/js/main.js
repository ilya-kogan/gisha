rgb = {
  isHome: function () {
    return $("body").hasClass("home");
  },
  isMobile: function () {
    return $("body").hasClass("mobile");
  },
  subdomain : 'dev',
  init: function () {
    rgb.topBarSearchForm();
    rgb.stickyHeader();
  },
  topBarSearchForm: function () {
    $('.js-open-search, .js-close-search').click(function(e){
      e.preventDefault();

      $(this).parents('.top-bar-search').toggleClass('top-search-active');
    });


    $('.js-submit-search').click(function(e){
      e.preventDefault();

      $(this).parents('form').submit();
    });
  },
  stickyHeader: function () {
    if (rgb.isMobile()) {
      return;
    }

    var headerHeight = $('.main-header').height();
    var logoUrl = $('.logo img').attr('src');
    var logoLarge = logoUrl.replace("white-heb-mobile.svg", "white-heb.svg");
    var logoSmall = logoUrl.replace("white-heb.svg" ,"white-heb-mobile.svg");

    $(window).on('scroll', function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > headerHeight) {
        $('body').addClass('sticky-header');
        $('.logo img').attr('src', logoSmall);
      } else {
        $('body').removeClass('sticky-header');
        $('.logo img').attr('src', logoLarge);
      }
    });
  }
};
jQuery(document).ready(rgb.init);