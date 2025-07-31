const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.error || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  
  return data;
}

// Get all ideas
export async function getIdeas(sort = 'new') {
  const response = await fetch(`${API_BASE_URL}/ideas?sort=${sort}`);
  return handleResponse(response);
}

// Create a new idea
export async function createIdea({ idea, name }) {
  const response = await fetch(`${API_BASE_URL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idea, name }),
  });
  
  return handleResponse(response);
}

// Vote for an idea
export async function voteForIdea(ideaId) {
  const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/vote`, {
    method: 'POST',
  });
  
  return handleResponse(response);
}
