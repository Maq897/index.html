document.getElementById('add-note').addEventListener('click', addNote);

// Load notes from localStorage when the page is loaded
window.addEventListener('DOMContentLoaded', loadNotes);

function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    
    const textarea = document.createElement('textarea');
    note.appendChild(textarea);
    
    // Set the textarea content from localStorage if available (for editing existing notes)
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    textarea.value = savedNotes.length > 0 ? savedNotes[savedNotes.length - 1].content : '';

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
    
    // Function to update the local storage with the current notes
    function updateLocalStorage() {
        const notes = [];
        document.querySelectorAll('.note textarea').forEach(textarea => {
            notes.push({ content: textarea.value });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

// Function to load the notes from localStorage when the page loads
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(noteData => {
        const note = document.createElement('div');
        note.classList.add('note');
        
        const textarea = document.createElement('textarea');
        textarea.value = noteData.content;
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
        
        textarea.addEventListener('input', updateLocalStorage);
    });
}


