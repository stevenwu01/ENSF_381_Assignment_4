# Sweet Scoop Ice Cream Shop

A full-stack web application for an ice cream shop. The project uses a React frontend and a Flask backend API to display ice cream flavors and customer reviews.

## Features

- Browse available ice cream flavors
- View customer reviews
- Navigate through multiple application pages
- Login and signup interfaces
- Order history interface
- Frontend communicates with a Flask REST API

## Technologies Used

### Frontend

- React
- JavaScript
- HTML
- CSS

### Backend

- Python
- Flask
- JSON

## Project Structure

```text
ENSF_381_Assignment_4-main/
│
├── backend/
│   ├── app.py
│   ├── flavors.json
│   └── reviews.json
│
├── public/
│
├── src/
│   ├── components/
│   ├── data/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── FlavorsPage.js
│   ├── Homepage.js
│   ├── index.css
│   ├── index.js
│   ├── LoginPage.js
│   ├── OrderHistoryPage.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── SignupPage.js
│   └── style.css
│
├── .gitignore
├── package.json
└── package-lock.json
```

## Installation and Setup

### 1. Download the Project

Click the green **Code** button on GitHub and select **Download ZIP**.

Extract the downloaded ZIP file to your computer.

Open the extracted project folder in VS Code.

Make sure the terminal is opened in the project root directory where `package.json` is located.

### 2. Install Frontend Dependencies

Open a terminal in the project root folder and run:

```bash
npm install
```

Wait for all required Node.js packages to finish installing.

### 3. Start the React Frontend

Run:

```bash
npm start
```

The React development server will start and the application should open automatically in your browser.

The frontend runs at:

```text
http://localhost:3000
```

Keep this terminal running.

### 4. Start the Flask Backend

Open a second terminal.

Navigate to the backend folder:

```bash
cd backend
```

Install Flask if it is not already installed:

```bash
pip install flask
```

Start the Flask backend server:

```bash
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

Keep this terminal running as well.

Both the React frontend and Flask backend must be running at the same time for the application to work correctly.

## Anaconda Users

If Flask is installed but Python shows an error such as:

```text
ModuleNotFoundError: No module named 'flask'
```

activate the Anaconda environment first:

```bash
conda activate base
```

Then run:

```bash
python app.py
```

This can happen when multiple Python installations are installed on the same computer.

## API Endpoints

### Get Ice Cream Flavors

```http
GET /flavors
```

Returns ice cream flavor data from `flavors.json`.

Example address:

```text
http://127.0.0.1:5000/flavors
```

### Get Customer Reviews

```http
GET /reviews
```

Returns customer review data from `reviews.json`.

Example address:

```text
http://127.0.0.1:5000/reviews
```

## Running the Application

Two terminals should be running at the same time.

### Terminal 1 - Frontend

From the project root folder:

```bash
npm start
```

### Terminal 2 - Backend

From the project root folder:

```bash
cd backend
python app.py
```

If using Anaconda:

```bash
cd backend
conda activate base
python app.py
```

After both servers are running, open:

```text
http://localhost:3000
```

in your browser.


## Course Project

Developed as part of ENSF 381 coursework.

## Author

Yukun (Steven) Wu
Paolo Abad
