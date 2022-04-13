<script lang="ts" setup>
import type { BlockState } from '../type'
import { isDev } from '~/composables/dev'

defineProps<{ block: BlockState }>()

const numberColors = [
  'text-transparent',
  'text-gray-500',
  'text-yellow-500',
  'text-tail-500',
  'text-blue-500',
  'text-green-500',
  'text-purple-500',
  'text-pink-500',
  'text-orange-500',
]

function getClass (block: BlockState) {
  if (block.flagged) return 'bg-gray-500/10'
  if (!block.revealed) return 'bg-gray-500/10 hover:bg-gray'
  return block.mine ? 'bg-red-500/50' : numberColors[block.adjacentMines]
}
</script>

<template>
  <button
    w-10
    h-10
    border="1 gray-400/10"
    m="0.5"
    :class="getClass(block)"
    flex="~"
    items-center
    justify-center
  >
    <template v-if="block.flagged">
      <div
        i-mdi:flag
        text-blue
      />
    </template>
    <template v-else-if="block.revealed || isDev">
      <div
        v-if="block.mine"
        i-mdi:mine
      />
      <div v-else>
        {{ block.adjacentMines }}
      </div>
    </template>
  </button>
</template>
<style lang="scss" scoped>
</style>
