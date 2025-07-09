document.getElementById("recipe-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const recipeName = document.getElementById("recipeName").value;
  const steps = document.getElementById("steps").value
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);
  const station = document.getElementById("station").value;

  try {
    const res = await fetch("https://mep-api-7pph.onrender.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name: recipeName, steps, station })
    });

    const data = await res.json();
    document.getElementById("response").innerText =
      data.message || "✅ Recipe submitted!";
  } catch (err) {
    document.getElementById("response").innerText = "❌ Error submitting recipe.";
  }
});
