# Feature 06: Sound System

## Goal
Add engaging audio that makes the app feel alive without being annoying.

## Tasks

### 6.1 Sound Files to Find
Search for free, kid-friendly sounds (sources: freesound.org, pixabay.com/sound-effects, mixkit.co):

- [ ] **Background music**: Cheerful, light, loopable (60-120 seconds)
- [ ] **Button click**: Soft pop or click
- [ ] **Correct answer**: Happy chime, ding, or "yay" sound
- [ ] **Wrong answer**: Gentle "oops", not harsh or discouraging
- [ ] **Hint**: Magic sparkle or light bulb "ding"
- [ ] **Game complete**: Celebration fanfare
- [ ] **Streak milestone**: Special achievement sound

### 6.2 useSound Hook
```typescript
const useSound = () => {
  const playClick = () => { ... };
  const playCorrect = () => { ... };
  const playWrong = () => { ... };
  const playHint = () => { ... };
  const playComplete = () => { ... };
  return { playClick, playCorrect, playWrong, playHint, playComplete };
};
```

### 6.3 useBackgroundMusic Hook
```typescript
const useBackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => { ... };
  const play = () => { ... };
  const pause = () => { ... };
  return { isPlaying, toggle, play, pause };
};
```

### 6.4 Sound Controls
- [ ] Music toggle button (speaker icon) in main menu
- [ ] Remember preference in localStorage
- [ ] Start muted (browser autoplay policy)
- [ ] First user interaction enables audio

### 6.5 Sound File Organization
```
public/
└── sounds/
    ├── music/
    │   └── background.mp3
    └── effects/
        ├── click.mp3
        ├── correct.mp3
        ├── wrong.mp3
        ├── hint.mp3
        └── complete.mp3
```

## Technical Notes
- Use HTML5 Audio API (or howler.js if needed)
- Preload sounds on app start
- Keep file sizes small (compress to 128kbps or less)
- MP3 format for broad compatibility

## Acceptance Criteria
- All sounds play at appropriate moments
- Background music loops seamlessly
- Sound can be muted
- No audio glitches or delays
- Sounds are pleasant, not annoying
