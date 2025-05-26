# GreenLife Solutions  Agricultual Automation Project 👋

This project, "GreenLife," is an agricultural automation system that utilizes a microchip (Arduino) and a web-based platform to gather, analyze, and display sensor data. The goal is to provide users with insights into their agricultural environment and automate certain tasks like irrigation.

## Features

* **Sensor Data Acquisition:**
    * A Python script (`ardcont - Copy.py`) interfaces with an Arduino board to read data from up to six analog sensors.
    * This script also fetches real-time weather data (temperature and precipitation) from Google for a specified location.
* **Automated Control:**
    * The Python script can control relays connected to the Arduino, likely for irrigation, based on sensor readings (e.g., soil moisture) and weather data (e.g., precipitation).
* **Data Logging:**
    * Sensor readings and relay statuses are logged to a Google Sheet ("PythonSensors", worksheet "SensData") via the Python script.
    * Local `.txt` files (`Umidade.txt`, `Temperatura.txt`, `Desempenho.txt`, `Data.txt`, `Parametro.txt`) are also used to store data for the dashboard.
* **Web-Based Dashboard (`dashoboard.html`):**
    * Displays key metrics: temperature, humidity, and a performance indicator, with visual progress circles.
    * Features a line graph (using Chart.js) to visualize historical data for up to six sensors, fetched from a Sheety API.
    * Includes a table that dynamically loads and displays sensor data from a Sheety API.
* **User Authentication (`logout.html`):**
    * Provides login and signup functionality.
    * Login authenticates against a Sheetsu API.
    * Signup posts data to a SheetDB API.
* **Weather Information (`weather.html`):**
    * Allows users to get current weather details for a city or their current location using the OpenWeatherMap API.
* **AI Chatbot (`chatgreen.html`):**
    * Integrates with OpenAI's text-davinci-003 model to provide a chat interface for user queries. (Requires a valid API key).
* **3D Model Visualization (`index.html`, `index1.html`):**
    * Displays an interactive 3D model ("Smol Ame in an Upcycled Terrarium") using Three.js on the main pages.
* **Embedded Game (`calango.html`):**
    * Includes a Unity WebGL game titled "calango - the beginning".
* **Responsive Design:**
    * The website is styled with CSS, including support for dark mode and specific stylesheets for mobile viewports to ensure a good user experience across devices.

## Project Structure

The project consists of several HTML, CSS, and JavaScript files that create the web interface, along with a Python script for backend operations and hardware interaction.

* **HTML Files:**
    * `index.html`: Initial landing/login page.
    * `index1.html`: Main page after login.
    * `dashoboard.html`: Displays sensor data, graphs, and tables.
    * `weather.html`: Weather information lookup.
    * `info.html`: Information about the project and team.
    * `chatgreen.html`: AI chatbot interface.
    * `logout.html`: Login and signup forms.
    * `calango.html`: Hosts the Unity WebGL game.
* **CSS Folders & Files:**
    * `styleindex/`: General styles for main pages and chat.
    * `dashboard/`: Styles for the dashboard page.
    * `info/`: Styles for the info page.
    * `notificação/`: Styles for the weather page.
    * `Logout/`: Styles for the login/signup page.
    * `moblilesite/`: Contains CSS files for mobile responsiveness.
    * `TemplateData/`: Styles for the Unity WebGL game.
* **JavaScript Folders & Files:**
    * `javaindex/`: Scripts for sidebar navigation, 3D model rendering, and the ChatGreen AI.
    * `dashboard/`: Scripts for populating dashboard data, generating graphs, and updating mini displays.
    * `notificação/`: Script for weather data fetching.
    * `moblilesite/`: JavaScript for mobile-specific options like dark mode toggle.
    * `Build/`: Contains Unity WebGL loader and framework scripts.
* **Python Script:**
    * `ardcont - Copy.py`: Manages Arduino communication, data fetching, and Google Sheets updates.
* **Data Files (.txt):**
    * `Umidade.txt`, `Temperatura.txt`, `Desempenho.txt`, `Data.txt`, `Parametro.txt`: Store raw data used by the dashboard.
* **Other:**
    * `3D/`: Contains the 3D model and its license.
    * `imagens/`: Likely contains images used throughout the website (e.g., logo.png).
    * `package.json`, `package-lock.json`: Node.js project configuration files.

## How It Works (Simplified Flow)

1.  **Hardware Interaction (Python & Arduino):** The Python script (`ardcont - Copy.py`) periodically reads sensor values (humidity, etc.) from a connected Arduino. It also scrapes web weather data.
2.  **Data Processing & Control:** Based on predefined thresholds and weather conditions, the Python script determines if relays (e.g., for water pumps) should be activated or deactivated.
3.  **Data Logging:** The script updates a Google Sheet with the latest sensor readings and relay statuses. It also writes some of this data to local `.txt` files.
4.  **Web Interface - User Login:** Users access the system via `index.html` and log in using credentials verified against a Sheetsu API (`logout.html`).
5.  **Dashboard Display:** After login (`index1.html`), users can navigate to `dashoboard.html`.
    * The dashboard's mini-cards fetch and display the latest data from the local `.txt` files.
    * The main graph and data table on the dashboard fetch their data from Sheety APIs, which are likely populated by the Google Sheet updated by the Python script.
6.  **Other Features:**
    * Users can check detailed weather for any city (`weather.html`).
    * An AI chatbot (`chatgreen.html`) provides answers to queries.
    * An info page (`info.html`) gives details about the project.
    * A game (`calango.html`) is available.

## Getting Started (Conceptual - based on provided files)

While a full setup guide isn't present, the typical workflow would involve:

1.  **Hardware Setup:**
    * Connect sensors (e.g., soil moisture, temperature) and relays to an Arduino board.
    * Upload appropriate firmware to the Arduino to read sensors and control relays based on serial commands (the Python script uses PyFirmata, suggesting a standard Firmata sketch or similar on the Arduino).
2.  **Python Script Configuration:**
    * Install necessary Python libraries (`requests_html`, `pyfirmata`, `gspread`).
    * Configure `ardcont - Copy.py` with the correct Arduino COM port.
    * Set up Google Cloud Platform service account credentials (`service_account.json`) for Google Sheets API access and share the target Google Sheet with the service account email.
    * Ensure the Python script can write to the local `.txt` data files.
3.  **Web Server:**
    * Host the HTML, CSS, and JavaScript files on a web server.
    * Ensure API keys are correctly configured (OpenWeatherMap in `notifications.js`, OpenAI in `chatgreen.js`).
4.  **Sheety/SheetDB Setup:**
    * Ensure the Google Sheet "PythonSensors" (with worksheet "SensData") is correctly linked to the Sheety APIs used by `dashboard/grafic.js` and `dashboard/dashboard.js`.
    * Ensure the Google Sheet for user registration is correctly linked to the SheetDB API in `logout.html`.
5.  **Running the System:**
    * Execute the `ardcont - Copy.py` script to start data collection, control, and logging.
    * Access the website through a browser.

## Author

This project was conceived and developed by MonkeyShock.
GitHub: (https://github.com/MonkeyShock) 
