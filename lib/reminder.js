'use babel'

import * as React from 'react'

let lastTime = Date.now()
let isShowing = false

setInterval(() => {
  if (isShowing) {
    return
  }

  // check time
  const now = Date.now()
  const timeDifference = now - lastTime
  const minutes = inkdrop.config.get('water-break.minutes')
  const ms = minutes * 1000 * 60

  inkdrop.config.observe('water-break.minutes', newValue => {
    if (minutes !== newValue) {
      lastTime = Date.now()
    }
  })

  if (timeDifference > ms) {
    lastTime = now

    // show me
    show()
  }
}, 1000)

export default function LayoutReminderSidebarMenuItem() {
  const { SideBarMenuItem } = inkdrop.components.classes

  const handleClick = () => {
    hide()
  }

  return (
    <SideBarMenuItem
      className="water-break hydrate-menu-item"
      indentLevel={0}
      onClick={handleClick}
    >
      <div id='hydrate-button' className='hydrate-flex'>
        <i className='fa-tint icon' />
        <p className='hydrate-text'>Remember To Hydrate!</p>
      </div>
    </SideBarMenuItem>
  )
}

export const componentName = LayoutReminderSidebarMenuItem.name

const layoutName = 'sidebar-menu'

export function toggle() {
  const isVisible =
    inkdrop.layouts.indexOfComponentInLayout(layoutName, componentName) >= 0
  isVisible ? hide() : show()
}

export function hide() {
  const element = document.getElementById('hydrate-button')
  element.classList.remove('slide-in')
  element.classList.add('slide-out')

  setTimeout(() => {
    inkdrop.layouts.removeComponentFromLayout(layoutName, componentName)
    isShowing = false
  }, 500)
}

export function show() {
  inkdrop.layouts.insertComponentToLayoutAfter(
    layoutName,
    'SideBarMenuItemSearch',
    componentName
  )

  const element = document.getElementById('hydrate-button')
  element.classList.add('slide-in')
  element.classList.remove('slide-out')
  isShowing = true
}