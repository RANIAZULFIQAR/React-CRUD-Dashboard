# React-CRUD-Dashboard
📰 React News Dashboard: CRUD Operations Lab

This project is a single-page application (SPA) built with React to demonstrate proficiency in handling all four major HTTP request methods: GET, POST, PUT, and DELETE.

The application serves as a dynamic news dashboard, combining real-time data fetching with simulated persistence operations to practice full-stack interaction principles entirely on the client-side.

✨ Features

Real-time Data (GET): Fetches and displays top news headlines from the News API.

CRUD Practice: Implements full Create, Read, Update, Delete (CRUD) functionality using React state management to simulate server interaction.

POST (Create): Use the form to publish a new local article.

PUT (Update): Edit the title and content of local articles.

DELETE (Delete): Remove local articles from the dashboard.

Responsive UI: A clean, mobile-friendly design using standard CSS for optimal viewing on all devices.

🛠️ Technologies Used

Front-End Framework: React (using functional components and Hooks: useState, useEffect).

Styling: Pure CSS (with media queries for responsiveness).

External Data: News API (used for the GET operation).

🚀 Getting Started

Follow these steps to set up and run the project locally.

Prerequisites

Node.js and npm (Node Package Manager) installed.

A personal API Key from News API (required for real-time news fetching).

Installation

Clone the Repository (or start in your existing project folder):

cd news-dashboard-app


Install Dependencies:

npm install


Configure API Key:

Open src/components/NewsDashboard.js.

Locate the NEWS_API_URL variable.

Replace 'YOUR_API_KEY' with your actual key:

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=YOUR_ACTUAL_KEY_HERE`;


Running the Application

Start the development server:

npm start


The application will automatically open in your browser at http://localhost:3000.

🌐 Deployment (GitHub Pages)

This project is configured for deployment using gh-pages.

Set homepage: Ensure the homepage field in package.json is set to your GitHub Pages URL:



Deploy: Run the deployment script:

npm run deploy


The application will be deployed to the URL specified in the homepage field.
