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
    rgb.activateStickyHeader();
    rgb.stickyHeaderOnScroll();
    rgb.mobileMenu();
    rgb.customSelect();
    rgb.contentDropdown();
    rgb.articlesSlider();
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
  stickyHeaderOnScroll: function () {
    $(window).on('scroll', function () {
      rgb.activateStickyHeader();
    });
  },
  activateStickyHeader: function () {
    if (rgb.isSpecialArticle() === false) {
      return;
    }

    var headerHeight = $('.main-header').height();
    var logoUrl = $('.logo img').attr('src');
    var logoLarge = logoUrl.replace("white-heb-mobile.svg", "white-heb.svg");
    var logoSmall = logoUrl.replace("white-heb.svg" ,"white-heb-mobile.svg");

    var scrollTop = $(window).scrollTop();
    if (scrollTop > headerHeight) {
      $('body').addClass('sticky-header');
      $('.logo img').attr('src', logoSmall);
    } else {
      $('body').removeClass('sticky-header');
      $('body:not(sticky-header) header.main-header:not(_menu-burger_active) .bottom-menu').show();
      $('.logo img').attr('src', logoLarge);
    }

    if ( $('body').hasClass('transparent-header') ) {
      var articleHeaderHeight = $('.home-header, .archive-header, .page-header').height();

      if (scrollTop > (articleHeaderHeight - headerHeight) ) {
        $('header.main-header').addClass('_background_green');
      } else {
        $('header.main-header').removeClass('_background_green');
      }
    }

    if ( $('body').hasClass('sticky-header') && ! $('header.main-header').hasClass('_menu-burger_active') ) {
      $('body:not(sticky-header) header.main-header:not(_menu-burger_active) .bottom-menu').hide();
    }
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
  },
  customSelect: function () {
    $('.js-custom-select').click(function(){
      $(this).find('.custom-select-list').stop().slideToggle(300);
    });

    $('.custom-select-item').click(function() {
      var optionText = $(this).text();
      var optionVal = $(this).data('val');
      var option = '<option value="' + optionVal + '">' + optionText + '</option>';
      
      $(this).parents('.custom-select').find('select option').remove();
      $(this).parents('.custom-select').find('select').append( option );
      $(this).parents('.custom-select').find('.custom-select-title').text( optionText );
      $(this).parents('.custom-select').find('select').val( optionVal );

      if ( optionVal == '' ) {
        $(this).parents('.custom-select').removeClass('_type_selected');
      } else {
        $(this).parents('.custom-select').addClass('_type_selected');
      }
    });

    $('.filters .filters-list li.active a').click(function(e) {
      e.preventDefault();
    });
  },
  contentDropdown: function () {
    $('.js-content-dropdown .content-dropdown-header').click(function() {
      $(this).parents('.js-content-dropdown').find('.content-dropdown-text').stop().slideToggle();
      $(this).parents('.js-content-dropdown').toggleClass('active');
      $(this).parents('.js-content-dropdown').removeClass('current');
    });
  },
  articlesSlider: function () {
    if ( $('.js-articles-slider').length ) {
      $('.js-articles-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        speed: 300,
        centerMode: true,
        variableWidth: true,
        prevArrow: '<div class="articles-slider-arrow articles-slider-arrow-left icon-slider-arrow-left"></div>',
        nextArrow: '<div class="articles-slider-arrow articles-slider-arrow-right icon-slider-arrow-right"></div>'
      });
    }
  }
};
jQuery(document).ready(rgb.init);