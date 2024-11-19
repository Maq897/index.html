document.getElementById('add-note').addEventListener('click', addNote);

// Load notes from localStorage when the page is loaded
window.addEventListener('DOMContentLoaded', loadNotes);

function addNote(content = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    
    const textarea = document.createElement('textarea');
    textarea.value = content; // Set the textarea content if provided
    note.appendChild(textarea);

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    });
    note.appendChild(deleteBtn);
    
    document.getElementById('notes').appendChild(note);

    // Update local storage when the note content changes
    textarea.addEventListener('input', updateLocalStorage);
    
    updateLocalStorage(); // Save immediately when a new note is added
}

// Function to update the local storage with the current notes
function updateLocalStorage() {
    const notes = [];
    document.querySelectorAll('.note textarea').forEach(textarea => {
        notes.push({ content: textarea.value });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load the notes from localStorage when the page loads
function loadNotes() {
    let savedNotes = [];
    try {
        savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    } catch (e) {
        console.error('Failed to parse notes from localStorage:', e);
    }

    savedNotes.forEach(noteData => {
        addNote(noteData.content); // Use the addNote function to create notes
    });
}
