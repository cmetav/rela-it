export function plus(...vals: number[]): number {
  return vals.reduce((prev, curr) => prev + curr, 0)
}
