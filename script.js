const BASE_URL = 'https://mep-api-7pph.onrender.com';

// 🧽 Save Cleaning Task
document.getElementById('cleaning-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value
  };

  try {
    const res = await fetch(`${BASE_URL}/cleaning`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(task)
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

// 🍳 Save Recipe
document.getElementById('recipe-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const recipeName = document.getElementById('recipeName').value;
  const steps = document.getElementById('steps').value
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
  const station = document.getElementById('station').value;

  try {
    const res = await fetch(`${BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name: recipeName, steps, station })
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById('response').innerText = `✅ ${data.message || 'Recipe submitted!'}`;
      document.getElementById('recipe-form').reset();
    } else {
      document.getElementById('response').innerText = `❌ ${data.message || 'Error submitting recipe.'}`;
    }
  } catch (err) {
    document.getElementById('response').innerText = '❌ Server error submitting recipe.';
    console.error(err);
  }
});

// 🧠 Load Whiteboard
function loadWhiteboard() {
  const token = localStorage.getItem('token');
  if (!token) return;

  fetch(`${BASE_URL}/whiteboard`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('todayPrep').value = data.todayPrep || '';
    document.getElementById('tomorrowPrep').value = data.tomorrowPrep || '';
  })
  .catch(err => {
    console.error('❌ Error loading whiteboard:', err);
    alert('⚠️ Error loading whiteboard');
  });
}

// 💾 Save Whiteboard
function saveWhiteboard(e) {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('❌ You must be logged in to save.');
    return;
  }

  const today = document.getElementById('todayPrep').value;
  const tomorrow = document.getElementById('tomorrowPrep').value;

  fetch(`${BASE_URL}/whiteboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ todayPrep: today, tomorrowPrep: tomorrow })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      alert(`✅ ${data.message}`);
    } else {
      throw new Error('Unexpected response');
    }
  })
  .catch(err => {
    console.error('❌ Error saving whiteboard:', err);
    alert('❌ Error saving whiteboard');
  });
}

// 🔘 Bind whiteboard form
document.getElementById('whiteboard-form').addEventListener('submit', saveWhiteboard);

// 📦 Load initial data if logged in
if (localStorage.getItem('token')) {
  loadCleaningTasks?.();
  loadWhiteboard();
}
});
