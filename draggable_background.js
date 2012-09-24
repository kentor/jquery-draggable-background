/**
 * Draggable Background plugin for jQuery
 *
 * v1.0.0
 *
 * Copyright (c) 2012 Kenneth Chung
 *
 * Licensed under the MIT licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 */

!function($) {

  var $window = $(window)

  // Helper function to guarantee a value between low and hi unless bool is false
  var limit = function(low, hi, value, bool) {
    if (arguments.length === 3 || bool) {
      if (value < low) return low
      if (value > hi) return hi
    }
    return value
  }

  $.fn.backgroundDraggable = function(options) {
    var options = $.extend({
      bounded: true
    , axis: false
    }, options)

    return this.each(function() {
      var $this = $(this)
        , $bg = $this.css('background-image')

      // If no background-image css property just return
      if (!$bg) return

      // Get the image's width and height if bounded
      var img = { width: 0, height: 0 }
      if (options.bounded) {
        var i = new Image
        i.onload = function() {
          img.width = i.width
          img.height = i.height
        }
        i.src = $bg.match(/^url\((.*?)\)$/i)[1]
      }

      $this.on('mousedown.dbg', function(e) {
        if (e.which !== 1) return

        var x0 = e.pageX
          , y0 = e.pageY
          , pos = $this.css('background-position').match(/(-?\d+).*?\s(-?\d+)/) || []
          , xPos = parseInt(pos[1]) || 0
          , yPos = parseInt(pos[2]) || 0

        $window.on('mousemove.dbg', function(e) {
          var x = e.pageX
            , y = e.pageY

          xPos = options.axis === 'y' ? xPos : limit($this.width()-img.width, 0, xPos+x-x0, options.bounded)
          yPos = options.axis === 'x' ? yPos : limit($this.height()-img.height, 0, yPos+y-y0, options.bounded)

          $this.css('background-position', xPos + 'px ' + yPos + 'px')

          x0 = x
          y0 = y

          e.preventDefault()
        })

        e.preventDefault()
      })

      $window.on('mouseup.dbg', function() { $window.off('mousemove.dbg') })
    })
  }
}(jQuery);
