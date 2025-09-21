async function detectObject() {
  const imageUrl = document.getElementById("imageUrl").value;
  const output = document.getElementById("output");
  const preview = document.getElementById("preview");

  if (!imageUrl) {
    output.innerHTML = "<p style='color: red'>Please enter an image URL.</p>";
    return;
  }

  // Show image preview
  preview.innerHTML = `<img src="${imageUrl}" alt="Preview" style="max-width:300px; margin:15px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.5)">`;

  output.innerHTML = "<p>Detecting...</p>";

  try {
    const res = await fetch(`/api/detect?imageUrl=${encodeURIComponent(imageUrl)}`);
    const data = await res.json();

    if (data.status && data.labels.length > 0) {
      output.innerHTML = `
        <h2>Detected Objects:</h2>
        <ul>${data.labels.map(label => `<li>${label}</li>`).join("")}</ul>
      `;
    } else {
      output.innerHTML = "<p>No objects detected. Try another image.</p>";
    }
  } catch (err) {
    output.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}￼Enter
