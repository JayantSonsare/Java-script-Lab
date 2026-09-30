// Main students array (each student is an object)
// Start empty — students must be added by the user via the UI
let students = [];

// Helper: grade calculation
function gradeFromMarks(m) {
  if (m >= 90) return 'A+';
  if (m >= 80) return 'A';
  if (m >= 70) return 'B';
  if (m >= 60) return 'C';
  if (m >= 40) return 'D';
  return 'F';
}

// DOM refs
const tbody = document.querySelector('#studentsTable tbody');
const beforeArray = document.getElementById('beforeArray');
const afterArray = document.getElementById('afterArray');
const errorDiv = document.getElementById('error');

// initial render
renderStudents();
updateArrayViews(null);

// Render students table
function renderStudents() {
  tbody.innerHTML = '';
  students.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${s.name}</td><td>${s.marks}</td><td>${gradeFromMarks(s.marks)}</td>`;
    tbody.appendChild(tr);
  });
}

// Update array before/after views
function updateArrayViews(after) {
  beforeArray.textContent = JSON.stringify(students, null, 2);
  afterArray.textContent = after ? JSON.stringify(after, null, 2) : '[]';
}

// Validate input
function validateInput(name, marks) {
  if (!name || name.trim() === '') return 'Student name cannot be empty.';
  if (marks === '' || marks === null || isNaN(marks)) return 'Marks must be a number.';
  if (marks < 0 || marks > 100) return 'Marks must be between 0 and 100.';
  return '';
}

// Add student (also used for push/unshift)
function addStudentToArray(studentObj) {
  // This function modifies the main `students` array
  students.push(studentObj); // Demonstrating push() by default when called from Add Student
  renderStudents();
  updateArrayViews();
}

// Event: Add Student button
document.getElementById('addBtn').addEventListener('click', () => {
  const name = document.getElementById('studentName').value;
  const marks = parseFloat(document.getElementById('studentMarks').value);
  const err = validateInput(name, marks);
  if (err) { errorDiv.textContent = err; return; }
  errorDiv.textContent = '';

  // Use push() to add new student to end
  // Demonstrating push()
  students.push({ name: name.trim(), marks: marks });
  renderStudents();
  updateArrayViews();

  document.getElementById('studentName').value = '';
  document.getElementById('studentMarks').value = '';
});

// PUSH - Add a demo student (uses push())
document.getElementById('pushBtn').addEventListener('click', () => {
  const before = JSON.parse(JSON.stringify(students));
  // Demonstrating push()
  students.push({ name: 'NewStudent', marks: 50 });
  renderStudents();
  updateArrayViews(students);
  afterArray.textContent = JSON.stringify(students, null, 2);
  // show before
  beforeArray.textContent = JSON.stringify(before, null, 2);
});

// POP - Remove last (uses pop())
document.getElementById('popBtn').addEventListener('click', () => {
  const before = JSON.parse(JSON.stringify(students));
  // Demonstrating pop()
  const popped = students.pop();
  renderStudents();
  updateArrayViews(students);
  beforeArray.textContent = JSON.stringify(before, null, 2);
  afterArray.textContent = JSON.stringify(students, null, 2);
});

// UNSHIFT - add at beginning (uses unshift())
document.getElementById('unshiftBtn').addEventListener('click', () => {
  const before = JSON.parse(JSON.stringify(students));
  // Demonstrating unshift()
  students.unshift({ name: 'FirstStudent', marks: 60 });
  renderStudents();
  beforeArray.textContent = JSON.stringify(before, null, 2);
  afterArray.textContent = JSON.stringify(students, null, 2);
});

// SHIFT - remove first (uses shift())
document.getElementById('shiftBtn').addEventListener('click', () => {
  const before = JSON.parse(JSON.stringify(students));
  // Demonstrating shift()
  const shifted = students.shift();
  renderStudents();
  beforeArray.textContent = JSON.stringify(before, null, 2);
  afterArray.textContent = JSON.stringify(students, null, 2);
});

// SPLICE - remove or replace at index
document.getElementById('spliceBtn').addEventListener('click', () => {
  const idx = parseInt(document.getElementById('spliceIndex').value);
  const name = document.getElementById('spliceName').value;
  const marks = parseFloat(document.getElementById('spliceMarks').value);
  const before = JSON.parse(JSON.stringify(students));
  if (isNaN(idx) || idx < 0 || idx >= students.length) {
    alert('Enter a valid index for splice (0-based).');
    return;
  }
  // Demonstrating splice(): remove 1 and optionally insert replacement
  if (name && !isNaN(marks)) {
    students.splice(idx, 1, { name: name.trim(), marks: marks });
  } else {
    students.splice(idx, 1); // remove only
  }
  renderStudents();
  beforeArray.textContent = JSON.stringify(before, null, 2);
  afterArray.textContent = JSON.stringify(students, null, 2);
});

// SLICE - show copy/subset without modifying original
document.getElementById('sliceBtn').addEventListener('click', () => {
  const s = parseInt(document.getElementById('sliceStart').value);
  const e = parseInt(document.getElementById('sliceEnd').value);
  // Demonstrating slice(): it returns a copy
  const result = students.slice(s, e);
  renderStudents(); // original unchanged
  beforeArray.textContent = JSON.stringify(students, null, 2);
  afterArray.textContent = JSON.stringify(result, null, 2);
});

// Calculate results (max, min, avg, total, passed, map, reduce, forEach)
document.getElementById('calcBtn').addEventListener('click', () => {
  const passMark = parseFloat(document.getElementById('passMark').value) || 40;

  // Extract marks array for Math.max/Math.min and reduce
  const marksArray = students.map(s => s.marks); // Demonstrating map() to get marks array

  // MAX and MIN using Math.max/Math.min and spread operator
  const max = marksArray.length ? Math.max(...marksArray) : 0;
  const min = marksArray.length ? Math.min(...marksArray) : 0;

  // REDUCE to calculate total marks
  // Demonstrating reduce()
  const total = marksArray.reduce((acc, m) => acc + m, 0);

  const avg = marksArray.length ? (total / marksArray.length) : 0;

 
  const passed = students.filter(s => s.marks >= passMark);


  const grace = students.map(s => ({ name: s.name, marks: Math.min(100, s.marks + 5) }));

  
  const forEachList = document.getElementById('forEachList');
  forEachList.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} - ${s.marks}`;
    forEachList.appendChild(li);
  });

  
  document.getElementById('totalStudents').textContent = students.length;
  document.getElementById('totalMarks').textContent = total;
  document.getElementById('averageMarks').textContent = avg.toFixed(2);
  document.getElementById('maxMarks').textContent = max;
  document.getElementById('minMarks').textContent = min;

  
  const passedList = document.getElementById('passedList');
  passedList.innerHTML = '';
  passed.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} - ${p.marks}`;
    passedList.appendChild(li);
  });

  
  const mappedMarks = document.getElementById('mappedMarks');
  mappedMarks.innerHTML = '';
  grace.forEach(g => {
    const li = document.createElement('li');
    li.textContent = `${g.name} - ${g.marks}`;
    mappedMarks.appendChild(li);
  });

  
  document.getElementById('reducedTotal').textContent = total;

 
  updateArrayViews();
});


(function init() {

  const forEachList = document.getElementById('forEachList');
  forEachList.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} - ${s.marks}`;
    forEachList.appendChild(li);
  });
 
  const total = students.map(s=>s.marks).reduce((a,b)=>a+b,0);
  document.getElementById('reducedTotal').textContent = total;
})();