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

    if (res.ok) {
      document.getElementById('cleaning-form').reset();
      loadCleaningTasks();
    } else {
      alert('❌ Error saving cleaning task.');
    }
  } catch (err) {
    alert('❌ Server error saving cleaning task.');
  }
});

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
    document.getElementById('response').innerText =
      data.message || '✅ Recipe submitted!';
  } catch (err) {
    document.getElementById('response').innerText = '❌ Error submitting recipe.';
  }
});
