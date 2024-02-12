# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from algo import solve_algo
from werkzeug.utils import secure_filename
import time
import random

app = Flask(__name__)
CORS(app)


@app.route('/solveHome', methods=['POST'])
def solve():
    data = request.get_json()

    buffer_size = data['bufferSize']
    matrix = data['matrix']
    sequences = data['sequences']

    # Convert sequences from the format received to the expected format
    sequences_formatted = [(seq['sequence'], seq['reward'])
                           for seq in sequences]
    start_time = time.time()
    # Call the solve algorithm function with the processed data
    best_reward, best_path, best_trimmed_path = solve_algo(
        matrix, sequences_formatted, buffer_size)
    end_time = time.time()
    time_taken = (end_time - start_time) * 1000
    adjusted_best_trimmed_path = [(pos[1]+1, pos[0]+1)
                                  for pos in best_trimmed_path]

    # Generate tokens for the adjusted best trimmed path
    best_trimmed_path_tokens = [
        ' '.join(matrix[pos[0]][pos[1]] for pos in best_trimmed_path)]

    # Construct the result to send back to the frontend
    result = {
        'bestReward': best_reward,
        'bestTrimmedPath': adjusted_best_trimmed_path,
        'bestTrimmedPathTokens': best_trimmed_path_tokens,
        'timeTaken': round(time_taken, 2)
    }

    return jsonify(result)


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        content = file.read().decode('utf-8')  # Read and decode file content

        # Split content into lines and process
        lines = content.split('\n')
        buffer_size = int(lines[0].strip())
        matrix_size = tuple(map(int, lines[1].strip().split()))
        matrix = [line.strip().split() for line in lines[2:2+matrix_size[1]]]
        sequences_count = int(lines[2+matrix_size[1]].strip())
        sequences = []
        for i in range(sequences_count):
            start_line = 3 + matrix_size[1] + i*2
            sequence = lines[start_line].strip().split()
            reward = int(lines[start_line + 1].strip())
            sequences.append((sequence, reward))

        start_time = time.time()
        best_reward, best_path, best_trimmed_path = solve_algo(
            matrix, sequences, buffer_size)
        end_time = time.time()
        time_taken = (end_time - start_time) * 1000

        adjusted_best_trimmed_path = [(pos[1]+1, pos[0]+1)
                                      for pos in best_trimmed_path]

        # Generate tokens for the adjusted best trimmed path
        best_trimmed_path_tokens = [
            ' '.join(matrix[pos[0]][pos[1]] for pos in best_trimmed_path)]
        sequences_response = [{'sequence': ' '.join(
            seq[0]), 'reward': seq[1]} for seq in sequences]
        # Construct the result to send back to the frontend

        result = {
            'bestReward': best_reward,
            'bestPath': best_path,
            'bestTrimmedPath': adjusted_best_trimmed_path,
            'bestTrimmedPathTokens': best_trimmed_path_tokens,
            'timeTaken': round(time_taken, 2),
            'matrix': matrix,
            'sequences': sequences_response
        }
        return jsonify(result)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt'}


def generate_data_web(tokens, buffer_size, matrix_width, matrix_height, num_sequences, max_sequence_size):
    matrix = [[tokens[random.randint(0, len(tokens) - 1)]
               for _ in range(matrix_width)] for _ in range(matrix_height)]

    # Generate sequences
    sequences = []
    for _ in range(num_sequences):
        seq_length = random.randint(2, max_sequence_size)
        sequence = random.sample(tokens, k=seq_length)
        reward = random.randint(5, 15) * 5
        sequences.append((sequence, reward))

    return buffer_size, matrix, sequences


@app.route('/autoSolve', methods=['POST'])
def auto_solve():
    data = request.get_json()
    buffer_size, matrix, sequences = generate_data_web(
        data['uniqueTokens'],
        data['bufferSize'],
        data['matrixSize']['width'],
        data['matrixSize']['height'],
        data['sequencesAmount'],
        data['maxSequenceSize']
    )

    start_time = time.time()
    best_reward, best_path, best_trimmed_path = solve_algo(
        matrix, sequences, buffer_size)
    end_time = time.time()
    time_taken = (end_time - start_time) * 1000
    # print("Best Trimmed Path:", best_trimmed_path)
    # print("Matrix Sample:", matrix[0][0])
    adjusted_best_trimmed_path = [(pos[1]+1, pos[0]+1)
                                  for pos in best_trimmed_path]

    # Generate tokens for the adjusted best trimmed path
    best_trimmed_path_tokens = [
        ' '.join(matrix[pos[0]][pos[1]] for pos in best_trimmed_path)]
    sequences_response = [{'sequence': ' '.join(
        seq[0]), 'reward': seq[1]} for seq in sequences]
    result = {
        'bestReward': best_reward,
        'bestPath': best_path,
        'bestTrimmedPath': adjusted_best_trimmed_path,
        'bestTrimmedPathTokens': best_trimmed_path_tokens,
        'timeTaken': round(time_taken, 2),
        'matrix': matrix,
        'sequences': sequences_response
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
