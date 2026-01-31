# MathFun - Architecture Design

## Overview
A fun, interactive math learning app for 6-year-old children. Features colorful paper-like UI, simple math operations (+, -), and engaging sound effects.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **State:** React useState/useContext (no external state library needed)
- **Sound:** HTML5 Audio API (howler.js if needed)
- **Deployment:** Static export or Vercel

## Page Structure
```
/                    → Main Menu
/play/quick-start    → Quick Start mode (10 questions)
/play/endless        → Endless mode
```

## Core Components
```
src/
├── app/
│   ├── page.tsx              # Main Menu
│   ├── layout.tsx            # Root layout with fonts, global styles
│   └── play/
│       ├── quick-start/
│       │   └── page.tsx      # Quick Start game
│       └── endless/
│           └── page.tsx      # Endless game
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Colorful button component
│   │   ├── PaperBackground.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── HintButton.tsx    # Light bulb hint button
│   ├── game/
│   │   ├── Question.tsx      # Question display (horizontal/vertical)
│   │   ├── AnswerBubble.tsx  # Answer option bubble
│   │   ├── AnswerGrid.tsx    # Layout for 4 answers
│   │   ├── ScoreBoard.tsx    # Progress tracker
│   │   └── RangeSelector.tsx # Range picker (10, 20, 50, 100)
│   └── layout/
│       ├── BackButton.tsx    # Back to menu button
│       └── GameHeader.tsx    # Header with back button
├── hooks/
│   ├── useSound.ts           # Sound effects hook
│   ├── useBackgroundMusic.ts # Background music controller
│   └── useQuestionGenerator.ts # Math question logic
├── lib/
│   ├── questionGenerator.ts  # Core question generation
│   ├── sounds.ts             # Sound file paths
│   └── constants.ts          # App constants
└── types/
    └── index.ts              # TypeScript types
```

## Question Types (6 variations)
1. `a + _ = c` → Find missing addend
2. `_ + b = c` → Find missing addend  
3. `a + b = _` → Find sum
4. `a - _ = c` → Find subtrahend
5. `a - b = _` → Find difference
6. `_ - b = c` → Find minuend

## Game Flow
```
[Main Menu]
    ├── Quick Start → [Range Select] → [10 Questions] → [Results]
    └── Endless → [Range Select] → [Infinite Questions]
```

## Sound Design
- **Background music:** Light, cheerful, loopable
- **Button click:** Pop/click sound
- **Correct answer:** Celebratory chime
- **Wrong answer:** Gentle "try again" sound
- **Hint:** Magic/sparkle sound

## Color Palette (Kid-Friendly)
- Background: Warm cream/paper texture (#FFF8E7)
- Primary buttons: Bright blue, green, orange, pink
- Text: Dark brown for readability (#4A3728)
- Accents: Yellow, purple highlights

## Build Order
1. ✅ Project setup (already done)
2. UI components (paper background, buttons)
3. Main menu page
4. Question generator logic
5. Question display component
6. Quick Start mode
7. Endless mode
8. Sound integration
9. Polish & testing
