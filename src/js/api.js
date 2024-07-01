const API_URL = 'http://localhost:3000';

async function handleFetchResponse(response) {
  if (!response.ok) {
    const message = `An error has occurred: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  return response.json();
}

export async function fetchTickets() {
  try {
    const response = await fetch(`${API_URL}/api/tickets`);
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    throw error;
  }
}

export async function fetchTicketDetails(id) {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${id}`);
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to fetch ticket details:', error);
    throw error;
  }
}

export async function createTicket(ticket) {
  try {
    const response = await fetch(`${API_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    });
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to create ticket:', error);
    throw error;
  }
}

export async function updateTicket(id, ticket) {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    });
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to update ticket:', error);
    throw error;
  }
}

export async function deleteTicket(id) {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${id}`, {
      method: 'DELETE'
    });
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to delete ticket:', error);
    throw error;
  }
}

export async function toggleTicketStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    return await handleFetchResponse(response);
  } catch (error) {
    console.error('Failed to toggle ticket status:', error);
    throw error;
  }
}
