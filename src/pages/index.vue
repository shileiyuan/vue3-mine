<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { GameStatus } from '../composables/const'
import BlockBtn from '~/components/BlockBtn.vue'
import Game from '~/composables/Game'
import Header from '~/components/Header.vue'
import { Difficulty, EDifficulty } from '~/composables/const'
import Confetti from '~/components/Confetti.vue'

const size = Difficulty.get(EDifficulty.medium) as { text: string; value: [number, number] }

const player = new Game(...size.value)
const fire = ref(false)

watchEffect(() => {
  player.checkStatus()
})

</script>

<template>
  <div>
    <span @click="fire = !fire">Minesweeper</span>
    <Header :player="player" />
    <div p5>
      <div
        v-for="row, y in player.board.value"
        :key="y"
        flex="~"
        items-center
        justify-center
        @contextmenu.prevent
      >
        <BlockBtn
          v-for="block, x in row"
          :key="x"
          :block="block"
          @click="player.onClick(block)"
          @contextmenu.prevent="player.onRightClick(block)"
        />
      </div>
    </div>

    <Confetti :passed="player.status.value === GameStatus.won || fire" />
  </div>
</template>
