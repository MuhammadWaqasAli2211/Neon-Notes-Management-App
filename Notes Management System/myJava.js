// Select the form element where users will add notes
const noteForm = document.getElementById('noteForm');

// Select the input field for the note title
const noteTitle = document.getElementById('noteTitle');

// Select the text area for the note description
const noteDescription = document.getElementById('noteDescription');

// Select the container where notes will be displayed
const notesContainer = document.getElementById('notesContainer');

// Retrieve existing notes from local storage or initialize with an empty array if none exist
var notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to display all notes in the notes container
function displayNotes() {
    // Clear the notes container to prevent duplication
    notesContainer.innerHTML = '';

    // Iterate over each note and create a card for it
    notes.forEach((note, index) => {
        // Create a new div element for the note card
        const noteCard = document.createElement('div');
        noteCard.className = 'note'; // Assign a CSS class for styling

        // Set the inner HTML of the note card with the note's title, description, and a delete button
        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        // Append the note card to the notes container
        notesContainer.appendChild(noteCard);
    });
}

// Event listener to handle the form submission (adding a new note)
noteForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from refreshing when the form is submitted

    // Create a new note object with the title and description from user input
    const newNote = {
        title: noteTitle.value, // Get the value of the title input field
        description: noteDescription.value, // Get the value of the description text area
    };

    // Add the new note to the notes array
    notes.push(newNote);

    // Save the updated notes array to local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Clear the input fields after adding the note
    noteTitle.value = '';
    noteDescription.value = '';

    // Update the display to include the new note
    displayNotes();
});

// Function to delete a note based on its index in the array
function deleteNote(index) {
    // Remove the note at the specified index from the array
    notes.splice(index, 1);

    // Save the updated notes array to local storage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Update the display to remove the deleted note
    displayNotes();
}

// Display all notes when the page is first loaded or refreshed
displayNotes();
