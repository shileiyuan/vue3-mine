/* eslint-disable no-alert */
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { BlockState } from '../type'
import { GameStatus, directions } from '../composables/const'
import { getBlocks } from './logic'

export default class Game {
  board = ref() as Ref<BlockState[][]>
  status = ref(GameStatus.ready)
  mineGenerated = ref(false)
  mineCount = ref(0)

  constructor (public width: number, public height: number) {
    this.reset()
  }

  reset (
    width = this.width,
    height = this.height,
  ) {
    this.width = width
    this.height = height
    this.board.value = getBlocks(this.width, this.height)
    this.status.value = GameStatus.ready
    this.mineGenerated.value = false
    this.mineCount.value = 0
  }

  generateMines (initial: BlockState) {
    for (const row of this.board.value) {
      for (const block of row) {
        if (Math.abs(initial.x - block.x) <= 1 || Math.abs(initial.y - block.y) <= 1) {
          continue
        } else {
          block.mine = Math.random() < 0.3
          if (block.mine) {
            this.mineCount.value++
          }
        }
      }
    }
  }

  updateNumbers () {
    this.board.value.forEach((row) => {
      row.forEach((block) => {
        if (block.mine) {
          return
        }
        const siblings = this.getSiblings(block)
        siblings.forEach((sibling) => {
          if (sibling.mine) {
            block.adjacentMines += 1
          }
        })
      })
    })
  }

  getSiblings (block: BlockState) {
    return directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) {
        return undefined
      }
      return this.board.value[y2][x2]
    }).filter(Boolean) as BlockState[]
  }

  expandZero (block: BlockState) {
    if (block.adjacentMines || block.mine) {
      return
    }
    const siblings = this.getSiblings(block)
    siblings.forEach((sibling) => {
      if (!sibling.revealed) {
        sibling.revealed = true
        this.expandZero(sibling)
      }
    })
  }

  onClick (block: BlockState) {
    if (this.status.value === GameStatus.ready) {
      this.status.value = GameStatus.play
    }
    if (this.status.value !== GameStatus.play || block.revealed || block.flagged) return

    if (!this.mineGenerated.value) {
      this.generateMines(block)
      this.updateNumbers()
      this.expandZero(block)
      this.mineGenerated.value = true
    } else {
      if (!block.adjacentMines) {
        this.expandZero(block)
      }
    }
    block.revealed = true
  }

  onRightClick (block: BlockState) {
    if (this.status.value !== GameStatus.play || block.revealed) return

    block.flagged = !block.flagged
    this.mineCount.value--
  }

  checkStatus () {
    if (this.status.value !== GameStatus.play) return
    const blocks = this.board.value.flat()
    let hasCommon = false
    for (const b of blocks) {
      if (b.revealed && b.mine) {
        this.status.value = GameStatus.lost
        setTimeout(() => {
          alert('输啦！')
          this.showAllMines()
        }, 10)
        return
      } else if ((!b.revealed && !b.mine) || (!b.revealed && b.flagged)) {
        hasCommon = true
      }
    }
    if (!hasCommon) {
      this.status.value = GameStatus.won
      setTimeout(() => {
        alert('赢啦！')
      }, 10)
    }
  }

  showAllMines () {
    this.board.value.flat().forEach((block) => {
      if (block.mine) {
        block.revealed = true
      }
    })
  }
}
