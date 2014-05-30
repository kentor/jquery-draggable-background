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
!function($, window, undefined) {
  var $window = $(window);

  // Helper function to guarantee a value between low and hi unless bool is false
  var limit = function(low, hi, value, bool) {
    if (arguments.length === 3 || bool) {
      if (value < low) return low;
      if (value > hi) return hi;
    }
    return value;
  }

  // Adds clientX and clientY properties to the jQuery's event object from touch
  var modifyEventForTouch = function(e) {
    e.clientX = e.originalEvent.touches[0].clientX;
    e.clientY = e.originalEvent.touches[0].clientY;
  }

  var needsHorizontalScale = function(vp_dims, img_dims) {
    var vp_ar  = vp_dims[0]  / vp_dims[1];
    var img_ar = img_dims[0] / img_dims[1];

    return (img_ar <= vp_ar);
  };

  var imageScaledDimensions = function(vp_dims, img_dims) {
    var scale = 1;

    if(needsHorizontalScale(vp_dims, img_dims)) {
      scale = vp_dims[0]/img_dims[0];
    }
    else {
      scale = vp_dims[1]/img_dims[1];
    }

    return [img_dims[0]*scale, img_dims[1]*scale];
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = options;
    this.initialize();
  }

  Plugin.prototype = {
    initialize: function() {
      var $el = $(this.element),
      $bg = $el.css('background-image'),
      src = $bg.match(/^url\(['"]?(.*?)['"]?\)$/i);

      // If no background-image css property or no src just return
      if (!$bg || !src) return;

      // Get the image's width and height if bound
      this.img = { width: 0, height: 0 };

      if (this.options.bound) {
        var i = new Image, that = this;

        i.onload = function() {
          if($el.css("background-size") == "cover") {
            var vp_dims = [$el.innerWidth(), $el.innerHeight()];
            var scaled_dims = imageScaledDimensions(vp_dims, [i.width, i.height]);
            that.img.width  = scaled_dims[0];
            that.img.height = scaled_dims[1];
          }
          else {
            that.img.width  = i.width;
            that.img.height = i.height;
          }

          $el.addClass("draggable");
        }

        i.src = src[1];
      }

      this.bindMouseDown();
      this.bindMouseUp();
    },
    bindMouseDown: function() {
      var $el = $(this.element), that = this;

      $el.on('mousedown.dbg touchstart.dbg', function(e) {
        e.preventDefault();

        if (e.originalEvent.touches) {
          modifyEventForTouch(e);
        }
        else if (e.which !== 1) {
          return
        }

        var x0 = e.clientX,
          y0 = e.clientY,
          pos = $el.css('background-position').match(/(-?\d+).*?\s(-?\d+)/) || [],
          xPos = parseInt(pos[1]) || 0,
          yPos = parseInt(pos[2]) || 0;

        $window.on('mousemove.dbg touchmove.dbg', function(e) {
          e.preventDefault();

          if (e.originalEvent.touches) {
            modifyEventForTouch(e);
          }

          var x = e.clientX, y = e.clientY;

          xPos = that.options.axis === 'y' ? xPos : limit($el.innerWidth() - that.img.width, 0, xPos+x-x0, that.options.bound);
          yPos = that.options.axis === 'x' ? yPos : limit($el.innerHeight() - that.img.height, 0, yPos+y-y0, that.options.bound);
          x0 = x;
          y0 = y;

          $el.css('background-position', xPos + 'px ' + yPos + 'px');
        });
      });
    },
    bindMouseUp: function() {
      $window.on('mouseup.dbg touchend.dbg', function() { $window.off('mousemove.dbg touchmove.dbg') });
    },
    disable: function() {
      var $el = $(this.element);
      $el.off('mousedown.dbg touchstart.dbg');
      $el.removeClass("draggable");
    }
  };

  $.fn.backgroundDraggable = function(options) {
    var options = options;

    return this.each(function() {
      if((typeof options == "undefined") || (typeof options == "object")) {
        options = $.extend({}, $.fn.backgroundDraggable.defaults, options);
        var p = new Plugin(this, options);
        $(this).data("draggable-background", p);
      }
      else if ((typeof options == "string") && $(this).data("draggable-background")) {
        var p = $(this).data("draggable-background");
        Plugin.prototype[options].apply(p);
      }
    });
  };

  $.fn.backgroundDraggable.defaults = {
    bound: true
  , axis: undefined
  };
}(jQuery, window);
