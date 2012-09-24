/**
 * Draggable Background plugin for jQuery
 *
 * v1.0.0
 *
 * Copyright (c) 2012 Kenneth Chung
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

!function($) {
  // Helper function to guarantee a value between low and hi
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

    var regexp = /(-?\d+).*?\s(-?\d+)/

    return this.each(function() {
      var $this = $(this)

      // If no background-image css property just return
      if (!$this.css('background-image')) return

      // Get the src of the background-image
      var src = $this.css('background-image').replace(/url\(|\)$/ig, "")

      // Get the image's width and height if bounded
      var img = { width: 0, height: 0 }
      if (options.bounded) {
        var i = new Image
        i.onload = function() {
          img.width = i.width
          img.height = i.height
        }
        i.src = src
      }

      $this
        .on('mousedown.dbg', function(e) {
          if (e.which !== 1) return

          var x0 = e.pageX
            , y0 = e.pageY

          $this.on('mousemove.dbg', function(e) {
            var x = e.pageX
              , y = e.pageY
              , pos = $this.css('background-position').match(regexp) || []
              , xPos = parseInt(pos[1]) || 0
              , yPos = parseInt(pos[2]) || 0
              , xOffset = limit($this.width() - img.width, 0, xPos + x - x0, options.bounded)
              , yOffset = limit($this.height() - img.height, 0, yPos + y - y0, options.bounded)

            if (options.axis === 'x')
              $this.css('background-position', xOffset + 'px ' + yPos + 'px')
            else if (options.axis === 'y')
              $this.css('background-position', xPos + 'px ' + yOffset + 'px')
            else
              $this.css('background-position', xOffset + 'px ' + yOffset + 'px')

            x0 = x
            y0 = y
          })
        })
        .on('mouseup.dbg mouseleave.dbg', function() {
          $this.off('mousemove.dbg')
        })
    })
  }
}(jQuery);
