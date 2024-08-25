document.getElementById('add-note').addEventListener('click', addNote);

function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    
    const textarea = document.createElement('textarea');
    note.appendChild(textarea);
    
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => note.remove());
    note.appendChild(deleteBtn);
    
    document.getElementById('notes').appendChild(note);
}