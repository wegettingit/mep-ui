const BASE_URL = 'https://mep-api-7pph.onrender.com';

// Auth Functions
async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const accessKey = document.getElementById('accessKey').value;
  const station = document.getElementById('stationInput').value;

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, accessKey, station })
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert('Registration failed');
  }
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('station', data.station);
      showApp();
      loadWhiteboard();
      loadRecipes();
      loadCleaningTasks();
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Login failed');
  }
}

function logout() {
  localStorage.clear();
  window.location.reload();
}

function showApp() {
  document.getElementById('auth-section').classList.add('hidden');
  document.getElementById('app-section').classList.remove('hidden');
  document.getElementById('station').value = localStorage.getItem('station') || '';
}

// Whiteboard Functions
document.getElementById('whiteboard-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const todayPrep = document.getElementById('todayPrep').value;
  const tomorrowPrep = document.getElementById('tomorrowPrep').value;

  try {
    const res = await fetch(`${BASE_URL}/whiteboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ todayPrep, tomorrowPrep })
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.message || 'Error saving whiteboard');
    }
  } catch (err) {
    alert('Server error saving whiteboard.');
    console.error(err);
  }
});

async function loadWhiteboard() {
  try {
    const res = await fetch(`${BASE_URL}/whiteboard`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    document.getElementById('todayPrep').value = data.todayPrep || '';
    document.getElementById('tomorrowPrep').value = data.tomorrowPrep || '';
  } catch (err) {
    console.error('Error loading whiteboard:', err);
  }
}

// Recipe Functions
document.getElementById('recipe-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('recipeName').value;
  const steps = document.getElementById('steps').value;
  const station = document.getElementById('station').value;

  try {
    const res = await fetch(`${BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, steps, station })
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('response').innerText = `✅ ${data.message || 'Recipe submitted!'}`;
      document.getElementById('recipe-form').reset();
      loadRecipes();
    } else {
      document.getElementById('response').innerText = `❌ ${data.message || 'Error submitting recipe.'}`;
    }
  } catch (err) {
    document.getElementById('response').innerText = '❌ Server error submitting recipe.';
    console.error(err);
  }
});

async function loadRecipes() {
  try {
    const res = await fetch(`${BASE_URL}/recipes`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const recipes = await res.json();
    const container = document.getElementById('savedRecipes');
    container.innerHTML = '';
    recipes.forEach(r => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `
        <h3>${r.name}</h3>
        <div class="recipe-content">${parseMarkdown(r.steps)}</div>
        <p>Station: ${r.station}</p>
        <button class="delete-btn" onclick="deleteRecipe('${r._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading recipes:', err);
  }
}

async function deleteRecipe(id) {
  try {
    const res = await fetch(`${BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    alert(data.message);
    loadRecipes();
  } catch (err) {
    alert('Delete failed');
  }
}

// Cleaning Functions
document.getElementById('cleaning-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
    const res = await fetch(`${BASE_URL}/cleaning`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('cleaning-form').reset();
      loadCleaningTasks();
      alert('✅ Cleaning task saved');
    } else {
      alert(`❌ ${data.message || 'Error saving cleaning task'}`);
    }
  } catch (err) {
    alert('❌ Server error saving cleaning task.');
    console.error(err);
  }
});

async function loadCleaningTasks() {
  try {
    const res = await fetch(`${BASE_URL}/cleaning`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const tasks = await res.json();
    const container = document.getElementById('cleaningTasks');
    container.innerHTML = '';
    tasks.forEach(t => {
      const div = document.createElement('div');
      div.className = 'cleaning-task';
      div.innerHTML = `
        <h3>${t.task}</h3>
        <p>Assigned to: ${t.assignedTo}</p>
        <button class="delete-btn" onclick="deleteCleaningTask('${t._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading cleaning tasks:', err);
  }
}

async function deleteCleaningTask(id) {
  try {
    const res = await fetch(`${BASE_URL}/cleaning/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    alert(data.message);
    loadCleaningTasks();
  } catch (err) {
    alert('Delete failed');
  }
}

// Simple Markdown Parser
function parseMarkdown(text) {
  return text
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}

// Load data if logged in
if (localStorage.getItem('token')) {
  loadWhiteboard();
  loadRecipes();
  loadCleaningTasks();
}