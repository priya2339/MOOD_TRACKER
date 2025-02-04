# MOOD_TRACKER

This document explains the structure and functionality of the Journal App, built using HTML, CSS, and JavaScript.  The app allows users to write journal entries, save them locally using localStorage, and view a list of their entries.  It also uses Google's Generative AI to analyze the sentiment of each entry.


## File Structure:

* **index.html:** The main HTML file, containing the structure and layout of the app.
* **index.js:** The JavaScript file handling user interactions, data storage, and Google AI integration.
* **style.css:** The CSS file styling the app's visual elements.


## index.html (HTML Structure)

This file sets up the basic structure of the webpage:

1. **DOCTYPE declaration:** Specifies the HTML version.
2. **`<head>` section:** Contains meta information, including character set, viewport settings, title, and the link to the stylesheet (`style.css`).
3. **`<body>` section:** Contains the main content:
    * **`<nav id="navbar">`:**  A navigation bar with the app's title.
    * **`<div id="bg-container">`:** A container for the main content, allowing for better layout management.
        * **`<div id="container">`:** Container for the journal entry input area.
            * **`<h3>`:**  A heading for the entry input.
            * **`<textarea id="entryInput">`:**  The text area where users write their journal entries.
            * **`<button id="addButton">`:** The button to add a new journal entry.
        * **`<div id="entriesContainer">`:**  A container to display the list of journal entries.
    * **`<script type="module" src="index.js">`:** Imports the JavaScript file to handle the app's logic.


## index.js (JavaScript Logic)

This file manages the app's core functionality:

1. **Import Google Generative AI:** Imports the necessary library for interacting with Google's Generative AI.  Requires installation: `npm install @google/generative-ai`
2. **DOM Element Selection:** Selects HTML elements for manipulation.
3. **`entries` Array:** Stores journal entries, initially loading from localStorage if available.
4. **`addButton.addEventListener`:** Listens for clicks on the "Add Entry" button.
    * **Input Validation:** Checks if the user has entered text.  Alerts the user if not.
    * **`analyzeData()` Function Call:** Calls the function to analyze the sentiment of the entry using Google's AI.
    * **Entry Object Creation:** Creates a new journal entry object with `id`, `text`, `date`, and `sentiment`.
    * **`entries.push()`:** Adds the new entry to the `entries` array.
    * **`saveEntries()`:** Saves the updated `entries` array to localStorage.
    * **`displayEntries()`:** Displays the updated list of entries.
    * **Input Clearing:** Clears the entry input field.
5. **`genAI` Object:** Initializes the Google Generative AI client with your API key. **Remember to replace `"AIzaSyBxmeFtXtavP8Oe-EcCpVsadDConEQcgdc"` with your actual API key.**
6. **`analyzeData(myfeelings)` Function:** Asynchronously uses Google's Gemini model to analyze the sentiment of the input text.  The prompt is designed to return one of three classifications: "Positive", "Negative", or "Natural".
7. **`saveEntries()` Function:** Saves the journal entries to localStorage.
8. **`displayEntries()` Function:** Clears the entries container and dynamically creates and adds HTML elements for each journal entry.  Includes the date, text, and sentiment.
9. **`createEntryElement(entry)` Function:** Creates the HTML elements for a single journal entry.
10. **`deleteEntry(id)` Function:** Deletes a journal entry based on its ID.
11. **`editEntry(id)` Function:** Edits a journal entry by populating the input field with the entry's text and then deleting the original entry (allowing the user to save the changes by adding a new entry).
12. **Initial Display:** Calls `displayEntries()` to load any existing entries from localStorage on page load.

**Important:**  The provided API key is a placeholder.  You **must** obtain your own API key from Google Cloud to use this functionality.


## style.css (CSS Styling)

This file provides the visual styling for the app:

The CSS file is well-structured and uses selectors to style different elements, including:

* **Basic Styling:** Sets up basic styles for the entire document like font family, background, and box-sizing.
* **Navbar Styling:** Styles the navigation bar with a background color and text color.
* **Dark Mode Button:** Styles a toggle button for dark mode (though the functionality for dark mode is not currently implemented in the JavaScript).
* **Container Styling:** Styles the main containers (`#bg-container`, `#container`, `#entriesContainer`) with background colors, padding, borders, shadows, and responsive behavior.
* **Input and Button Styling:** Styles the text area and button.
* **Entry Styling:** Styles individual journal entries, including date, text, sentiment display, and actions (edit/delete buttons).  Adds hover effects.
* **Responsive Design:** Includes media queries for responsive design, ensuring the app adapts to different screen sizes.


##  To Run the App:

1.  Save the `index.html`, `index.js`, and `style.css` files in the same directory.
2.  Replace the placeholder Google API key in `index.js` with your own.
3.  Open `index.html` in a web browser.

Remember that using the Google Generative AI requires a Google Cloud account and a valid API key.  The sentiment analysis feature will not work without a properly configured API key.
