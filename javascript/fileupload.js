//javascript
//Copy code
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'YOUR_AWS_REGION'; // e.g. 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'YOUR_IDENTITY_POOL_ID',
});

const s3 = new AWS.S3();

document.getElementById('upload-btn').onclick = () => {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: file.name,
        Body: file,
        ACL: 'public-read', // adjust according to your needs
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
        } else {
            console.log('Successfully uploaded file:', data);
        }
    });
};

document.getElementById('download-btn').onclick = () => {
    const fileName = document.getElementById('file-name').value;
    const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: fileName,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.error('Error downloading file:', err);
        } else {
            const blob = new Blob([data.Body], { type: data.ContentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
};

// Logout functionality
//

document.getElementById('logout-button').addEventListener('click', function() {
    alert('Logged out successfully!');
    window.location.href = 'index.html';
	});
