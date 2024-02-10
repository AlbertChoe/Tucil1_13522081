import React, { useState } from 'react';

function Form() {
    const [bufferSize, setBufferSize] = useState('');
    const [matrix, setMatrix] = useState('');
    const [sequences, setSequences] = useState('');

    
    const handleSubmit = (e) => {
            e.preventDefault();
            // Handle the form submission here.
            console.log({ bufferSize, matrix, sequences });
        };
    
    return (
        <div className="max-w-screen-xl w-full h-screen bg-slate-100 rounded-xl p-16 m-auto">
            <form onSubmit={handleSubmit} className="">
                <div className='grid grid-cols-2 gap-7'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="bufferSize" className="block text-sm font-medium text-gray-700">Buffer Size</label>
                        <input
                            type="number"
                            id="bufferSize"
                            value={bufferSize}
                            onChange={(e) => setBufferSize(e.target.value)}
                            min="1"  // Restricts input to positive numbers only
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-12 text-lg p-2"
                        />
                        
                        <label htmlFor="matrix" className="block text-sm font-medium text-gray-700">Matrix (comma-separated)</label>
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
        </div>
    );
};

export default Form;