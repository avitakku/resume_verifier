# Installation Guide for Resume Verifier

Follow these steps to get Resume Verifier up and running on your local machine.

## Set up

###  Install Python
If you don't have Python installed, you can download it from the [official website](https://www.python.org/downloads/).

## Getting and Setting Variables

### OpenAI API Key
Get OpenAI API key from the [OpenAI website](https://openai.com/blog/openai-api).

### App Secret Key
For the `app.secret_key`, pick any long string that is hard to guess.

## API Key Safety
You can follow these [steps](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety) or create a `config.py` file with the following code:
```python
api_key = INSERT_YOUR_ACTUAL_API_KEY_HERE
secret_key = INSERT_YOUR_ACTUAL_SECRET_KEY_HERE
```
## Azure Blob Storage Info:

### Blob Storage:
I am using Azure Blob Storage to store and display the uploaded files on my website. You can create an Azure storage account by following these [steps](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)

### SAS Token:
In the file server.py, in the function save_file_to_azure(), I am using a SAS URL (line 43) to upload the files to a blob container. You can generate a SAS url for your Azure storage container by following these [steps](https://docs.informatica.com/integration-cloud/data-integration-connectors/h2l/1679-prerequisites-to-create-a-microsoft-azure-blob-storage-v3-c/prerequisites-to-create-a-microsoft-azure-blob-storage-v3-connec/get-credentials-for-shared-access-signature-authentication/get-sas-token-for-the-container/get-sas-token-from-the-azure-portal.html).


## Running the code:

### Step 1:
Download all requirements from the requirements.txt file.

### Step 2:
To run the code locally, run the following command in your Command Line Interface (ensure you are in the directory where all the files are present):
```python
python server.py
```
### Step 3:
Open the link that shows up in your browser!

## Info on files:
- **server.py:** Back-end server file.
- **index.html:** Main HTML file.
- **uploaded_files.html:** HTML for 'uploaded files' tab.
- **script.js:** Front-end JavaScript file.
- **style.css:** Styling file.
