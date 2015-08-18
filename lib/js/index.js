var m = require('mithril')
var noop = function () {}

function Tour (settings, indicators) {
  var skipped = settings.skipped || false
  var dismissed = settings.dismissed || {}

  // Hide initially dismissed tour items, and process their properties
  indicators = indicators || {}
  indicators = indicators.filter(function (props, index) {
    return !dismissed[index]
  }).map(function TourIndicatorMap (props, index) {
    props.id = props.key || index

    var onskip = settings.onskip || props.onskip || props.onSkip || noop
    props.onskip = function TourOnSkip (e) {
      skipped = true
      onskip(e, props.id)
    }

    var ondismiss = settings.ondismiss || props.ondismiss || props.onDismiss || noop
    props.ondismiss = function TourOnDismiss (e) {
      dismissed[props.id] = true
      ondismiss(e, props.id)
    }

    return Tour.indicator(props)
  })

  return m.component({
    controller: function () {
      return {}
    },

    view: function (ctrl) {
      if (skipped) {
        return m('div.tour-skipped')
      }

      return m('div.tour', indicators.filter(function (props, index) {
        return !dismissed[index]
      }) || [])
    }
  })
}

Tour.indicator = require('./components/tour-indicator')
Tour.tooltip = require('./components/tour-tooltip')

module.exports = Tour
