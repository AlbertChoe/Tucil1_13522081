import React, { useState } from 'react';

function AutoForm() {
    const [bufferSize, setBufferSize] = useState('');
    const [uniqueTokens, setUniqueTokens] = useState('');
    const [sequencesAmount, setSequencesAmount] = useState('');
    const [maxSequenceSize, setMaxSequenceSize] = useState('');
    const [matrixWidth, setMatrixWidth] = useState('');
    const [matrixHeight, setMatrixHeight] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        const requestData = {
            bufferSize: parseInt(bufferSize, 10),
            uniqueTokens: uniqueTokens.trim().split(/\s+/),
            sequencesAmount: parseInt(sequencesAmount, 10),
            maxSequenceSize: parseInt(maxSequenceSize, 10),
            matrixSize: { width: parseInt(matrixWidth, 10), height: parseInt(matrixHeight, 10) },
        };
        

        try {
            const response = await fetch('http://localhost:5000/autoSolve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resultData = await response.json();
            setResult(resultData);
        } catch (error) {
            console.error("Failed to auto-generate and solve:", error);
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
        <div className="max-w-screen-xl w-full h-fit bg-slate-100 rounded-xl px-16 pb-16 pt-10 m-auto">
            <h1 className='md:w-1/2 w-10/12  text-3xl mb-10 mx-auto '>Auto Generate Matrix and Sequence</h1>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 gap-7">
            <div className='flex flex-col w-full '>
                    <label htmlFor="bufferSize" className="block text-sm font-medium text-gray-700">Buffer Size</label>
                    <input
                        type="number"
                        id="bufferSize"
                        value={bufferSize}
                        onChange={(e) => setBufferSize(e.target.value)}
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                    />
                </div>
                <div className='flex flex-col w-full '>
                    <label htmlFor="uniqueTokens" className="block text-sm font-medium text-gray-700">Unique Tokens (space-separated)</label>
                    <input
                        type="text"
                        id="uniqueTokens"
                        value={uniqueTokens}
                        onChange={(e) => setUniqueTokens(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                    />
                </div>
                <div className='flex flex-col w-full '>
                    <label htmlFor="sequencesAmount" className="block text-sm font-medium text-gray-700">Sequences Amount</label>
                    <input
                        type="number"
                        id="sequencesAmount"
                        value={sequencesAmount}
                        onChange={(e) => setSequencesAmount(e.target.value)}
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                    />
                </div>
                <div className='flex flex-col w-full '>
                    <label htmlFor="maxSequenceSize" className="block text-sm font-medium text-gray-700">Maximal Size for Sequence</label>
                    <input
                        type="number"
                        id="maxSequenceSize"
                        value={maxSequenceSize}
                        onChange={(e) => setMaxSequenceSize(e.target.value)}
                        min="2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                    />
                </div>
                <div className='flex flex-col w-full '>
                    <label htmlFor="matrixSize" className="block text-sm font-medium text-gray-700">Matrix Size (Width X Height)</label>
                    <div className='flex gap-2'>
                        <input
                            type="number"
                            id="matrixWidth"
                            placeholder="Width"
                            value={matrixWidth}
                            onChange={(e) => setMatrixWidth(e.target.value)}
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                        />
                        <input
                            type="number"
                            id="matrixHeight"
                            placeholder="Height"
                            value={matrixHeight}
                            onChange={(e) => setMatrixHeight(e.target.value)}
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full justify-center mt-10 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Generate & Solve
                </button>
            </form>
            {result && (
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

export default AutoForm;
