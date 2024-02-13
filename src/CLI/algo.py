import random


def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            buffer_size = int(file.readline().strip())

            matrix_width, matrix_height = map(
                int, file.readline().strip().split())

            matrix = [file.readline().strip() for _ in range(matrix_height)]

            number_of_sequences = int(file.readline().strip())

            sequences = []
            for _ in range(number_of_sequences):
                sequence = file.readline().strip()
                reward = file.readline().strip()
                sequences.append((sequence, reward))

        return {
            'buffer_size': buffer_size,
            'matrix_dimensions': (matrix_width, matrix_height),
            'matrix': matrix,
            'sequences': sequences
        }
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return None


def find_matching(buffer, sequences):
    total_reward = 0
    buffer_str = ' '.join(buffer)
    for sequence, reward in sequences:
        sequence_str = ' '.join(sequence)
        if sequence_str in buffer_str:
            total_reward += int(reward)
    return total_reward


def trim_path(matrix, sequences, best_path):
    max_reward = find_matching([matrix[pos[0]][pos[1]]
                               for pos in best_path], sequences)
    for i in range(len(best_path), 0, -1):
        temp_path = best_path[:i]
        buffer = [matrix[pos[0]][pos[1]] for pos in temp_path]
        temp_reward = find_matching(buffer, sequences)

        if temp_reward < max_reward:
            return best_path[:i+1]

    return best_path


def solve_algo(matrix, sequences, buffer_size, path=[], direction='H', best_reward=0, best_path=[], best_trimmed_path=[]):
    if len(path) == buffer_size:
        buffer = [matrix[pos[0]][pos[1]] for pos in path]
        reward = find_matching(buffer, sequences)
        if reward > best_reward:
            best_reward = reward
            best_path = path[:]
            best_trimmed_path = trim_path(matrix, sequences, best_path)
        return best_reward, best_path, best_trimmed_path

    if not path:
        for i in range(len(matrix[0])):
            temp_reward, temp_path, temp_trimmed_path = solve_algo(
                matrix, sequences, buffer_size, [(0, i)], 'V', best_reward, best_path, best_trimmed_path)
            if temp_reward > best_reward:
                best_reward, best_path, best_trimmed_path = temp_reward, temp_path, temp_trimmed_path
    else:
        last_pos = path[-1]
        next_positions = []
        if direction == 'H':
            for i in range(len(matrix[0])):
                if i != last_pos[1]:
                    next_positions.append((last_pos[0], i))
        else:
            for i in range(len(matrix)):
                if i != last_pos[0]:
                    next_positions.append((i, last_pos[1]))

        for next_pos in next_positions:
            if next_pos not in path:
                new_path = path + [next_pos]
                new_direction = 'V' if direction == 'H' else 'H'
                temp_reward, temp_path, temp_trimmed_path = solve_algo(
                    matrix, sequences, buffer_size, new_path, new_direction, best_reward, best_path, best_trimmed_path)
                if temp_reward > best_reward:
                    best_reward, best_path, best_trimmed_path = temp_reward, temp_path, temp_trimmed_path

    return best_reward, best_path, best_trimmed_path


def generate_data():
    while True:
        try:
            num_unique_tokens = int(input("Number of unique tokens: "))
            tokens = input("Tokens (space-separated): ").split()
            buffer_size = int(input("Buffer size: "))
            matrix_size = input("Matrix size (width height): ").split()
            matrix_width, matrix_height = int(
                matrix_size[0]), int(matrix_size[1])
            num_sequences = int(input("Number of sequences: "))
            max_sequence_size = int(input("Maximum sequence size: "))

            if len(tokens) < num_unique_tokens or len(tokens) > num_unique_tokens:
                raise ValueError(
                    "Error: More unique tokens requested than provided.")

            break
        except ValueError as e:
            print(f"Invalid input: {e}. Please try again.")

    # Generate Matrix
    matrix = [[random.choice(tokens) for _ in range(matrix_width)]
              for _ in range(matrix_height)]

    # Generate sequences
    sequences = []
    for _ in range(num_sequences):
        # Memastikan panjang sequence tidak melebihi batas
        seq_length = random.randint(2, min(max_sequence_size, len(tokens)))
        sequence = random.sample(tokens, k=seq_length)
        # reward antara 5 sampai 25 dan dikali dengan 5
        reward = random.randint(5, 25) * 5
        sequences.append((' '.join(sequence), str(reward)))

    return buffer_size, matrix, sequences


def buffer_size_validator(buffer_size, matrix):
    if buffer_size < 2:
        print("There are no solution for your buffer size.")
        return 0
    elif buffer_size > ((len(matrix)) * (len(matrix[0]))):
        return ((len(matrix)) * (len(matrix[0])))
    else:
        return buffer_size


def sequence_validator(sequences, buffer_size):
    adjusted_sequences = []
    for sequence, reward in sequences:
        if len(sequence) > buffer_size:
            adjusted_sequence = sequence[:buffer_size]
        else:
            adjusted_sequence = sequence
        adjusted_sequences.append((adjusted_sequence, reward))
    return adjusted_sequences


def save_to_file(best_reward=0, best_trimmed_path_tokens=[], best_trimmed_path=[], time_taken=0, file_name='result.txt'):
    # Join the tokens for the best trimmed path into a single string
    best_trimmed_path_tokens_str = ' '.join(best_trimmed_path_tokens)

    best_trimmed_path_positions_str = '\n'.join(
        [f"{pos[1]+1}, {pos[0]+1}" for pos in best_trimmed_path])
    time_taken = round(time_taken, 2)
    with open(file_name, 'w') as file:
        file.write(f"{best_reward}\n")
        file.write(f"{best_trimmed_path_tokens_str}\n")
        for pos_str in best_trimmed_path_positions_str.split('\n'):
            file.write(f"{pos_str}\n")
        file.write("\n")
        file.write(f"{time_taken} ms\n")

    print(f"Results saved to {file_name}.")
