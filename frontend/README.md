# AI Note - Frontend

AI Note is a voice-enabled note-taking application that allows users to create notes using speech-to-text technology. The frontend of this project is built using **React**, **Tailwind CSS**, and **DaisyUI** for a seamless and responsive user experience.

## Features

- **Speech-to-Text**: Use voice commands to create notes.
- **Image Uploads**: Upload images directly to your notes.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **User-Friendly Interface**: Intuitive controls and navigation.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Routing**: React Router DOM
- **State Management**: React (via hooks)
- **API Requests**: Axios
- **Styling**: Tailwind CSS, DaisyUI

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/)

### Steps to Run the Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ainote-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ainote-frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

## Live Demo

You can try out the live version of the application here:  
[AI Note](https://ainote24.web.app/)

## Usage

1. **Start Recording**: Click the microphone icon to start voice input.
2. **Add Images**: Click the image icon to upload images from your device.
3. **Create Notes**: Add text or use voice commands to create and save your notes.
4. **View Notes**: Your notes can be accessed from the main interface.

## Folder Structure

```
/src
  /components
    - MicroPhone.js       // Speech recognition component
    - UserInput.js        // User input component for note-taking
  /utils
    - uploadImage.js      // Utility function for uploading images to Cloudinary
  /config
    - axiosInstance.js    // Axios instance for API requests
  /styles
    - index.css           // Global styles
```

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **DaisyUI**: A component library for Tailwind CSS.
- **React Router DOM**: For managing navigation between different pages.
- **Axios**: For making HTTP requests.
- **React Hot Toast**: For showing toast notifications.

## Contributing

We welcome contributions! Feel free to fork this repository, report issues, and submit pull requests.

To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request
