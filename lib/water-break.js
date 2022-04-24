'use babel';

import { CompositeDisposable } from 'event-kit'
import * as Reminder from './reminder'

class WaterBreak {
  subscriptions = new CompositeDisposable()
  config = {
    minutes: {
      title: 'Show every X minutes',
      type: 'integer',
      default: 10,
      minimum: 5
    }
  }

  activate() {
    const { components, layouts, commands } = inkdrop

    components.registerClass(Reminder.default)

    this.subscriptions.add(
      commands.add(document.body, {
        'water-break:toggle': Reminder.toggle
      })
    )
  }

  deactivate() {
    const { components, layouts } = inkdrop

    this.subscriptions.dispose()

    components.deleteClass(Reminder.default)
  }
}

module.exports = new WaterBreak()