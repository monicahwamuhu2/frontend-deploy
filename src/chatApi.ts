const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-chatbot-production-8545.up.railway.app';

export const sendMessageToBackend = async (userInput: string) => {
    try {
        // First, check if the API is available
        const healthCheck = await fetch(`${backendUrl}/test`);
        if (!healthCheck.ok) {
            throw new Error('Backend service is not available');
        }

        // Send the actual chat request
        const response = await fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ text: userInput }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !data.response) {
            throw new Error('Invalid response format from server');
        }

        return data.response;
    } catch (error) {
        console.error("Error in sendMessageToBackend:", error);
        throw error;
    }
};