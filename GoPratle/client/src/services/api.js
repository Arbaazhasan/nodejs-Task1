const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch helper with user-friendly error messages
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = json.message || `Request failed with status ${res.status}`;
      const err = new Error(errorMsg);
      err.errors = json.errors || [];
      err.status = res.status;
      throw err;
    }

    return json;
  } catch (error) {
    // If backend server is down or unreachable
    if (
      error.name === 'TypeError' &&
      (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed'))
    ) {
      const helpfulError = new Error(
        'Backend server is not running on port 5000. Please open a terminal and run "npm run dev:backend" to start the Express backend.'
      );
      helpfulError.isConnectionError = true;
      throw helpfulError;
    }

    throw error;
  }
}

export const api = {
  // Requirement endpoints
  postRequirement: (data) =>
    request('/requirements', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getRequirements: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/requirements${queryString}`, { method: 'GET' });
  },

  getRequirementById: (id) =>
    request(`/requirements/${id}`, { method: 'GET' }),

  getRequirementStats: () =>
    request('/requirements/stats', { method: 'GET' }),

  updateStatus: (id, status) =>
    request(`/requirements/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  checkHealth: () =>
    request('/health', { method: 'GET' }),
};

export default api;
