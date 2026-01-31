# Feature 05: Endless Mode

## Goal
Continuous practice mode with no end - great for extended learning sessions.

## Tasks

### 5.1 Game Initialization
- [ ] Read range from URL params
- [ ] Generate first question on mount
- [ ] Initialize running score counter
- [ ] Initialize streak counter (consecutive correct)

### 5.2 Endless Game Loop
- [ ] Show one question at a time
- [ ] On correct answer:
  - Increment score
  - Increment streak
  - Generate next question
- [ ] On wrong answer:
  - Reset streak
  - Allow retry or skip
  - Generate next question

### 5.3 UI Differences from Quick Start
- [ ] No progress bar (endless!)
- [ ] Show total score prominently
- [ ] Show current streak (🔥 x5)
- [ ] Maybe: difficulty increases with streak?

### 5.4 Streak Bonuses (Optional)
- [ ] 5 streak: small celebration
- [ ] 10 streak: bigger celebration
- [ ] 20 streak: special animation

### 5.5 Exit Flow
- [ ] Back button shows confirmation
- [ ] Display final stats: total questions, correct, best streak
- [ ] Option to continue or return to menu

## State Management
```typescript
interface EndlessState {
  currentQuestion: Question;
  totalAnswered: number;
  totalCorrect: number;
  currentStreak: number;
  bestStreak: number;
}
```

## Acceptance Criteria
- Game continues indefinitely
- Streak system provides motivation
- Clean exit with stats summary
- Performance stays smooth after many questions
