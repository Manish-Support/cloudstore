document.getElementById('logout-button').addEventListener('click', function(event) {
    event.preventDefault();

    alert('Proceed to Logout!');
    console.log("Logout success!");
    window.location.href = 'index.html';
});
