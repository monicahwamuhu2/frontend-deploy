

# **Chatbot UI**

This is the frontend for the chatbot application, built with **Next.js**, styled with **Tailwind CSS**, and deployed on **Vercel**. The frontend is designed to interact with the backend by sending user input and displaying the chatbot's responses in real-time.

### **Tech Stack**

- **Next.js**: A React framework that allows for building production-ready web applications with features like server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for creating fast and responsive UI designs.
- **TypeScript**: A typed superset of JavaScript that provides type safety and enhanced developer tooling.
- **DaisyUI**: A collection of accessible, customizable UI components built on top of Tailwind CSS to speed up the design process.
- **Vercel**: A cloud platform for frontend deployments, ensuring the frontend app is hosted and globally accessible.

### **Features**

- **Interactive Chat Interface**: The application displays a user-friendly chat interface where users can send messages and receive responses from the bot.
- **Real-Time Communication**: The UI communicates with the backend server via HTTP requests, allowing the user to interact with the bot in real-time.
- **User and Bot Messages**: Both user messages and bot responses are displayed in an intuitive and visually distinct manner.
- **Loading State**: When waiting for the bot's response, the UI shows a loading indicator to improve user experience.

---

### **Installation**

Follow these steps to get the chatbot UI up and running locally on your machine.

1. **Clone the repository**:

   Open your terminal or command prompt and run the following commands to clone the project repository.

   ```bash
   git clone https://github.com/your-username/chatbot-ui.git
   cd chatbot-ui
   ```

2. **Install dependencies**:

   Ensure you have **Node.js** installed. If not, download and install it from [nodejs.org](https://nodejs.org/). Once installed, run the following command to install the project dependencies:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - In the root directory of the project, create a new file named `.env.local` to store your environment variables.
   - Add the following line to the `.env.local` file:

     ```bash
     NEXT_PUBLIC_BACKEND_URL="https://backend-chatbot-production-8545.up.railway.app/"
     ```

     Replace the URL with the URL of your deployed backend server. This variable will be used by the frontend to communicate with the backend.

4. **Run the development server**:

   Once everything is set up, run the following command to start the development server:

   ```bash
   npm run dev
   ```

   This will start the app locally on `http://localhost:3000`.

5. **Open the app in your browser**:

   After the server starts, open your browser and navigate to `http://localhost:3000` to see the chatbot UI in action.

---

### **Deployment**

To deploy the frontend to **Vercel**, follow these steps:

1. **Build the frontend for production**:

   To build the project for production, run the following command:

   ```bash
   npm run build
   ```

   This will generate an optimized production build of the application.

2. **Deploy to Vercel**:

   - Go to [Vercel](https://vercel.com) and create an account if you don't have one.
   - Install the Vercel CLI globally by running:

     ```bash
     npm install -g vercel
     ```

   - Deploy the app by running:

     ```bash
     vercel
     ```

     Follow the prompts to link the project with your Vercel account and deploy it.

3. **Access the deployed app**:

   Once the deployment process is complete, Vercel will provide you with a live URL where you can access the chatbot UI.

---

### **Troubleshooting**

If you run into issues while setting up or deploying the frontend, here are a few things to check:

- **Backend URL**: Ensure that the backend URL is correctly set in the `.env.local` file. If the URL is incorrect or the backend server is down, the frontend won't be able to communicate with the bot.
- **API Calls**: Check the browser's **Developer Tools** (under the **Network** tab) to see if any API calls to the backend fail or result in errors.
- **CORS Issues**: Ensure that the backend allows cross-origin requests from the frontend. If you're deploying to different domains, you may need to configure CORS (Cross-Origin Resource Sharing) on the backend.

---
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
