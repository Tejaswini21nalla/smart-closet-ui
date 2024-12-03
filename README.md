# Smart Closet App

This is the frontend application for the Smart Closet Project, a full-stack application that helps users manage their wardrobe digitally. The project consists of two main repositories:

- Frontend (Current): [smart-closet-ui](https://github.com/Tejaswini21nalla/smart-closet-ui.git)
- Backend: [smart-closet-backend](https://github.com/Tejaswini21nalla/smart-closet-backend)

## Project Goals

- Simplify wardrobe management through digital organization
- Help users make informed decisions about their clothing choices
- Promote sustainable fashion by tracking clothing usage
- Provide outfit recommendations based on user preferences
- Enable efficient wardrobe planning and organization

## Features

### Core Features
- **Digital Wardrobe Management**
  - Upload and categorize clothing items
  - Tag items with attributes (color, style, season, etc.)

- **Smart Outfit Planning**
  - Get outfit suggestions
  - Plan outfits for upcoming events

- **Wardrobe Analytics**
  - Identify similar clothing items already present in the wardrobe

### Technical Features
- Modern and responsive user interface
- React-based frontend with Redux state management
- RESTful API integration with backend
- Data storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Tejaswini21nalla/smart-closet-ui.git
cd smart-closet-ui
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
