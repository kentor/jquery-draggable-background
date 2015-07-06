# Draggable Background

A jQuery plugin to make background images draggable.

**NOTE:** I don't plan to maintain this library anymore since I've moved on
from jQuery. There seems to be requests for supporting different options
for background-size or different units for background-position. After looking
at the css spec for these properties, it seems unmaintainable to support every
possible configuration, so I would encourage you to fork this and shape it to
your specific needs.

## Configuration
<table>
  <tr>
    <th>Option</th>
    <th>Type</th>
    <th>Known Values</th>
    <th>Default Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>bound</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>true</td>
    <td>Whether dragging is bounded by the edges of the image.</td>
  </tr>
  <tr>
    <td>axis</td>
    <td>String</td>
    <td>x|y</td>
    <td></td>
    <td>If specified, restrict dragging along x or y axis.</td>
  </tr>
  <tr>
    <td>done</td>
    <td>Function</td>
    <td></td>
    <td></td>
    <td>Called when dragging is stopped by mouseup, touchup, or mouseleave.</td>
  </tr>
</table>

## Usage
```js
// default options
$('div').backgroundDraggable();

// only draggable in the x direction, and dragging is not bounded by the image
$('div').backgroundDraggable({ bound: false, axis: 'x' });

// disable draggable background
$('div').backgroundDraggable('disable');

// callback when drag complete
$('div').backgroundDraggable({
  done: function() {
    backgroundPosition = $('div').css('background-position');
    console.log(backgroundPosition);
  }
});
```

## Demo
http://kentor.github.com/jquery-draggable-background/

## Support
IE9+. Only `background-size` value of `auto` (default) and `cover` are supported. `background-position` must be absolute pixels. There will be bugs if you use `center` for percentages.

## Changelog

v1.2.3 [2014-10-17]
- Fixed child elements of element with background dragging calling `preventDefault` (7f17318).
- Improved behavior of dragging, especially when mouse up happens outside the window (d1fdbe4).

v1.2.2 [2014-09-01]
- Added support for a callback when dragging is finished.

v1.2.1 [2014-08-01]
- Added support for disabling plugin

v1.2 [2014-06-06]
- Refactored code to use semicolons.
- Support for `background-size: cover`.

v1.1 [2013-05-19]
- Touch support.

v1.0 [2012-09-23]

- Initial release.

## License

Copyright (c) 2014 Kenneth Chung

Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) license.
