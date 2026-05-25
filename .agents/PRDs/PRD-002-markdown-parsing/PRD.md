# PRD-002: Enhanced Chat Markdown & Table Rendering

## 1. Goal
Enhance the chat interface by parsing LLM-generated Markdown into structured, visually appealing UI components. This includes basic formatting (bold, italics) and complex structures like tables, aligned with the application's unique "Groovy/70s" aesthetic.

## 2. User Experience (UX)
- **Readability**: Messages should no longer show raw markdown syntax (e.g., `**text**`).
- **Visual Structure**: Tables should be rendered as interactive, styled UI components rather than monospaced text blocks.
- **Consistency**: The styling must follow the existing design system (Geist/DM Serif Display fonts, `oklch` colors, and `glass-card` effects).

## 3. Core Requirements

### 3.1 Text Formatting
- Support **Bold** (`**text**`), *Italics* (`*text*`), and inline `code`.
- Preserve line breaks and paragraph spacing.

### 3.2 Table Rendering
- Support GitHub Flavored Markdown (GFM) tables.
- **Visuals**:
    - Rounded containers (`radius-2xl` or `3xl`).
    - Backdrop blur (`glass-card` style).
    - Distinctive header styling using `DM Serif Display`.
    - Zebra striping or hover highlights using primary/accent colors.
- **Responsiveness**: Tables should be horizontally scrollable on small screens to prevent layout breaking.

### 3.3 Integration
- Replace raw text rendering in `ChatMessage.jsx` with a dedicated `Markdown` renderer.
- Support both `assistant` (glass-card) and `user` (primary background) message styles.

## 4. Technical Strategy

### 4.1 Libraries
- `react-markdown`: Core parser and renderer.
- `remark-gfm`: Extension for tables and advanced markdown features.

### 4.2 Custom Components
Map Markdown elements to custom React components:
- `table` -> Styled `<table>` with a scrollable wrapper.
- `strong` -> `<span>` or `<strong>` with specific weight/color.
- `code` -> Themed inline code blocks.

## 5. Success Criteria
1. LLM responses containing `**word**` render as bold text.
2. LLM responses containing markdown tables render as interactive, styled UI tables.
3. No regressions in the chat layout or message bubble responsiveness.
