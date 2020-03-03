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
    rgb.mobileMenu();
  },
  topBarSearchForm: function () {
    $('.js-open-search, .js-close-search').click(function(e){
      e.preventDefault();

      $(this).parents('.top-bar-search').toggleClass('_top-search_active');
    });


    $('.js-submit-search').click(function(e){
      e.preventDefault();

      $(this).parents('form').submit();
    });
  },
  stickyHeader: function () {
    if (rgb.isSpecialArticle() === false) {
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
        $('body:not(sticky-header) header.main-header:not(_menu-burger_active) .bottom-menu').show();
        $('.logo img').attr('src', logoLarge);
      }

      if ( $('body').hasClass('sticky-header') && ! $('header.main-header').hasClass('_menu-burger_active') ) {
        $('body:not(sticky-header) header.main-header:not(_menu-burger_active) .bottom-menu').hide();
      }
    });
  },
  mobileMenu: function () {
    $('.js-open-mobile-menu').click(function() {
      $('header.main-header').toggleClass('_menu-burger_active');
      
      if ( $('header.main-header').hasClass('_menu-burger_active') ) {
        $('header.main-header .bottom-menu').show();
      } else {
        $('header.main-header .bottom-menu').hide();
      }
    });
  },
  isSpecialArticle: function () {
    if ( $('body').hasClass('article-type-special') ) {
      return false;
    }
  }
};
jQuery(document).ready(rgb.init);