const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-chatbot-production-8545.up.railway.app';

export const sendMessageToBackend = async (userInput: string) => {
    try {
        const response = await fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ text: userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Let the component handle the error
    }
};