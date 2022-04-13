import type { BlockState } from '../type'

export function getBlocks (width: number, height: number) {
  return (
    Array.from({ length: height }, (_, y) =>
      Array.from({ length: width },
        (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          revealed: false,
        }),
      ),
    )
  )
}
