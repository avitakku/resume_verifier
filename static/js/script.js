// Add a 'submit' event listener to a form that sends an asynchronous POST request
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page
    const formData = new FormData(e.target); // Create FormData object from the submitted form
    const resultElement = document.getElementById('result'); // Get the result element to display messages
    fetch('/delete-files', { method: 'POST'}); // Send a POST request to delete existing files on the server
    
    // Check if files have been uploaded
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const filesUploaded = Array.from(fileInputs).every(input => input.files.length > 0);
    
    if (!filesUploaded) {
        resultElement.textContent = "Please upload 2 files!";
        return;
    }
    
    resultElement.classList.add('loading'); // Add loading class to show loading animation
    resultElement.innerHTML = `
        <div class="loading-content">
            <p>Comparing resume against job description...</p>
            <div class="spinner"></div>
        </div>
    `; // Display loading content
    
    // Send a POST request to the form's action URL with the form data
    const response = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
    });
    
    // Convert response to JSON and update the result element
    const result = await response.json();
    resultElement.classList.remove('loading'); 
    resultElement.innerHTML = result;   
});

// Add click event listeners to navigation tabs
document.querySelectorAll('nav ul li a').forEach((tab) => {
    tab.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default navigation
        document.querySelectorAll('nav ul li a').forEach((tab) => {
            tab.classList.remove('active'); // Remove active class from all tabs
        });
        event.target.classList.add('active'); // Add active class to clicked tab
        document.querySelectorAll('div#resumeComparison, div#uploadedFiles').forEach((content) => {
            content.style.display = 'none'; // Hide all content containers
        });
        document.querySelector(`div${event.target.getAttribute('href')}`).style.display = 'block'; // Show clicked tab's content
    });
});

// Add a 'beforeunload' event listener to send a POST request to delete files when the page is unloaded
window.addEventListener('beforeunload', (event) => {
    fetch('/delete-files', { method: 'POST'});
});

// Add a click event listener to create a download link for the result text
document.getElementById('downloadButton').addEventListener('click', function() {
    const resultElement = document.getElementById('result');
    const resultText = resultElement.textContent;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadButton');
    downloadLink.href = url;
});

// Add event listeners to file inputs to show a success message when files are uploaded
document.addEventListener('DOMContentLoaded', () => {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
          const fileNames = Array.from(files).map(file => file.name);
          const messageElement = event.target.nextElementSibling;
          messageElement.textContent = `Files successfully uploaded: ${fileNames.join(', ')}`;
        }
      });
    });
  });

// Render uploaded files when the corresponding tab is clicked
document.addEventListener('DOMContentLoaded', () => {
    const uploadedFilesTab = document.querySelector('li a[href="#uploadedFiles"]');
    uploadedFilesTab.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Fetch HTML content and render it in the uploadedFiles container
      fetch('/render-uploaded-files')
        .then(response => response.text())
        .then(html => {
          const uploadedFilesContainer = document.getElementById('uploadedFiles');
          uploadedFilesContainer.innerHTML = html;
        })
        .catch(error => {
          console.error('Error rendering uploaded files:', error);
        });
    });
  });

