import os
from algo import read_file, solve_algo, generate_data, buffer_size_validator, sequence_validator, save_to_file
import time


def main():
    data_source = input(
        "Use file input or terminal input? (file/terminal): ").lower()
    if data_source == 'file':
        file_path = input("txt file name : ")
        data = read_file("../test/"+file_path)
        if data == None:
            return
        buffer_size = data['buffer_size']
        processed_matrix = [row.split() for row in data['matrix']]
        processed_sequences = [(sequence[0].split(), sequence[1])
                               for sequence in data['sequences']]
    elif data_source == 'terminal':
        buffer_size, matrix, sequences = generate_data()
        processed_matrix = matrix
        processed_sequences = [(sequence[0].split(), sequence[1])
                               for sequence in sequences]

    else:
        print("Invalid input. Exiting.")
        return

    # Process the matrix and sequences
    # print("Buffer Size:", buffer_size)
    buffer_size = buffer_size_validator(buffer_size, processed_matrix)
    if buffer_size == 0:
        save_output = input(
            "\nDo you want to save the results to a file? (yes/no): ")
        if save_output.lower() == 'yes':
            save_to_file()
        return
    processed_sequences = sequence_validator(
        processed_sequences, buffer_size)
    # print("Processed Matrix:")
    # for row in processed_matrix:
    #     print(' '.join(row))

    # print("\nProcessed Sequences:")
    # for sequence, reward in processed_sequences:
    #     print(f"{' '.join(sequence)} with reward {reward}")
    start_time = time.time()
    best_reward, best_path, best_trimmed_path = solve_algo(
        processed_matrix, processed_sequences, buffer_size)

    end_time = time.time()
    time_taken = (end_time - start_time) * 1000

    path_tokens = [processed_matrix[pos[0]][pos[1]] for pos in best_path]

    print(f"Best Reward: {best_reward}")
    print("Best Path Tokens:", ' '.join(path_tokens))

    # print("Best Path:")
    # for pos in best_path:
    #     col_row = (pos[1]+1, pos[0]+1)  # Swap positions to get (col, row)
    #     print(col_row, end=' ')
    print(f"Best Path: {best_path}")
    print(f"Best Trimmed Path: {best_trimmed_path}")
    print(f"Time taken: {time_taken:.2f} ms")

    # Inside your main function, after computing best_reward, best_path, etc.
    save_output = input(
        "\nDo you want to save the results to a file? (yes/no): ")
    if save_output.lower() == 'yes':
        save_to_file(best_reward, path_tokens,
                     best_trimmed_path, time_taken)
    else:
        print("Thank you!")


if __name__ == "__main__":
    main()
