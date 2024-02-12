import React, { useState } from 'react';

function Form() {
    const [bufferSize, setBufferSize] = useState('');
    const [matrix, setMatrix] = useState('');
    const [sequences, setSequences] = useState('');
    const [result, setResult] = useState(null); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        const matrixRows = matrix.trim().split('\n').map(row => row.trim().split(/\s+/));
        const sequenceLines = sequences.trim().split('\n');
        const sequencePairs = [];
        for (let i = 0; i < sequenceLines.length; i += 2) {
            sequencePairs.push({
                sequence: sequenceLines[i].trim().split(/\s+/),
                reward: parseInt(sequenceLines[i + 1], 10)
            });
        }

        try {
            const response = await fetch('http://localhost:5000/solveHome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bufferSize: parseInt(bufferSize, 10),
                    matrix: matrixRows,
                    sequences: sequencePairs
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const resultData = await response.json();
            setResult(resultData);  
            console.log(resultData);
            
        } catch (error) {
            console.error("Failed to solve the algorithm:", error);
            setResult(result);
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
        <div className="max-w-screen-xl w-full h-fit bg-slate-100 rounded-xl p-16 m-auto">
            <form onSubmit={handleSubmit} className="">
                <div className='grid md:grid-cols-2 grid-cols-1  gap-7'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="bufferSize" className="block text-sm font-medium text-gray-700">Buffer Size</label>
                        <input
                            type="number"
                            id="bufferSize"
                            value={bufferSize}
                            onChange={(e) => setBufferSize(e.target.value)}
                            min="1"  
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                        />
                        
                        <label htmlFor="matrix" className="block text-sm font-medium text-gray-700">Matrix (space-separated)</label>
                        <textarea
                            id="matrix"
                            value={matrix}
                            onChange={(e) => setMatrix(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none h-60 text-lg p-2"  // Fixed size and made input bigger
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div>
                            <label htmlFor="sequences" className="block text-sm font-medium text-gray-700">Sequences with Rewards (space-separated)</label>
                            <textarea
                                id="sequences"
                                value={sequences}
                                onChange={(e) => setSequences(e.target.value)}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none h-60 text-lg p-2"  // Fixed size and made input bigger
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full justify-center mt-10 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Solve
                </button>
            </form>
            {result && (
                <div className="mt-8 p-4 border rounded shadow-lg bg-white  ">
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
                
            )}
        </div>
    );
};

export default Form;