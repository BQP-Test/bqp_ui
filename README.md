# BQP Assignment Check UI

## Directory Structure

Below is the structure of the `bqp_ui` project directory, explaining the purpose of each folder and file:

```plaintext
/bqp_ui
├── /public               # Contains static files like HTML and icons for the app
├── /src                  # Source files for the application
│   ├── /components       # React components used throughout the application
│   └── /services         # Services for API calls and other external interactions
├── package.json          # Contains npm dependencies as well as build and run scripts
└── README.md             # Documentation for the project (this file)



## Introduction
**BQP Assignment Check UI** is the front-end component of an educational platform designed to streamline the management and review of assignments. This interface facilitates intuitive and efficient interactions, enhancing the educational process for both students and educators.

## Architecture
The UI is developed using React.js and styled with Material-UI. This setup provides a modular, maintainable, and scalable architecture:
- **React.js**: Facilitates the development of a dynamic single-page application (SPA) with real-time responsiveness.
- **Material-UI**: Implements a cohesive visual framework based on Google's Material Design, offering a wide range of styled components that enhance the user interface.

## Key Features
- **Google Sign-In**: Enables users to authenticate seamlessly using their Google accounts.
- **Dynamic Article Management**: Users can view, create, edit, and delete articles and assignments within a user-friendly interface.
- **Interactive Comments System**: Allows users to post and view comments in real time on articles and assignments for immediate feedback.

## Design Choices
- **Material-UI**: Chosen for its design consistency, responsiveness, and extensive component library, which speeds up the development process by providing pre-built elements that are both functional and aesthetically pleasing.
- **SPA Architecture**: Enhances user experience by loading content dynamically without reloading the entire page, making the application fast and smooth.

## Setup Instructions
1. **Prerequisites**:
   - Ensure that Node.js is installed on your system.

2. **Installation**:
   ```bash
   # Navigate to the bqp_ui directory
   cd bqp_ui

   # Install dependencies
   npm install

   # Run UI
   npm start


