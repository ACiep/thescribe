import { AttributeEffect } from './attribute_effect'
import { TextEffect } from './text_effect'

export function effectFactory(effectType, $node, state, handler) {
  switch (effectType) {
    case 'text': {
      return new TextEffect($node, state, handler)
    }
    case 'attribute': {
      return new AttributeEffect($node, state, handler)
    }
    default:
      throw new Error()
  }
}
