# Feature 04: Quick Start Mode

## Goal
Pre-generated 10-question session with progress tracking and results screen.

## Tasks

### 4.1 Game Initialization
- [ ] Read range from URL params (?range=10|20|50|100)
- [ ] Pre-generate 10 questions on mount
- [ ] Initialize score counter (correct/total)
- [ ] Initialize current question index (0)

### 4.2 Game Screen Layout
- [ ] Back button (top-left) - triggers confirm dialog
- [ ] Progress indicator (top): "3 / 10" or progress bar
- [ ] Question area (center)
- [ ] Answer bubbles (scattered but organized)
- [ ] Hint button (bottom-left)

### 4.3 Answer Flow
- [ ] User taps an answer
- [ ] If correct:
  - Play success sound
  - Show celebration animation (confetti, stars)
  - Mark question as correct
  - Auto-advance after 1.5s
- [ ] If wrong:
  - Play gentle wrong sound
  - Shake the wrong answer
  - Allow retry (or auto-advance based on preference)
  - Track as incorrect

### 4.4 Progress Tracking
- [ ] Show current question number
- [ ] Visual progress bar with fun colors
- [ ] Stars/checkmarks for completed questions

### 4.5 Results Screen
- [ ] After question 10, show results
- [ ] Display score: "You got 8 out of 10!"
- [ ] Star rating (3 stars for 10/10, 2 for 7-9, 1 for 4-6, try again for <4)
- [ ] Celebration animation for high scores
- [ ] Buttons: "Play Again" (same range), "Main Menu"

## State Management
```typescript
interface QuickStartState {
  questions: Question[];
  currentIndex: number;
  score: number;
  answers: (boolean | null)[];  // null = not answered
  isComplete: boolean;
}
```

## Acceptance Criteria
- Full 10-question flow works smoothly
- Progress is clearly visible
- Results provide positive reinforcement
- Child feels accomplished regardless of score
