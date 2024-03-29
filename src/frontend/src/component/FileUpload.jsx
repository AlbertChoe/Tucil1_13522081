import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        setResult(null);
        if (!file) {
            alert("Please select a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resultData = await response.json();
            setResult(resultData); 
        } catch (error) {
            console.error("Failed to upload the file:", error);
        }finally {
            setIsLoading(false); // Finish loading
        }
    };
    const downloadResults = () => {
        if (!result) return;
    
        // Preparing the content for the best path, considering the adjustments
        const bestPathFormatted = result.bestTrimmedPath.map(pos => `${pos[0]}, ${pos[1]}`).join('\n');
    
        const content = [
            `${result.bestReward}`,
            `${result.bestTrimmedPathTokens.join(' ')}`,
            bestPathFormatted,' ',
            `${result.timeTaken} ms`
        ].join('\n');
    
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    
        const fileUrl = URL.createObjectURL(blob);
    
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'results.txt'; // The default filename for the download
        document.body.appendChild(link); // Required for Firefox
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
        URL.revokeObjectURL(fileUrl); // Free up resources
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
            {isLoading ? (
                <LoadingIndicator/> // Your loading indicator
            ) :
            result && (
                <>
                    <div className="mt-8 p-4 border rounded shadow-lg bg-white">
                        <h3 className="text-lg font-semibold">Matrix</h3>
                        {result.matrix ? result.matrix.map((row, index) => (
                            <div key={index}>{row.join(' ')}</div>
                        )) : <p>Loading...</p>}
                    </div>
                    <div className="mt-4 p-4 border rounded shadow-lg bg-white">
                        <h3 className="text-lg font-semibold">Sequences with Rewards</h3>
                        {result.sequences ? result.sequences.map((seq, index) => (
                            <div key={index}>{seq.sequence} - Reward: {seq.reward}</div>
                        )) : <p>Loading...</p>}
                    </div>


                    <div className="mt-4 p-4 border rounded shadow-lg bg-white">
                        <h3 className="text-lg font-semibold">Result</h3>
                        <p><strong>Best Reward:</strong> {result.bestReward}</p>
                        <p><strong>Best Path Tokens:</strong> {result.bestTrimmedPathTokens.join(' -> ')}</p>
                        <p><strong>Best Path:</strong> [{result.bestTrimmedPath.join('], [')}]</p>
                        <p><strong>Time Taken:</strong> {result.timeTaken} ms</p>
                        <button
                            onClick={downloadResults}
                            className="mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Download Results
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default FileUpload;
