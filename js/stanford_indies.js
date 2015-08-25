(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.stanford_indies = {
    attach: function (context, settings) {
      
      var mosaic = $('#isotope-container');
      var usedIds = [];
      var hasDuplicates = false;
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
        
        // Add our tile expander link.
        tile.find('.views-field-title').append('<div class="tile-expander tile-more">Learn more</div>');
       
      });
      
    }
  };
}(jQuery));