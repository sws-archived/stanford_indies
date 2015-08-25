(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.stanford_indies = {
    attach: function (context, settings) {
      
      var usedIds = [];
      var hasDuplicates = false;

      // Process tiles.
      $('.isotope-element').each( function() {
        var tile = $(this);

        // Find duplicate tiles.
        var id = tile.find('.tile-content').attr('data-id');

        if (usedIds[id] !== undefined) {
          tile.addClass('duplicate');
          hasDuplicates = true;
        }
        else {
          usedIds[id] = 1;
        }

        // Set tile width.
        //tile.css({
        //  width: 100 / mosaicColumnsNew + '%'
        //});

        // Add our tile expander link.
        tile.find('.views-field-title').append('<div class="tile-expander tile-more">Learn more</div>');
      });
    }
  };
}(jQuery));