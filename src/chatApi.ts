// src/api/chatApi.ts

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
// Correct URL for your backend

export const sendMessageToBackend = async (userInput: string) => {
    try {
        const response = await fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: userInput }),  // Pass the user input as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to get response from the backend");
        }

        const data = await response.json();
        return data.response; // Returning the response from the backend

    } catch (error) {
        console.error("Error:", error);
        return "Sorry, there was an error processing your request."; // Default error message
    }
};
