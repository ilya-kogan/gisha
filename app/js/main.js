rgb = {
  isHome: function () {
    return $("body").hasClass("home");
  },
  isMobile: function () {
    return $("body").hasClass("mobile");
  },
  isSingle: function () {
    return $("body").hasClass("single");
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
    rgb.articleSingleSlideshow();
    rgb.mainMobileMenu();
    rgb.rgbFilters();


    //Mobile
    if ( rgb.isMobile() ) {
      rgb.mobileTagFilters();
    }
    
    if (rgb.isSingle()) {
      rgb.IS.init();
      rgb.rgbIsEditor();
      rgb.anchorLink();
      rgb.moveArticleSections();
      rgb.articlesWidgetSlider();
    }
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

    if ( rgb.isMobile() ) {
      $('.logo img').attr('src', logoSmall);
    } else {
      $('.logo img').attr('src', logoLarge);
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
  mainMobileMenu: function () {
    $('.js-open-main-mobile-menu, .js-mobile-menu-close').click(function() {      
      $('body').toggleClass('mobile-menu-active');
      $('.js-mobile-menu').stop().toggle();
    });

    $('.mobile-menu-items a').click(function() {
      $(this).find('span').toggleClass('active-arrow');
      $(this).parents('li').find('.submenu').stop().slideToggle();
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
      if ( $('body').hasClass('en') ) {
        var rtl = false;
        var prev = 'left';
        var next = 'right';
      } else {
        var rtl = true;
        var prev = 'right';
        var next = 'left';
      }

      $('.js-articles-slider').slick({
        rtl: rtl,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: 'articles-slider-dots',
        infinite: false,
        speed: 300,
        centerMode: true,
        variableWidth: true,
        prevArrow: '<div class="articles-slider-arrow articles-slider-arrow-' + prev + ' icon-slider-arrow-' + prev + '"></div>',
        nextArrow: '<div class="articles-slider-arrow articles-slider-arrow-' + next + ' icon-slider-arrow-' + next + '"></div>',
        responsive: [
          {
            breakpoint: 500,
            settings: {
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              infinite: false,
              speed: 300,
              centerMode: false,
              variableWidth: false
            }
          }
        ]
      });
    }
  },
  articlesWidgetSlider: function () {
    if ( $('.js-posts-widget-slider').length ) {
      $('.js-posts-widget-slider').slick({
        rtl: true,
        infinite: false,
        slidesToShow: 1.5,
        prevArrow: '<div class="articles-slider-arrow articles-slider-arrow-right icon-slider-arrow-right"></div>',
        nextArrow: '<div class="articles-slider-arrow articles-slider-arrow-left icon-slider-arrow-left"></div>'        
      });

      var slideHeight = $('.js-posts-widget-slider .slick-track').height();
      $('.js-posts-widget-slider .slick-slide').css('height', slideHeight - 20 + 'px');
    }
  },
  articleSingleSlideshow: function () {
    if ( $('.media.rslides').length ) {
      $('.media.rslides').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        rtl: false
      });
    }
  },
  moveArticleSections: function() {
    if ( rgb.isMobile() && $('.article-media').length ) {
      $('.article-media').appendTo('.main-content');
    }
  },
  anchorLink : function() {
    var fullUrl = rgb.IS.fullUrl;
    var headerHeight = $('.header').outerHeight(true);
    if (fullUrl.indexOf('#')!== -1) {
      $(window).scrollTop($(window).scrollTop()-headerHeight)
      // section = fullUrl.substr(fullUrl.indexOf('#'), fullUrl.length); 
    }
    $(document).on('click', '.text-content :not(.button) > a[href^="#"]', function(){
      // $(window).scrollTop($(window).scrollTop()-headerHeight)
      var href = $(this).attr('href');
      var closest = $(this).closest('.text-content');
      var link = closest.find(href);
      if(link.length > 0){
        $('html, body').animate({
            scrollTop: link.offset().top - headerHeight
        }, 200);
      }
    })
  },
  mobileTagFilters : function() {
    $('.js-mobile-filter-open').prependTo('.filters-selected-list');

    $('.js-mobile-filter-open').click(function() {
      $('body').css('overflow', 'hidden');
      $('aside.filters').fadeIn();
    });

    $('.js-mobile-filter-close, .js-mobile-filter-submit').click(function(){
      $('body').css('overflow', 'unset');
      $('aside.filters').fadeOut();
    });

    $('.js-mobile-filter-reset').click(function() {
      $('body').css('overflow', 'unset');
      $('.js-remove-filters').trigger('click');
      $('aside.filters').fadeOut();
    });
  },

  rgbIsEditor : function() {
    $.ajax({
      method: "POST",
      url: "/wp-admin/admin-ajax.php",
      data: { action: 'is_user_logged_in' },
    }).done(function( udata ) {
        if (udata == 'no') {
            $('.editlink').remove();
        }
        else{
          udata = JSON.parse(udata);
          if (udata.is_editor=='yes') {
            if ($('.editlink').length > 0) {
              $('.editlink').removeClass('hid');
            }
          }
        }
    });
  },

  //Tags
  rgbFilters: function () {
    // Remove All Filters
    $(document).on('click', '.js-remove-filters', function() {
      var $loadMoreButton = $('.js-load-more');
      var loadingType = 'removeFilter';

      $loadMoreButton.data('page', '1');
      $loadMoreButton.data('tag_ids', '');
      $loadMoreButton.data('year', '');
      $loadMoreButton.data('publication_ids', '');

      $('.filters-selected').hide();
      $('.filter-selected-item').remove();
      $('.filters-list li').removeClass('active');
      rgb.rgbAjaxArticlesOrdering($loadMoreButton, loadingType, '');
    });

    // Remove Filter
    $(document).on('click', '.filter-selected-item', function() {
      var $this = $(this);
      var $loadMoreButton = $('.js-load-more');
      var loadingType = 'removeFilter';
      var filterType = $this.data('filter_type');
      var itemId = $this.data('id');
      var dataAttrName = '';

      switch(filterType) {
        case 'tags':
          dataAttrName = 'term_id';
          break;
        case 'year':
          dataAttrName = 'year';
          break;
        case 'publication_type':
          dataAttrName = 'publication_id';
          break;
      }

      if ( filterType == 'tags' || filterType == 'publication_type' ) {
        $('.filter-item[data-filter-type="' + filterType + '"]').find('a[data-' + dataAttrName + '=' + itemId + ']').parents('li').toggleClass('active');
      } else if ( filterType == 'year' ) {
        $loadMoreButton.data('year', '');
        $('.filter-item[data-filter-type="' + filterType + '"]').find('.custom-select-title').text('שנה');
      }

      rgb.rgbAjaxArticlesOrdering($this, loadingType, filterType);
      $this.remove();

      if ( $('.filter-selected-item').length == 0 ) {
        $('.filters-selected').hide();
      }
    });

    // Load More & Filtering Tags
    $('.js-load-more, .filter-item a').click(function(e) {
      e.preventDefault();

      var $this = $(this);
      var loadingType = $this.parents('.filter-item').length ? 'isFiltering' : 'loadMore';        
      var filterType = $this.parents('.filter-item').data('filter-type');
      rgb.rgbAjaxArticlesOrdering($this, loadingType, filterType);
    });
  },

  rgbAjaxArticlesOrdering: function ($this, loadingType, filterType) {
    var $loadMoreButton = $('.js-load-more');
    var $ajaxLoaderFilters = $('.js-ajax-loader-filters');
    var page = $loadMoreButton.data('page');
    var tagId = $loadMoreButton.data('tag_id');
    var tagIds = [$loadMoreButton.data('tag_ids')];
    var year = $loadMoreButton.data('year');
    var publicationIds = [$loadMoreButton.data('publication_ids')];

    if ( loadingType == 'isFiltering' || loadingType == 'removeFilter' ) {
      var $filtersSelected = $('.filters-selected');
      var $filtersSelectedList = $('.filters-selected-list');          
      var filtersList = $('.filter-item[data-filter-type="'+ filterType +'"]').find('.filters-list li');
      var currentItemId = '';          

      if ( filterType == 'tags' ) {
        currentItemId = $this.data('term_id');
        tagIds = [tagId];
        if ( $this.parents('li').hasClass('active') ) return;
        $this.parents('li').toggleClass('active');

        filtersList.each(function(index, item) {
          var $item = $(item).find('a');
          var itemId = $item.data('term_id');

          if ( $(item).hasClass('active') ) {
            tagIds.push(itemId);
          }
        });
      } else if ( filterType == 'year' ) {
        currentItemId = $this.data('year');
        year = currentItemId;
      } else if ( filterType == 'publication_type' ) {
        currentItemId = $this.data('publication_id');
        publicationIds = [];
        if ( $this.parents('li').hasClass('active') ) return;
        $this.parents('li').toggleClass('active');
        
        filtersList.each(function(index, item) {
          var $item = $(item).find('a');
          var itemId = $item.data('publication_id');

          if ( $(item).hasClass('active') ) {
            publicationIds.push(itemId);
          }
        });
      }

      if ( loadingType == 'isFiltering' ) {
        $filtersSelected.show();
        $filtersSelectedList.append('<div class="filter-selected-item" data-filter_type="' + filterType + '" data-id="'+ currentItemId +'">' + $this.text() + '</div>');
      }
    }

    var data = {
      'loading_type': loadingType,
      'page': page,
      'tag_id': tagId,
      'tag_ids': tagIds.join(','),
      'year': year,
      'publication_ids': publicationIds.join(',')
    };

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/wp-content/themes/rgb/ajax/ordering_load_content.php',
      data: data,
      beforeSend: function() {
        if ( loadingType == 'isFiltering' || loadingType == 'removeFilter' ) {
          $loadMoreButton.parents('.btn-load-more').hide();
          $('.articles-list').html('');
          $ajaxLoaderFilters.fadeIn();
        } else {
          $loadMoreButton.addClass('ajax-loader');
        }
      }
    }).done(function(result) {
      if ( result ) {
        if ( loadingType == 'isFiltering' || loadingType == 'removeFilter' ) {
          $ajaxLoaderFilters.hide();
          $('.articles-list').html(result.content);
        } else {
          $loadMoreButton.removeClass('ajax-loader');
          $('.articles-list').append(result.content);
        }

        var queryParams = result.query_params;
        for (var prop in queryParams) {
          $loadMoreButton.data(prop, queryParams[prop]);
        }

        if ($loadMoreButton.data('page') >= $loadMoreButton.data('max_pages')) {
          $loadMoreButton.parents('.btn-load-more').hide();
        } else {
          $loadMoreButton.parents('.btn-load-more').show();
        }

        $('.js-mobile-filter-submit span').text('(' + result.query_params.total_posts_count + ')');
        $('.js-mobile-filter-submit span').show();
      }
    });
  },

  // infinite scroll
  IS : {
    // params for program menu after article in scroll
    fullUrl : location.href,
    baseUrl : location.href,
    // start page params
    startPageTitleFull : document.title,
    startPageImageUrl : function () {
      return $('meta[property="og:image"],meta[name="twitter:image"]').attr('content')
    },
    startPageImageWidth : function () {
      return $('meta[property="og:image:width"]').attr('content')
    },
    startPageImageHeight : function () {
      return $('meta[property="og:image:height"]').attr('content')
    },
    startPageTitle : function () {
      return $('meta[property="og:title"],meta[name="twitter:title"]').attr('content')
    },
    startPageType : function () {
      return $('meta[property="og:type"]').attr('content')
    },
    startPageUrlHttp : function () {
      return $('meta[property="og:url"]').attr('content')
    },
    startPageUrl : function () {
      return $('meta[property="og:url"]').attr('content')
    },
    startPageDescription : function () {
      return $('meta[name="description"]').attr('content')
    },
    firstArtcleId : function () {
      return $('.infinite-scrolling main.container:first-child .is-article').data('article_id')
    },
    init: function(){
      if ( rgb.isSingle() ) {
        rgb.IS.singleInfiniteScroll();
      }
    },
    singleInfiniteScroll: function () {
      var nextArtcleId = $('.infinite-scrolling .is-article').data('next_article_id');
      var currentArticleId = $('.infinite-scrolling .is-article').data('article_id');
      var firstArtcleId = rgb.IS.firstArtcleId();
      var scrollOffsetTop = 1;
      var callAjaxStopper = false;
      var doChangesStopper = false;
      var stratToChangeMetas = false;
      var articleIdLoad = 0;
      var oldArticleId = 0;
      var salaIndexItem = 0;
      var excludePosts = [firstArtcleId];

      // start scroll
      if (nextArtcleId && nextArtcleId != currentArticleId) {
        $(window).scroll(function () {
          var scrollTop = $(window).scrollTop();
          // get the next article params
          if ($('#article_' + nextArtcleId).length && $('#article_' + nextArtcleId).data('next_article_id')) {
            scrollOffsetTop = $('#article_' + nextArtcleId).offset().top - $(window).height();
            // have to be come after scrollOffsetTop
            nextArtcleId = $('#article_' + nextArtcleId).data('next_article_id');
          }
          // get the next article ajax
          if (nextArtcleId && scrollOffsetTop && nextArtcleId != articleIdLoad ) {
            if (scrollTop >= scrollOffsetTop) {
              if (callAjaxStopper == false) {
                salaIndexItem++;
                callAjaxStopper = true;                
                $.ajax({
                  method: "GET",
                  url: "/wp-content/themes/rgb/ajax/single_load_content.php",
                  data: { 
                    action: 'single_load_content',
                    sala_index_item: salaIndexItem,
                    post_id: nextArtcleId,
                    first_post_id: firstArtcleId,
                    exclude_posts : excludePosts,
                    // prev_event_date : eventCurrentDate,
                    // next_event_date : eventNextPostDate,
                    is_mobile: rgb.isMobile()
                  },
                  dataType: "html",
                }).done(function (html) {
                  callAjaxStopper = false;
                  $('.infinite-scrolling').append(html);
                  var currentArticleIdLoad = 'article_' + nextArtcleId;
                  articleIdLoad = $('#' + currentArticleIdLoad).data('article_id');
                  // eventDateLoad = eventCurrentDate;
                  excludePosts.push(nextArtcleId);
                  // load slider
                  if ($('#' + currentArticleIdLoad + ' .rslides').length) {
                    rgb.rgbRslider();
                  }

                  // if ($('#' + currentArticleIdLoad).hasClass('needs_review')) {
                  //   $('.error-popup').show();
                  // }

                  // load siema slider
                  //rgb.relatedItems(nextArtcleId);
                  //rgb.rgbHowToCite();
                  //rgb.rgbCopyLinkOnclick();
                  //rgb.moveItemsIntoArticle(nextArtcleId);
                  rgb.rgbIsEditor();
                
                  // Facebook reload
                  try {
                    FB.XFBML.parse(document.getElementById(currentArticleIdLoad));
                  } catch (ex) { }
                  // Twitter reload
                  if ($('#' + currentArticleIdLoad + ' .twitter-tweet').length) {
                    $('#' + currentArticleIdLoad + ' .twitter-tweet').each(function () {
                      twttr.widgets.load($(this)[0]);
                    });
                  }
                });
              }
            }
          }

          // get and set current article scroll meta
          var articles = $('.infinite-scrolling .is-article');
          var array = [];
          $('.infinite-scrolling .is-article').each(function (x, v) {
            if ($(this).offset().top <= scrollTop) {
              array.push(x);
            } else {
              array.splice(x, 1);
            }
          });
          // set when to start change metas
          if (array.length > 1) {
            stratToChangeMetas = true;
          }
          // set article metas (all data after new article loaded)
          if (array.length > 0 && stratToChangeMetas == true) {
            var currentArticleId = $(articles[array.length - 1]).attr('id');
            if (oldArticleId != 0 && oldArticleId != currentArticleId) {
              if (doChangesStopper) {
                doChangesStopper = false;
              }
            }
            if ($('#' + currentArticleId).length && $('#' + currentArticleId).offset().top <= scrollTop) {
              if (!doChangesStopper) {
                rgb.IS.rgbChangeArticleMetas(currentArticleId);
                rgb.IS.rgbReplaceState(currentArticleId);
                rgb.IS.rgbGaTrack(currentArticleId);
                // set old article id meta
                oldArticleId = currentArticleId;
                doChangesStopper = true;
              }
            }
          }
        });
      }
    },
    rgbChangeArticleMetas: function (isId) {
      if (isId && isId != 'start-page') {
        // get metas
        var isTitleFull = $('#' + isId).data('article_title_full');
        var isTitle = $('#' + isId).data('article_title');
        var isUrlHttp = $('#' + isId).data('article_url_http');
        var isUrl = $('#' + isId).data('article_url');
        var isDescription = $('#' + isId).data('article_description');
        var isImageUrl = $('#' + isId).data('image_url');
        var isImageWidth = $('#' + isId).data('image_width');
        var isImageHeight = $('#' + isId).data('image_height');
        var isType = $('#' + isId).data('is_type');
        // change metas
        document.title = isTitleFull.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        $('meta[property="og:image"],meta[name="twitter:image"]').attr('content', isImageUrl);
        $('meta[property="og:image:width"]').attr('content', isImageWidth);
        $('meta[property="og:image:height"]').attr('content', isImageHeight);
        $('meta[property="og:title"],meta[name="twitter:title"]').attr('content', isTitle);
        $('meta[property="og:type"]').attr('content', isType);
        $('meta[property="og:url"]').attr('content', isUrlHttp);
        $('link[rel="canonical"]').attr('href', isUrl);
        $('meta[property="og:description"],meta[name="twitter:description"],meta[name="description"]').attr('content', isDescription);
      }

      if (isId == 'start-page') {
        document.title = rgb.IS.startPageTitleFull;
        $('meta[property="og:image"],meta[name="twitter:image"]').attr('content', rgb.IS.startPageImageUrl());
        $('meta[property="og:image:width"]').attr('content', rgb.IS.startPageImageWidth());
        $('meta[property="og:image:height"]').attr('content', rgb.IS.startPageImageHeight());
        $('meta[property="og:title"],meta[name="twitter:title"]').attr('content', rgb.IS.startPageTitle());
        $('meta[property="og:type"]').attr('content', rgb.IS.startPageType());
        $('meta[property="og:url"]').attr('content', rgb.IS.startPageUrlHttp());
        $('link[rel="canonical"]').attr('href', rgb.IS.startPageUrl());
        $('meta[property="og:description"],meta[name="twitter:description"],meta[name="description"]').attr('content', rgb.IS.startPageDescription());
      }
    },
    rgbReplaceState: function (isId) {
      // change state
      if (isId && isId != 'start-page') {
        var isHistoryId = $('#' + isId).data('article_id');
        var isTitle = $('#' + isId).data('article_title');
        var isUrl = $('#' + isId).data('article_url');
        var stateObjType = $('#' + isId).data('article_type');
        var stateObj = { stateObjType: isHistoryId };
        rgb.IS.rgbReplaceStateAction(stateObj, isTitle, isUrl);
      }
      if (isId == 'start-page') {
        var startPageHistoryId = $('.infinite-scroll').data('ordering_id');
        var startPageType = $('.infinite-scroll').data('ordering_type');
        var stateObj = { pageType: startPageHistoryId };
        rgb.IS.rgbReplaceStateAction(stateObj, rgb.IS.startPageTitle(), rgb.IS.startPageUrl());
      }
    },
    rgbReplaceStateAction: function (stateObj, title, url) {
      history.replaceState(stateObj, title, url);
    },
    rgbGaTrack: function (articleId) { // Function to track a virtual page view
      var url = '';
      var title = '';
      if (articleId == 'start-page') {
        url = rgb.IS.startPageUrl();
        title = rgb.IS.startPageTitleFull;
      } else {
        url = $('#' + articleId).data('article_url');
        title = $('#' + articleId).data('article_title');
      }
      var path = url.replace(document.location.origin, '');
      if (typeof ga !== 'undefined') {
        ga('set', { page: path, title: title });
        ga('send', 'pageview');
      }
    }
  }
};
jQuery(document).ready(rgb.init);