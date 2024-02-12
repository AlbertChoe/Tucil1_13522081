function HowToUse() {
    return (
        <div className="max-w-screen-md mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-4">How to Use</h1>
            <p className="mb-4">This guide will help you understand how to use the Cyberpunk 2077 Breach Protocol Solver through our web interface as well as via an input text file.</p>
            
            <h2 className="text-xl font-semibold mb-2">Web Interface</h2>
            <ol className="list-decimal pl-5 mb-6">
                <li>Input the buffer size in the designated field.</li>
                <li>Enter the matrix by specifying each row of tokens, separated by spaces.</li>
                <li>Define sequences along with their respective rewards, one per line followed by its reward on the next line.</li>
                <li>Click on the "Solve" button to process your input and display the results.</li>
            </ol>

            <h2 className="text-xl font-semibold mb-2">Input Text File Format</h2>
            <p className="mb-4">If you prefer to upload a text file, please follow this format:</p>
            <pre className="bg-gray-100 rounded p-4 mb-4">
{`buffer_size
matrix_width matrix_height
matrix_row_1
matrix_row_2
...
matrix_row_n
number_of_sequences
sequence_1
sequence_1_reward
sequence_2
sequence_2_reward
...
sequence_n
sequence_n_reward`}
            </pre>
            <p className="mb-4">Here's a brief explanation of each part:</p>
            <ul className="list-disc pl-5 mb-6">
                <li><strong>buffer_size:</strong> The maximum number of tokens that can be sequentially arranged.</li>
                <li><strong>matrix_width matrix_height:</strong> The dimensions of the matrix containing the tokens.</li>
                <li><strong>matrix_row_x:</strong> Each row of the matrix, with tokens separated by spaces.</li>
                <li><strong>number_of_sequences:</strong> The number of sequences you wish to match within the matrix.</li>
                <li><strong>sequence_x:</strong> The specific sequence of tokens to match.</li>
                <li><strong>sequence_x_reward:</strong> The reward associated with successfully matching the sequence.</li>
            </ul>

            <p className="mb-4">Ensure your text file adheres to this format for the upload to be processed correctly.</p>
        </div>
    );
}

export default HowToUse;
