document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        console.log(`Login details: username=${username}, password=${password}`);
        alert('Login successful!');
	window.location.href = 'fileupload.html';
    } else {
        alert('Please fill out both fields.');
    }
    console.log("Form submitted");
});

// Make sure other script functions are working fine and not interfering with login

