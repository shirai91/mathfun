export const SOUND_PATHS = {
  click: '/sounds/effects/click.mp3',
  correct: '/sounds/effects/correct.mp3',
  wrong: '/sounds/effects/wrong.mp3',
  hint: '/sounds/effects/hint.mp3',
  complete: '/sounds/effects/complete.mp3',
  streak: '/sounds/effects/streak.mp3',
  background: '/sounds/music/background.mp3',
} as const;

export type SoundName = keyof typeof SOUND_PATHS;

// Instructions for adding sounds:
// 1. Download free sounds from https://pixabay.com/sound-effects/
// 2. Recommended searches:
//    - click: "button click" or "pop"
//    - correct: "correct answer" or "success chime"
//    - wrong: "wrong buzzer soft" or "error gentle"
//    - hint: "magic sparkle" or "twinkle"
//    - complete: "celebration" or "fanfare"
//    - streak: "achievement" or "level up"
//    - background: "kids game music" or "happy background"
// 3. Place files in public/sounds/effects/ and public/sounds/music/
// 4. Rename to match the filenames above
