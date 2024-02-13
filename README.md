<h1 align="center">Tugas Kecil 1 IF2211 Strategi Algoritma</h1>
<h1 align="center"> Semester II tahun 2023/2024 </h1>
<h1 align="center"> Penyelesaian Cyberpunk 2077 Breach Protocol dengan Algoritma Brute Force </h1>

 ## Table of Contents
* [General Informations](#general-information)
* [Technologies Used](#technologies-used)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Creator](#creator)
* [Link](#link)
<!-- <!-- * [License](#license) -- -->

## General Information
This program is a solver for the Breach Protocol minigame found in the video game Cyberpunk 2077, a network hacking simulation against ICE (Intrusion Countermeasures Electronics) within the game. The solver utilizes a brute force algorithm to identify the optimal sequence of actions to maximize the rewards obtained during a breach. It is developed using React for the frontend, styled with Tailwind CSS for a responsive design, and Flask for the backend to process the game logic.

The Breach Protocol minigame consists of several key components:
- Token: A two-character alphanumeric code, such as E9, BD, and 55. These tokens are the basic elements used to form sequences.
- Matrix: A grid composed of tokens from which the player selects to form sequences.
- Sequence: A series of two or more tokens that need to be matched in order.
- Buffer: The maximum number of tokens that can be sequentially arranged. It defines the limit on how many tokens can be selected in one attempt.

The game follows a set of rules to determine how sequences are matched and rewards are earned:

1. Players move in a horizontal, vertical, horizontal, vertical pattern (alternating) until all sequences are successfully matched or the buffer is full.
2. The game starts with the player selecting a token from the top row of the matrix.
3. Sequences are matched based on the tokens placed in the buffer.
4. A single token in the buffer can be utilized for more than one sequence.
5. Each sequence has a variable reward or weight associated with it.
6. Sequences have a minimum length of two tokens.

## Technologies Used
1. Frontend
    - React
    - Tailwind
2. Backend
    - Python
    - Flask



## Screenshots
![image](https://github.com/AlbertChoe/Tucil1_13522081/assets/114172712/4b999273-cbaf-462a-9b5a-e029c3783b59)
![image](https://github.com/AlbertChoe/Tucil1_13522081/assets/114172712/425013e4-d95a-4ab6-80f6-de91c1b6d78d)
![image](https://github.com/AlbertChoe/Tucil1_13522081/assets/114172712/0666c476-a856-4dfc-b552-9c6a8f12b04b)



## Setup
This project offers both a web-based GUI and a CLI option for users to interact with the Breach Protocol solver. Follow the steps below based on your preferred method of use.
##WEB-BASED GUI
To run the web-based GUI, follow these steps:
1. Clone this repository:
    ```bash
    git clone [<repository-url>](https://github.com/AlbertChoe/Tucil1_13522081.git)
    ```
2. Navigate to the src directory:
    ```bash
    cd .\Tucil1_13522081\src
    ```
3. Open another terminal in the same folder directory. Now, you should have two terminals open, both in the Tucil1_13522081/src directory.



First Terminal (To run the frontend server)
1. Change directory to the frontend folder and execute the following commands:
    ```bash
    cd frontend
   npm install
   npm run start
    ```
2. Open a web browser and navigate to http://localhost:3000/. Note: The port number may vary if the default port is in use. Check the terminal to determine which port the server is running on.

Second Terminal (To run the backend server)
1. Change directory to the backend folder:
    ```bash
    cd backend
    ```
2. Set up a virtual environment:
   Now, we need to set venv in order to run the program

   *For windows user*
   ```shell
   py -3 -m venv .venv
   .venv\Scripts\activate
   ```
   
   *For linux/macOS user*
   ```shell
   python3 -m venv .venv
   . .venv/bin/activate
   ```
3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   flask run --debug
   ```
if you are encountering error like this 
![image](https://github.com/AlbertChoe/Tucil1_13522081/assets/114172712/43f709f0-5344-45b9-a65c-6d61b8bdcce2)
delete the .venv folder and retry from step 2 

The backend server should now be running at http://127.0.0.1:5000.

##CLI
To use the CLI version of the solver, follow these steps:
1. Clone this repository:
    ```bash
    git clone https://github.com/AlbertChoe/Tucil1_13522081
    ```
2. Navigate to the src directory:
    ```bash
    cd .\Tucil1_13522081\src
    ```
3. Open a terminal in the current directory and execute:
   python main.py


This setup guide should help you get started with both the web-based GUI and CLI versions of the Cyberpunk 2077 Breach Protocol solver.

 ## Website Usage Guide
Welcome to our website! This guide will help you navigate through the features available on the site, ensuring a smooth and efficient experience. Whether you're manually inputting data, using the auto-generate feature, or uploading a file, we've got you covered.

Full Manual Input
1. Buffer Size: Enter the size of the buffer in the designated input field.
2. Matrix: Input the matrix data in the provided textarea. Each row of the matrix should be entered on a new line, with tokens separated by spaces.
3. Sequences with Rewards: Enter each sequence followed by its reward on a new line in the textarea provided for sequences. Each sequence should be space-separated.

After filling in the required fields, click the "Solve" button to process the data. The results, including the best reward, the best path, and the execution time, will be displayed below the button. You also have the option to download the results as a TXT file.


Auto Generate
The auto-generate page simplifies the data input process by randomly generating the matrix and sequences based on the parameters you provide. Here's how to use this feature:
1. Enter the buffer size, number of unique tokens, matrix size (width and height), number of sequences, and maximum sequence size in the respective input fields.
2. Click the "Generate & Solve" button. The website will automatically generate the matrix and sequences and then solve them.
3. The results will be displayed below the button, similar to the manual input page. You can download the generated results as a TXT file.

Note: The auto-generated file will follow a specific format, similar to the manual input but with randomly generated data based on your specifications.

File Upload
For those who prefer to upload data via a TXT file, the file upload page offers a straightforward solution:

1. Click the "Choose File" button and select the TXT file from your device. The file should follow the specified format:
    ```bash
    buffer_size
    matrix_width matrix_height
    matrix (space-separated tokens)
    number_of_sequences
    sequence_1 sequence_1_reward
    sequence_2 sequence_2_reward
    ...
    sequence_n sequence_n_reward
    ```
2. After selecting the file, click the "Upload" button to submit the file for processing.
3. The results will be displayed on the page, and you'll have the option to download the results as a TXT file.

Tips for a Smooth Experience
- Ensure your data follows the specified formats to avoid errors during processing.
- Use the "Download Results" button to save the output for later reference.
- For the auto-generate feature, experiment with different parameters to see how they affect the results.

We hope this guide helps you make the most out of our website. If you have any questions or encounter issues, please don't hesitate to contact us.

 ## Creator
Albert - 13522081 - K01

 ## Link
 - Repository : (https://github.com/AlbertChoe/Tucil1_13522081.git)


