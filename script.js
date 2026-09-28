let students = [];
let editingId = null;

window.addEventListener('DOMContentLoaded', () => {
    loadStudentsFromStorage();
    viewAllStudents();
});

document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = parseInt(document.getElementById('id').value);
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const marks = parseFloat(document.getElementById('marks').value);

    if (students.some(s => s.id === id)) {
        alert('Student ID already exists!');
        return;
    }

    students.push({ id, name, course, marks });
    saveStudentsToStorage();
    document.getElementById('addForm').reset();
    viewAllStudents();
    showMessage('Student added successfully!', 'success');
});

function viewAllStudents() {
    const listDiv = document.getElementById('studentList');

    if (students.length === 0) {
        listDiv.innerHTML = '<div class="empty-message">No students in the system yet</div>';
        return;
    }

    listDiv.innerHTML = students.map(student => `
        <div class="student-card">
            <div><strong>ID:</strong> ${student.id}</div>
            <div><strong>Name:</strong> ${student.name}</div>
            <div><strong>Course:</strong> ${student.course}</div>
            <div><strong>Marks:</strong> ${student.marks}</div>
        </div>
    `).join('');
}

function searchStudent() {
    const searchId = parseInt(document.getElementById('searchId').value);
    const resultDiv = document.getElementById('searchResult');

    if (!searchId) {
        resultDiv.innerHTML = '<div class="result error">Please enter a valid ID</div>';
        return;
    }

    const student = students.find(s => s.id === searchId);

    if (student) {
        resultDiv.innerHTML = `
            <div class="result success">
                <strong>ID:</strong> ${student.id}<br>
                <strong>Name:</strong> ${student.name}<br>
                <strong>Course:</strong> ${student.course}<br>
                <strong>Marks:</strong> ${student.marks}
            </div>
        `;
    } else {
        resultDiv.innerHTML = '<div class="result error">Student not found!</div>';
    }
}

function loadForUpdate() {
    const updateId = parseInt(document.getElementById('updateId').value);

    if (!updateId) {
        alert('Please enter a valid ID');
        return;
    }

    const student = students.find(s => s.id === updateId);

    if (!student) {
        alert('Student not found!');
        return;
    }

    editingId = updateId;
    document.getElementById('updateName').value = student.name;
    document.getElementById('updateCourse').value = student.course;
    document.getElementById('updateMarks').value = student.marks;
    document.getElementById('updateForm').style.display = 'grid';
}

document.getElementById('updateForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const student = students.find(s => s.id === editingId);

    if (student) {
        student.name = document.getElementById('updateName').value;
        student.course = document.getElementById('updateCourse').value;
        student.marks = parseFloat(document.getElementById('updateMarks').value);

        saveStudentsToStorage();
        viewAllStudents();
        cancelUpdate();
        showMessage('Student updated successfully!', 'success');
    }
});

function cancelUpdate() {
    editingId = null;
    document.getElementById('updateForm').style.display = 'none';
    document.getElementById('updateId').value = '';
    document.getElementById('updateForm').reset();
}

function deleteStudent() {
    const deleteId = parseInt(document.getElementById('deleteId').value);

    if (!deleteId) {
        alert('Please enter a valid ID');
        return;
    }

    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== deleteId);
        saveStudentsToStorage();
        document.getElementById('deleteId').value = '';
        viewAllStudents();
        showMessage('Student deleted successfully!', 'success');
    }
}

function saveStudentsToStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudentsFromStorage() {
    const data = localStorage.getItem('students');
    students = data ? JSON.parse(data) : [];
}

function showMessage(msg, type) {
    const resultDiv = document.getElementById('searchResult');
    resultDiv.innerHTML = `<div class="result ${type}">${msg}</div>`;
    setTimeout(() => {
        resultDiv.innerHTML = '';
    }, 3000);
}
