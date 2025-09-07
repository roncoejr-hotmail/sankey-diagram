document.getElementById('add_relationship').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(event.target); // Collect form data
  const data = Object.fromEntries(formData.entries()); // Convert to JSON-friendly object

  try {
	 const response = await fetch('http://127.0.0.1:5000/dataEp-sqlite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send JSON data
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Success:', result);
	   // alert(result)
	   location.reload(true);
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
});
