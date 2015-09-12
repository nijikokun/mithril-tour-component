var m = require('mithril')
var debounce = require('debounce')
var TourTooltip = require('./tour-tooltip')
var calculatePosition = require('../utils/calculate-position')
var noop = function () {}

module.exports = function TourIndicator (props) {
  var showTooltip = false

  function toggleTooltip () {
    showTooltip = showTooltip ? false : true
  }

  function onConfig (el, hasAlreadyRan) {
    if (hasAlreadyRan) {
      return
    }

    if (props.element) {
      function positionElement () {
        var position = calculatePosition(el, props.element)
        el.style.top = position.x + 'px'
        el.style.left = position.y + 'px'
      }

      window.onresize = debounce(positionElement, 80)
      positionElement()
    }
  }

  return m.component({
    controller: function () {
      var ctrl = {}

      ctrl.id = props.id
      ctrl.position = props.position || 'absolute'
      ctrl.x = m.prop(props.x || -1000)
      ctrl.y = m.prop(props.y || -1000)
      ctrl.tooltip = props.tooltip
      ctrl.element = props.element

      var onclick = props.onclick || props.onClick || noop
      ctrl.onclick = function TourIndicatorOnClick (e) {
        toggleTooltip()
        onclick(e, ctrl.id)
      }

      var onskip = props.onskip || props.onSkip || noop
      ctrl.onskip = function TourIndicatorOnSkip (e) {
        toggleTooltip()
        onskip(e, ctrl.id)
      }

      var onclose = props.onclose || props.onClose || noop
      ctrl.onclose = function TourIndicatorOnClose (e) {
        toggleTooltip()
        onclose(e, ctrl.id)
      }

      var ondismiss = props.ondismiss || props.onDismiss || noop
      ctrl.ondismiss = function TourIndicatorOnDismiss (e) {
        toggleTooltip()
        ondismiss(e, ctrl.id)
      }

      return ctrl
    },

    view: function (ctrl) {
      if (showTooltip) {
        return TourTooltip({
          position: ctrl.position,
          element: ctrl.element,
          x: ctrl.x(),
          y: ctrl.y(),
          onconfig: onConfig,
          ondismiss: ctrl.ondismiss,
          onclose: ctrl.onclose,
          onskip: ctrl.onskip,
          footer: ctrl.tooltip.footer
        }, ctrl.tooltip.content)
      }

      var styles = [
        'position:', ctrl.position === 'fixed' ? 'fixed' : 'absolute', ';',
        'top:', ctrl.x(), 'px;',
        'left:', ctrl.y(), 'px;'
      ].join('')

      return m('div.tour-indicator', {
        key: ctrl.id,
        style: styles,
        onclick: ctrl.onclick,
        config: onConfig
      }, [
        m('div.holder', [
          m('div.pulse'),
          m('div.pulse2'),
          m('div.dot')
        ])
      ])
    }
  })
}
