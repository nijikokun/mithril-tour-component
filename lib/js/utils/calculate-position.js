var mirror = {
  'top left': 'top right',
  'top right': 'top left',
  'bottom left': 'bottom right',
  'bottom right': 'bottom left',
  'left': 'right',
  'right': 'left',
  'top': 'bottom',
  'bottom': 'top'
}

function isWindow (element) {
  return obj != null && obj === obj.window
}

function outerWidth (el) {
  var width = el.offsetWidth
  var style = getComputedStyle(el)
  width += parseInt(style.marginLeft) + parseInt(style.marginRight)
  return width
}

function offsets (element) {
  var rect = element.getBoundingClientRect()
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

module.exports = function calculatePosition (element, options) {
  var position = options.position.toLowerCase()
  var target = document.querySelector(options.selector)
  var offset = offsets(target)
  var offsetX = options.offset ? options.offset.x : 5
  var offsetY = options.offset ? options.offset.y : 10
  var targetWidth = outerWidth(target)
  var targetHeight = target.offsetHeight
  var boundTop = window.pageXOffset
  var boundLeft = window.pageYOffset
  var boundRight = boundLeft + window.outerWidth
  var boundBottom = boundTop + window.outerHeight

  var positions = {
    'top left': {
      x: offset.top,
      y: offset.left
    },

    'top right': {
      x: offset.top,
      y: offset.left + targetWidth
    },

    'top': {
      x: offset.top,
      y: offset.left + (targetWidth / 2) - (offsetX / 2)
    },

    'bottom left': {
      x: offset.top + targetHeight - offsetY,
      y: offset.left
    },

    'bottom right': {
      x: offset.top + targetHeight - offsetY,
      y: offset.left + targetWidth - offsetX
    },

    'bottom': {
      x: offset.top + targetHeight - offsetY,
      y: offset.left + (targetWidth / 2) - (offsetX / 2)
    },

    'left': {
      x: offset.top + (targetHeight / 2) - (offsetY / 2),
      y: offset.left
    },

    'right': {
      x: offset.top + (targetHeight / 2) - (offsetY / 2),
      y: offset.left + targetWidth - offsetX
    }
  }

  return positions[position]
}
