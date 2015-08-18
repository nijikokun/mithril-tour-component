var m = require('mithril')
module.exports = function TourTooltip (props, children) {
  children = typeof children === 'object' && children.length ? children : []
  props = props || {}
  props.position = props.position || 'absolute'
  props.x = props.x || -1000
  props.y = props.y || -1000
  props.element = props.element || {}
  props.direction = props.element.position || props.direction || 'right'
  props.footer = props.footer || {}

  return m.component({
    view: function () {
      var styles = [
        'position:', props.position === 'fixed' ? 'fixed' : 'absolute', ';',
        'top:', props.x, 'px;',
        'left:', props.y, 'px;'
      ].join('')

      children = children.concat([
        m('div.tour-tooltip-footer', [
          m('span', [
            (props.footer.skipText || 'Already a pro? '),
            m('a.tour-link.skip', { onclick: props.onskip }, (props.footer.skipLinkText || 'Skip the tour'))
          ]),
          m('button.tour-btn.dismiss', { onclick: props.ondismiss }, (props.footer.dismissText || 'Got it!'))
        ])
      ])

      return m('div', [
        m('div.tour-backdrop', { onclick: props.onclose }),
        m('div.tour-tooltip', { style: styles, config: props.onconfig, className: props.direction }, children)
      ])
    }
  })
}
