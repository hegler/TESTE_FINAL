/**
 * Load and config List plugin on messages page
 */
(function($, List) {
    "use strict";

    function loadList() {
        // set field to filter
        var options = {
            valueNames: [ 'media-heading', 'media-content' ]
        };

        // create a new instance of component
        return new List('content', options);
    }
    
    // load List plugin
    var list = loadList();

    // remove message using List plugin
    $('.btn-remove').click(function(e) {
        e.preventDefault();

        $('.list input:checked').each(function() {
            list.remove('media-heading', $(this).parent().find('.media-heading').html());
        });
    });
})(jQuery, List);
