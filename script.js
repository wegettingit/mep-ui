
document.getElementById("recipe-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const recipeName = document.getElementById("recipeName").value;
  const steps = document.getElementById("steps").value.split(",");
  const station = document.getElementById("station").value;

  const res = await fetch("https://mep-backend.onrender.com/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: recipeName, steps, station })
  });

  const data = await res.json();
  document.getElementById("response").innerText = data.message || "Recipe submitted!";
});
