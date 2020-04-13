document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const body = document.getElementById('fbody').value.trim();

  const data = {
    name,
    email,
    body
  };

  fetch('/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("success:", data);
    })
    .catch((err) => {
      console.log('error:', err)
    });

});
