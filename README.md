# Keep Lite - Google Keep Rebuild

## Original Application
[Google Keep](https://keep.google.com/)

## Project Overview
A lightweight productivity app built with React that mimics the layout and filtering capabilities of Google Keep, featuring dynamic profile data from an external Purdue API and custom routing.

## How to Run Locally
1. Clone the repo.
2. Run `npm install` in your terminal.
3. Run `npm run dev` to view the project.

---

## Progress Update (Checkpoint 2)

### Interactive Features Implemented:
* **Search & Filtering:** I implemented a search bar and a dropdown menu that use `useState` and `onChange` events to filter API profiles in real-time.

* **Controlled Form & Redirection:** The "Add Profile" form uses controlled inputs to manage state. Upon a valid submission, the app updates the local profile list and uses `useNavigate` to programmatically redirect the user back to the Home page.

* **Dynamic Routing:** Using `react-router-dom`, I created dynamic paths (`/profiles/:id`) that fetch and display specific profile details based on the URL parameters.

* **Theme Toggle:** A state-driven button allows users to toggle between Light and Dark modes, updating the global CSS classes and component styles instantly.


### Why these interactions?
I chose these features to transform the app from a static mockup into a functional tool. Search and filtering are essential for managing data, while the form and routing demonstrate a complete user workflow—moving from adding data to navigating through specific views without a page reload.

### What is planned next?
* **Data Persistence:** I plan to use `localStorage` to save user-added profiles so they persist even after a browser refresh.

* **UI Polish:** Adding CSS transitions for smoother route changes and refining the mobile layout for profile detail pages.

---