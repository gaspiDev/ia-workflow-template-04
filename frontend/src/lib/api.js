const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export async function getHistory() {
  const response = await fetch(`${API_BASE_URL}/chat/history`);
  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }
  return response.json();
}

export async function clearHistory() {
  const response = await fetch(`${API_BASE_URL}/chat/history`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to clear chat history");
  }
  return true;
}

/**
 * Mocking the query endpoint until STORY-004 is implemented.
 * This function will eventually call POST /chat/query
 */
export async function sendQuery(query) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // For now, return a mock response
  return {
    role: "assistant",
    content: `I received your message: "${query}". I'm currently in 'UI mode'. Once the backend is ready, I'll be able to answer questions about shops, sales, and more!`
  };
}
