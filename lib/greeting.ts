// Shared module: multi-file scripts may import anything inside the same
// commit tree with relative paths.
export function makeGreeting(name: string, shout: boolean): string {
  const text = `Hello from the console, ${name}!`;
  return shout ? text.toUpperCase() : text;
}
