import { AttributeEffect } from './attribute_effect'
import { ClassesEffect } from './classes_effect'
import { TextEffect } from './text_effect'

export function effectFactory(effectType, $self, $node, state, handler) {
  switch (effectType) {
    case 'text': {
      return new TextEffect($self, $node, state, handler)
    }
    case 'attribute': {
      return new AttributeEffect($self, $node, state, handler)
    }
    case 'classes': {
      return new ClassesEffect($self, $node, state, handler)
    }
    default:
      throw new Error()
  }
}
