# Feature 02: Main Menu

## Goal
Create an inviting main menu that's easy for a 6-year-old to navigate.

## Tasks

### 2.1 Main Menu Layout
- [ ] App title/logo at top (big, colorful)
- [ ] Two large buttons: "Quick Start" and "Endless"
- [ ] Fun decorative elements (stars, numbers, math symbols floating)
- [ ] Background music starts here (muted by default, click to enable)

### 2.2 Mode Selection Flow
- [ ] Quick Start button → shows range selector
- [ ] Endless button → shows range selector
- [ ] Range options: 10, 20, 50, 100 (displayed as fun buttons)

### 2.3 Range Selector Component
- [ ] 4 buttons in a grid (2x2)
- [ ] Each shows the number prominently
- [ ] Description: "Numbers up to 10", etc.
- [ ] Select one → navigate to game page

### 2.4 Visual Polish
- [ ] Animated title entrance
- [ ] Buttons have playful bounce on hover
- [ ] Consider mascot character or cute math icons

## Navigation
```
Main Menu
├── [Quick Start] → Range Selector → /play/quick-start?range=X
└── [Endless] → Range Selector → /play/endless?range=X
```

## Acceptance Criteria
- Child can easily tap/click to start a game
- Range selection is intuitive
- Visual style matches paper/colorful theme
