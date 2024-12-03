# Frontend Application

This is the frontend application for the FullStack Capstone Project.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tejaswini21nalla/smart-closet-ui.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Features

- Modern and responsive user interface
- React-based frontend
- State management with Redux/Context API
- Routing with React Router

## Project Structure

```
frontend/
  ├── public/          # Static files
  ├── src/             # Source files
  │   ├── components/  # React components
  │   ├── pages/       # Page components
  │   ├── services/    # API services
  │   └── styles/      # CSS/SCSS files
  └── package.json     # Project dependencies
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Deployment on Vercel

The application is deployed using Vercel, a cloud platform for static sites and Serverless Functions.

### Deployment Steps

1. **Create a Vercel Account**
   - Sign up for a free account at [Vercel](https://vercel.com)

2. **Push to GitHub**
   - Ensure your React app is pushed to a GitHub repository
   - The repository is available at: https://github.com/Tejaswini21nalla/smart-closet-ui.git

3. **Deploy via Vercel Dashboard**
   - Go to the [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect the React configuration

4. **Build and Deploy**
   - Vercel automatically:
     - Detects the React app configuration
     - Runs `npm run build` for production optimization
     - Deploys to a public URL (e.g., https://your-project-name.vercel.app)

5. **Automatic Updates**
   - Any new commits to the main branch will trigger automatic redeployment
   - Preview deployments are created for pull requests

Visit the deployed application at: [Smart Closet App](https://smart-closet-n308939v1-tejaswini-nallas-projects.vercel.app/)
