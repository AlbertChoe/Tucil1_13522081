// FileUploadPage.js
import React, { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the state with the selected file
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file before submitting.");
            return;
        }
        // Handle the file submission here. For example, send it to the backend server.
        console.log("File submitted:", file.name);
        // You might want to use FormData and fetch (or axios) to send the file to your backend.
    };

    return (
        <div className="max-w-screen-md mx-auto p-8">
            <h1 className="text-xl font-semibold mb-4">Upload TXT File</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="file:rounded file:border-0 file:py-2 file:px-4 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                    accept=".txt"
                />
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default FileUpload;