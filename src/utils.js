export function getPath(parent, prop) {
  if (parent === null) {
    return prop
  }
  return `${parent}.${prop}`
}
