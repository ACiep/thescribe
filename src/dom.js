export function cleanChildren($node) {
  while ($node.firstChild) {
    $node.removeChild($node.firstChild)
  }
}
