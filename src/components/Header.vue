<script lang="ts" setup>
import { isDev, toggleDev } from '~/composables/dev'
import type Game from '~/composables/Game'
import { Difficulty } from '~/composables/const'

defineProps<{
  player: Game
}>()

</script>

<template>
  <div
    flex="~ gap1"
    justify-center
    p4
  >
    <div
      font-mono
      text-2xl
      flex="~ gap-1"
      items-center
    >
      <div i-mdi-mine />
      {{ player.mineCount }}
    </div>

    <div
      btn
      ml-2
      @click="player.reset()"
    >
      新游戏
    </div>
    <div
      v-for="[key, d] in Difficulty"
      :key="key"
      btn
      ml-2
      @click="player.reset(...d.value)"
    >
      {{ d.text }}
    </div>
    <div
      btn
      ml-2
      @click="toggleDev()"
    >
      {{ isDev ? '不作弊' : '作弊' }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
