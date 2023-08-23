# Resume Verifier

## Set up:

**Step 1:** 
Install [Python](https://www.python.org/downloads/) if you don't have it already

### Getting and setting variables:

Get OpenAI API key from the [OpenAI website](https://openai.com/blog/openai-api)

For the app.secret_key, pick any long string that is hard to guess

### API Key safety:

Follow these [steps](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) OR

Create a config.py file with the following code:
```
api_key = INSERT_YOUR_ACTUAL_API_KEY_HERE
secret_key = INSERT_YOUR_ACTUAL_SECRET_KEY_HERE
```
And update your server.py file with the following code:
```
openai.api_key = config.api_key
app.secret_key = config.secret_key
```
## Running the code:
**Step 1:**
Download all requirements from the requirements.txt file

**Step 2:**
To run the code locally, run the following command in your Command Line Interface (ensure you are in the directory where all the files are present):
```
  python server.py
```

**Step 3:**
Open the link that shows up in your browser!

## Azure Blob Storage Info:
**SAS Token:** 
In the file server.py, in the function save_file_to_azure(), I am using a SAS URL (line 43) to upload the files to a blob container. This URL is only valid for a year, after which a new URL needs to be generated.

You can generate a new SAS url by following these [steps](https://docs.informatica.com/integration-cloud/data-integration-connectors/h2l/1679-prerequisites-to-create-a-microsoft-azure-blob-storage-v3-c/prerequisites-to-create-a-microsoft-azure-blob-storage-v3-connec/get-credentials-for-shared-access-signature-authentication/get-sas-token-for-the-container/get-sas-token-from-the-azure-portal.html)

## Info on files:
**server.py:** Back end server file that manages the server-side logic of the application, such as handling HTTP requests and responses, extracting text from resume and job description, making API calls. I am using Flask.

**index.html:** The main HTML file that defines the structure and content of the web page. Controls the layout of the forms, buttons, navigation tabs etc. 

**uploaded_files.html:** HTML file that defines the structure of the 'uploaded files' tab.

**script.js:** Front-end JavaScript file that adds interactivity to the web page. Handles form submissions, file uploads, interactions with tabs.

**style.css** Defines the styling of the HTML content. 

