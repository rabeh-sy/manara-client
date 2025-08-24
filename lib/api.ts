import { Mosque } from './types';

const API_BASE_URL = 'https://manara-service.rabeh.sy';

// Fetch all mosques
export async function fetchMosques(): Promise<Mosque[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/mosques.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for development
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch mosques: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching mosques:', error);
    throw error;
  }
}

// Fetch a specific mosque by ID
export async function fetchMosqueById(id: string): Promise<Mosque> {
  try {
    const response = await fetch(`${API_BASE_URL}/mosques/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for development
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch mosque: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching mosque with ID ${id}:`, error);
    throw error;
  }
}

// Utility function to check if the API is reachable
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/mosques.json`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}
