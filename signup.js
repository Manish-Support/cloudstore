// Function to generate a random captcha text
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters[randomIndex];
    }
    return captcha;
}

// Display the captcha text on the signup page
const captchaTextElement = document.getElementById('captcha-text');
let currentCaptcha = generateCaptcha();
captchaTextElement.textContent = currentCaptcha;

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const captchaInput = document.getElementById('captcha').value;

    if (username && password && email && contact && captchaInput) {
        if (captchaInput === currentCaptcha) {
            try {
                const response = await fetch('signup.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&contact=${encodeURIComponent(contact)}`
                });

                if (response.ok) {
                    alert('Signup successful!');
                    window.location.href = 'fileupload.html';
                } else {
                    const errorText = await response.text();
                    alert(`Signup failed: ${errorText}`);
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        } else {
            alert('Captcha incorrect. Please try again.');
        }
    } else {
        alert('Please fill out all fields.');
    }

    // Generate a new captcha for the next attempt
    currentCaptcha = generateCaptcha();
    captchaTextElement.textContent = currentCaptcha;
});
