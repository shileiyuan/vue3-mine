export const directions = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
]

export enum GameStatus {
  ready = 'ready',
  play = 'play',
  won = 'won',
  lost = 'lost',
}

export enum EDifficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export const Difficulty = new Map<EDifficulty, { text: string; value: [number, number] }>([
  [EDifficulty.easy, {
    text: '简单',
    value: [9, 9],
  }],
  [EDifficulty.medium, {
    text: '中等',
    value: [20, 15],
  }],
  [EDifficulty.hard, {
    text: '困难',
    value: [30, 30],
  }],
])
