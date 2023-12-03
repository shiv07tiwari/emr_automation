Project Title
A React application utilizing antd for UI, react-speech-recognition for speech-to-text functionality, and a simulated backend API for speech analysis and patient data management.

Description
This project is designed for a medical environment, providing a streamlined interface for doctors to record patient information via voice input. It automatically transcribes the doctor's spoken words and then sends this transcript to a mock API server, which performs an analysis and returns structured patient information. The application also includes a review system to confirm the accuracy of the automated transcription and API-provided data before submission.

Project Setup
Prerequisites
To run this project, you need to have Node.js and npm (Node Package Manager) installed. You can download and install Node.js from nodejs.org, which will include npm.

Installing
Clone the repository to your local machine.

git clone https://github.com/your-username/your-project-name.git
cd your-project-name
Install the required npm dependencies.

npm install
Start the development server.

npm start
Open your browser and navigate to http://localhost:3000 to view the app.

Running Tests
To run the test suite, execute:

npm test
Code Explanation
App Component
The App component is the main component where the speech recognition functionality is initiated. It uses the useSpeechRecognition hook to handle the browser's native speech recognition capabilities.

The listenContinuously function starts the transcription process that runs continuously.
The resetTranscript function clears the current transcription data.
The SpeechRecognition object handles the methods to start and stop the listening process.
The Card component presents a user interface for controlling the speech recognition, including start/stop/reset buttons and displays the transcript.
The Table component is responsible for displaying and managing the structured patient data, including verification and editing functionality.
Table Component
This component handles the display and manipulation of patient data, which includes four sections: patientDetails, history, vitals, and appointment_notes. A useEffect hook is utilized to send the speech transcript to the mock API server whenever the transcript is updated and the difference in words exceeds a threshold.

Upon receiving the updated data, the transformResponse function updates the corresponding state objects.

Each text input field allows editing of the corresponding information, unless the data has been verified by the user through a checkbox system.
The SummaryModal can be triggered to open, providing a complete overview of the patient's data across all sections before final submission.
SummaryModal Component
Uses Ant Design's Modal component to present a user interface for reviewing the structured patient data before final submission. It's laid out using React Bootstrap Row and Col components, organizing the information into different sections for the user to easily review and confirm.

The modal presents patient information in a structured format, including personal details, medical history, vitals, and appointment notes. Each section has corresponding fields displaying the data with appropriate headers.

Note
Please remember that this project includes a simulated API endpoint (http://18.216.202.224:8000/audio-analysis/). In a real-world scenario, you would need to replace this with a valid API server capable of handling the speech-to-text analysis and returning structured patient data. Also, ensure to handle errors and provide user feedback accordingly.