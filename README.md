# Draggable Background

A jQuery plugin to make background images draggable.

## Configuration
<table>
  <tr>
    <th>Option</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>bounded</td>
    <td>Boolean</td>
    <td>Whether dragging is bounded by the complete image or the image can loop.</td>
  </tr>
  <tr>
    <td>axis</td>
    <td>String</td>
    <td>In which direction is dragging activated.</td>
  </tr>
</table>

## Usage
```js
// default options
$('div').backgroundDraggable()

// only draggable in the x direction, and image can loop 
$('div').backgroundDraggable({ bound: false, axis: 'x' })
```

## Demo
http://kentor.github.com/jquery-draggable-background/

## Changelog

v1.0 [2012-09-23]

- Initial release.

## License

Copyright (c) 2012 Kenneth Chung

Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) license.
