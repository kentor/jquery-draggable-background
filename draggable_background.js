/**
 * Draggable Background plugin for jQuery
 *
 * v1.1.0
 *
 * Copyright (c) 2012 Kenneth Chung
 *
 * Licensed under the MIT license:
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

  // Adds clientX and clientY properties to the jQuery's event object from touch
  var modifyEventForTouch = function(e) {
    e.clientX = e.originalEvent.touches[0].clientX
    e.clientY = e.originalEvent.touches[0].clientY
  }

  $.fn.backgroundDraggable = function(options) {
    var options = $.extend({}, $.fn.backgroundDraggable.defaults, options)

    return this.each(function() {
      var $this = $(this)
        , $bg = $this.css('background-image')
        , src = $bg.match(/^url\(['"]?(.*?)['"]?\)$/i)

      // If no background-image css property or no src just return
      if (!$bg || !src) return

      // Get the image's width and height if bound
      var img = { width: 0, height: 0 }
      if (options.bound) {
        var i = new Image
        i.onload = function() {
          img.width = i.width
          img.height = i.height
        }
        i.src = src[1]
      }

      $this.on('mousedown.dbg touchstart.dbg', function(e) {
        e.preventDefault()

        if (e.originalEvent.touches) {
          modifyEventForTouch(e)
        }
        else if (e.which !== 1) {
          return
        }

        var x0 = e.clientX
          , y0 = e.clientY
          , pos = $this.css('background-position').match(/(-?\d+).*?\s(-?\d+)/) || []
          , xPos = parseInt(pos[1]) || 0
          , yPos = parseInt(pos[2]) || 0

        $window.on('mousemove.dbg touchmove.dbg', function(e) {
          e.preventDefault()

          if (e.originalEvent.touches) {
            modifyEventForTouch(e)
          }

          var x = e.clientX
            , y = e.clientY

          xPos = options.axis === 'y' ? xPos : limit($this.innerWidth()-img.width, 0, xPos+x-x0, options.bound)
          yPos = options.axis === 'x' ? yPos : limit($this.innerHeight()-img.height, 0, yPos+y-y0, options.bound)
          x0 = x
          y0 = y

          $this.css('background-position', xPos + 'px ' + yPos + 'px')
        })
      })

      $window.on('mouseup.dbg touchend.dbg', function() { $window.off('mousemove.dbg touchmove.dbg') })
    })
  }

  $.fn.backgroundDraggable.defaults = {
    bound: true
  , axis: undefined
  }
}(jQuery);
