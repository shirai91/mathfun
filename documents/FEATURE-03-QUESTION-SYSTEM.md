# Feature 03: Question System

## Goal
Generate and display math questions in various formats for engaging practice.

## Tasks

### 3.1 Question Generator Logic
- [ ] Create questionGenerator.ts in lib/
- [ ] Support 6 question formats:
  - `a + _ = c` (find missing addend)
  - `_ + b = c` (find missing first addend)
  - `a + b = _` (find sum)
  - `a - _ = c` (find subtrahend)
  - `a - b = _` (find difference)
  - `_ - b = c` (find minuend)
- [ ] Respect range limit (numbers don't exceed range)
- [ ] Generate 3 wrong answers (plausible, not duplicates)
- [ ] Shuffle answer positions

### 3.2 Question Types
```typescript
interface Question {
  id: string;
  display: string;        // "5 + _ = 8"
  answer: number;         // 3
  options: number[];      // [3, 2, 4, 5] (shuffled)
  format: 'horizontal' | 'vertical';
  operation: '+' | '-';
}
```

### 3.3 Question Display Component
- [ ] Horizontal format: `5 + 3 = ?` inline
- [ ] Vertical format:
  ```
      5
    + 3
    ───
      ?
  ```
- [ ] Large, clear numbers
- [ ] Blank space shown as colorful box or "?"
- [ ] Random selection of horizontal/vertical per question

### 3.4 Answer Display
- [ ] 4 answer bubbles/buttons
- [ ] Randomly positioned (not overlapping question)
- [ ] Large touch targets for small fingers
- [ ] Visual feedback on selection (correct = green, wrong = shake)

### 3.5 Hint System
- [ ] Light bulb button (bottom-left)
- [ ] On press: highlight correct answer briefly
- [ ] Optional: show visual aid (e.g., counting dots)
- [ ] Hint usage can be tracked (for stats later)

## Acceptance Criteria
- Questions are mathematically valid
- All 6 formats appear randomly
- Vertical/horizontal display both work
- Wrong answers are plausible (not obviously wrong)
- Hint helps without giving away too easily
