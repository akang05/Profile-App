# Keep Lite - Google Keep Rebuild

## Original Application
[Google Keep](https://keep.google.com/)

## Project Overview
A lightweight productivity app built with React that mimics the core functionality and aesthetic of Google Keep. It features a note-taking dashboard, category tagging, and pinning capabilities.

## Live Site & Repository
* **Live Site:** [https://akang05.github.io/Profile-App/#/]
* **Repository:** [https://github.com/akang05/Profile-App]

---

## Technical Implementation

### Features Implemented:
* **Note Management:** Users can create, pin/unpin, and delete notes. Notes are organized into "Pinned" and "Others" sections for better organization.
* **Real-time Search:** A search bar filters notes by title or content instantly using React state and `onChange` events.
* **Persistent Storage:** Integrated a custom `useLocalStorage` hook so that user notes and theme preferences (Dark/Light mode) remain saved even after a browser refresh.
* **Image URL Support:** The "New Note" form accepts direct image URLs and provides a live preview before saving to ensure the link is valid.
* **Theme Toggle:** A global theme provider allows switching between Dark and Light modes instantly, updating the UI across all components.

### Technical Structure:
* **State Management:** Utilizes React `useState` for UI updates and a custom hook for syncing data with the browser's Local Storage.
* **Routing:** Implemented with `react-router-dom` using `HashRouter` to ensure compatibility and prevent 404 errors when navigating on GitHub Pages.
* **Styling:** Custom CSS focusing on a "masonry" card layout using CSS Grid and a responsive single-line header using Flexbox.

### Future Improvements:
* **Drag-and-Drop:** Implementing a library to allow users to manually reorder notes on the dashboard.
* **Rich Text Editing:** Adding support for bold, italic, and checklist formats within the note body.
* **Bringing Back Deleted Notes:** If accidentally deleted a note, adding a feature to allow the user to bring back that note.
---