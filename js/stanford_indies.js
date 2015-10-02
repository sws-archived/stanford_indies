(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.stanford_indies = {
    attach: function (context, settings) {
      
      $('.isotope-element')
      .addClass('tile-closed')
      .css({
        'box-sizing' : 'border-box',
        'margin'     : '0',
        //'padding'    : '10px',
        //'box-shadow' : '0 0 0 10px #fff inset',
      });
      
      var mosaic = $('#isotope-container');
      
      if (mosaic.length) {
  
        var smartphone = 340,
            tablito = 480,
            tablet = 700,
            desktop = 980,
            mosaicColBreak = tablito,
            mosaicHeight = mosaic.height(),
            mosaicColumnsNew = ($(window).width() > mosaicColBreak) ? 3 : 2,
            colWidth = (Math.ceil(mosaic.parent().width() / mosaicColumnsNew)),
            newWidth = (colWidth * mosaicColumnsNew),
            expandedCols = 2,
            resizeTimer = '';
  
        mosaic.css('width', newWidth + 'px');
        
        mosaic.isotope.layoutComplete = onLayout();
        
        var map = {};
        // Process tiles.
        $('.isotope-element').each( function() {
          var tile = $(this);
          // Find duplicate tiles.
          var id = tile.attr('data-id');    
          if (map[id] == null){
            map[id] = true;
          } else {
            $(this).remove();
          }

          // Set tile width.
          tile
          .css({
            width:  100 / mosaicColumnsNew + '%',
            //height: 340 + 'px',
          });
          var content = $(this).find('.tile-content');
          // Add our tile expander link.
          content.append('<div class="tile-expander tile-more">Learn more</div>');
          //move site element to end of container
          var site = $('.views-field-field-s-ilci-site-1', $(this));
          site.appendTo(content);
          //add a close to the area of focus so we can hid it when tile is closed
          tile.find('strong').parent().addClass('area-focus');
        });
        
        // Handle tile clicks.
        $('.tile-expander').click( function() {
          var tile = $(this).closest('.isotope-element');
  
          // Prevent additional clicks until tile resizing is complete.
          if (!$('.processing').length) {
            tile.addClass('processing');
  
            if (tile.hasClass('tile-closed')) {
              $('.tile-open').each( function() {
                tileContract($(this), mosaic);
              });
  
              tileExpand(tile, mosaic);
            }
            else if (tile.hasClass('tile-open')) {
              tileContract(tile, mosaic);
            }
  
            // There are no open tiles.
            if (!$('.tile-open').length) {
              mosaic.removeClass('has-open-tile');
              $('.isotope-element').css( {opacity: '1'} );
            }
          }
  
          // Reset mosaic height.
          //mosaic.height(mosaicHeight);
        });      
        
      }
      
      $(window).resize( function() {
        if (mosaic.length) {
          $('.tile-expander').css('display', 'block');
          var windowSize = mosaic.parent().width();
          //var windowSize = window.innerWidth;
          var mosaicColumnsNew = 3;
          switch (true) {
            case windowSize > 480 && windowSize <= 767:
              mosaicColumnsNew = 2;
              break;
            case windowSize <= 480:
              mosaicColumnsNew = 1;
              //$('.tile-expander').css('display', 'none');
              break;
            default:
              mosaicColumnsNew = 3;
          }
          var colWidth = (Math.ceil(windowSize / mosaicColumnsNew));
          var newSize = (colWidth * mosaicColumnsNew);
          mosaic.css('width', newSize + 'px');
          var tile = $('.isotope-element');
          tile.css('width', colWidth + 'px');
        }
      });

      // Handle tile expansion.
      function tileExpand(tile, mosaic, transition) {
        mosaicParent = mosaic.parent().width();
        singlecolumn = mosaicParent <= 480 ? true : false;
        if (!singlecolumn) {

        transition = typeof transition !== 'undefined' ? transition : 300;
  
        var tileWidth = Math.floor(tile.outerWidth()),
            tilePosition = tile.position(),
            tileLeft = Math.floor(tilePosition.left),
            tileTop = Math.floor(tilePosition.top);
  
        $('.tile-open').removeClass('tile-open').addClass('tile-closed');
        mosaic.addClass('has-open-tile');
  
        $('.tile-closed:not(.processing)')
        .css({
          opacity: '.4'
        });
  
        tile
        .removeClass('tile-closed')
        .addClass('tile-open')
        .width(tileWidth)
        .animate({
          width: tileWidth * expandedCols + 'px',
          opacity: '1'
        }, transition, function() {
          var tileBottom = tile.outerHeight() + tileTop;
  
          // Adjust mosaic height to accommodate expanded tile.
          if (tileBottom > mosaic.height()) {
            mosaic.height(tileBottom);
          }
  
          tile.removeClass('processing');
        });
  
        if (tile.hasClass('expand-left') && expandedCols > 1) {
          var translateX = tileLeft - (tileWidth * (expandedCols - 1)) + 'px';
          var translateY = tileTop + 'px';
  
          tile
          .css ({
            webkitTransform: 'translate(' + translateX + ',' + translateY +')',
            // IE9 behaves differently, we need to make a negative adjustment.
            msTransform: 'translate(-' + (tileWidth * (expandedCols - 1)) + 'px,0px)',
            transform: 'translate(' + translateX + ',' + translateY +')'
          });
        }
  
        tile.find('.tile-expander').removeClass('tile-more').addClass('tile-less').html('Show less');
        }
      }
        
      // Handle tile contraction.
      function tileContract(tile, mosaic, transition) {
        transition = typeof transition !== 'undefined' ? transition : 500;
  
        var tileWidth = Math.floor(tile.outerWidth()),
            tilePosition = tile.position(),
            tileLeft = Math.floor(tilePosition.left),
            tileTop = Math.floor(tilePosition.top);
  
        tile
        .removeClass('tile-open')
        .addClass('tile-closed')
        .animate({
          'width': 100 / mosaicColumnsNew + '%'
        }, transition, function() {
          tile.removeClass('processing');
        });
  
        // Left expanding tiles.
        if (tile.hasClass('expand-left') && expandedCols > 1) {
          var translateX = tileLeft + (tileWidth / expandedCols) + 'px';
          var translateY = tileTop + 'px';
  
          tile.css({
            webkitTransform: 'translate(' + translateX + ',' + translateY +')',
            // IE9: Don't try anything fancy, just remove the transform.
            msTransform: '',
            transform: 'translate(' + translateX + ',' + translateY +')'
          });
        }
  
        tile.find('.tile-expander').removeClass('tile-less').addClass('tile-more').html('Learn more');
      }
      
      $('.isotope-filters li a').click(function() {
        var openTile = $('.tile-open');
        console.log(openTile);
        openTile.find('.tile-less', $(this)).click();
        setTimeout( function() {
          onLayout();
         }, 500);
      });
      
      // Isotope layoutComplete callback.
      function onLayout() {
        // Allow a little time for things to settle down.
        setTimeout( function() {
          // Reset the mosaic height.
          //mosaicHeight = mosaic.height();
  
          // Reset expand directions.
          tileExpandDirection(mosaic);
  
          // Reopen previously open tile.
          var reopenTile = $('.isotope-element.tile-reopen');
  
          if (reopenTile.length) {
            tileExpand(reopenTile, mosaic);
            reopenTile.removeClass('no-transition tile-reopen');
          }
        }, 500);
        if ($('#isotope-container').hasClass('isotope')) {
          mosaic.isotope('shuffle');
        }      
      }
  
      // Sets classes on tiles to determine whether they expand to the right or
      // to the left.
      function tileExpandDirection(mosaic) {
        mosaicWidth = Math.ceil(mosaic.width());
  
        mosaic.find('.isotope-element').each( function() {
          var tile = $(this),
              tileWidth = Math.floor(tile.width()),
              expandedWidth = tileWidth * 2,
              tilePosition = tile.position(),
              tileLeft = Math.floor(tilePosition.left);
  
          tile.addClass('expand-right').removeClass('expand-left');
  
          if ((tileLeft + expandedWidth) > mosaicWidth) {
            tile.addClass('expand-left').removeClass('expand-right');
          }
        });
      }
    }
  };
}(jQuery));
