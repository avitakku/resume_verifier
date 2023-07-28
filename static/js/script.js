document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const resultElement = document.getElementById('result');
    fetch('/delete-files', { method: 'POST'});
    fetch('/remove-images', { method: 'POST'})
        .then(response => {
            if (response.ok) {
                // Remove the previous word cloud images
                document.querySelector('#resumeWordCloud').innerHTML = '';
                document.querySelector('#jobdescWordCloud').innerHTML = '';
            }
        });
    
    // Check if files have been uploaded
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const filesUploaded = Array.from(fileInputs).every(input => input.files.length > 0);
    
    if (!filesUploaded) {
        resultElement.textContent = "Please upload 2 files!";
        return;
    }
    
    resultElement.classList.add('loading'); 
    resultElement.innerHTML = `
        <div class="loading-content">
            <p>Comparing resume against job description...</p>
            <div class="spinner"></div>
        </div>
    `;
    
    const response = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
    });
    
    const result = await response.json();
    resultElement.classList.remove('loading'); 
    resultElement.innerHTML = result;

    // Enable the "Generate Wordclouds" button
    wordcloudButton.disabled = false;

    document.getElementById('wordcloudButton').addEventListener('click', function() {
        // Fetch the resume wordcloud image
        fetch('/api/get_resume_wordcloud')
            .then(response => {
                if (response.ok) {
                    response.blob().then(blob => {
                        let container = document.querySelector('#resumeWordCloud');
                        // Remove any existing images
                        while (container.firstChild) {
                            container.firstChild.remove();
                        }
                        // Create a new title
                        let title = document.createElement('h2');
                        title.textContent = "Resume Wordcloud";
                        container.appendChild(title);
                        // Create a new image
                        let img = document.createElement('img');
                        img.src = URL.createObjectURL(blob);
                        img.alt = "Resume Wordcloud";
                        container.appendChild(img);

                        console.log(response)
                    });
                }
            });
    
        // Fetch the job description wordcloud image
        fetch('/api/get_jobdesc_wordcloud')
            .then(response => {
                if (response.ok) {
                    response.blob().then(blob => {
                        let container = document.querySelector('#jobdescWordCloud');
                        // Remove any existing images
                        while (container.firstChild) {
                            container.firstChild.remove();
                        }
                        // Create a new title
                        let title = document.createElement('h2');
                        title.textContent = "Job Description Wordcloud";
                        container.appendChild(title);
                        // Create a new image
                        let img = document.createElement('img');
                        img.src = URL.createObjectURL(blob);
                        img.alt = "Job Description Wordcloud";
                        container.appendChild(img);
                        console.log(response)
                    });
                }
            });
    });    
});

document.querySelectorAll('nav ul li a').forEach((tab) => {
    tab.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelectorAll('nav ul li a').forEach((tab) => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        document.querySelectorAll('div#resumeComparison, div#wordClouds, div#uploadedFiles').forEach((content) => {
            content.style.display = 'none';
        });
        document.querySelector(`div${event.target.getAttribute('href')}`).style.display = 'block';

        if (event.target.id === 'wordCloudLink') {
                // Fetch the resume wordcloud image
            fetch('/api/get_resume_wordcloud')
            .then(response => {
                if (response.ok) {
                    response.blob().then(blob => {
                        let container = document.querySelector('#resumeWordCloud');
                        // Remove any existing images
                        while (container.firstChild) {
                            container.firstChild.remove();
                        }
                        // Create a new title
                        let title = document.createElement('h2');
                        title.textContent = "Resume Wordcloud";
                        container.appendChild(title);
                        // Create a new image
                        let img = document.createElement('img');
                        img.src = URL.createObjectURL(blob);
                        img.alt = "Resume Wordcloud";
                        container.appendChild(img);
                        console.log(response)
                    });
                }
            });

            // Fetch the job description wordcloud image
            fetch('/api/get_jobdesc_wordcloud')
                .then(response => {
                    if (response.ok) {
                        response.blob().then(blob => {
                            let container = document.querySelector('#jobdescWordCloud');
                            // Remove any existing images
                            while (container.firstChild) {
                                container.firstChild.remove();
                            }
                            // Create a new title
                            let title = document.createElement('h2');
                            title.textContent = "Job Description Wordcloud";
                            container.appendChild(title);
                            // Create a new image
                            let img = document.createElement('img');
                            img.src = URL.createObjectURL(blob);
                            img.alt = "Job Description Wordcloud";
                            container.appendChild(img);
                            console.log(response)
                        });
                    }
                });
        }
    });
});

window.addEventListener('beforeunload', (event) => {
    navigator.sendBeacon("/remove-images");
    fetch('/delete-files', { method: 'POST'});
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const resultElement = document.getElementById('result');
    const resultText = resultElement.textContent;
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadButton');
    downloadLink.href = url;
});

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
  
/*// Check if the "Upload Files" tab is clicked
const uploadedFilesTab = document.querySelector('#uploadedFiles');
uploadedFilesTab.addEventListener('click', () => {
  // Render a new HTML file with the uploaded files
  fetch('/render-uploaded-files')
      .then(response => response.text())
      .then(html => {
          const uploadedFilesContainer = document.getElementById('uploadedFiles');
          uploadedFilesContainer.innerHTML = html;
      })
      .catch(error => {
          console.error('Error rendering uploaded files:', error);
      });
});*/

document.addEventListener('DOMContentLoaded', () => {
    const uploadedFilesTab = document.querySelector('li a[href="#uploadedFiles"]');
    uploadedFilesTab.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Render a new HTML file with the uploaded files
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
