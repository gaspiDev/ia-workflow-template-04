# STORY-010: Implement Custom Table and Bold Styling

## 1. Description
Customize the rendering of specific Markdown elements to match the project's "Groovy/70s" aesthetic, focusing on tables and bold text.

## 2. Tasks
- [x] Define custom component overrides for `strong`, `em`, and `code`.
- [x] Implement a custom `table` component with:
    - `glass-card` background and blur.
    - `radius-2xl` corners.
    - `DM Serif Display` for headers.
    - Horizontal overflow wrapper for responsiveness.
- [x] Add zebra-striping or hover effects to table rows.

## 3. Acceptance Criteria
- Tables look consistent with the site's UI design.
- Bold text is visually distinct but remains readable within the chat bubble.
- Tables are responsive and don't break the message container.
