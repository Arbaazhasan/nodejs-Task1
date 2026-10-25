const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch helper with error handling
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
    console.error(`[API Error] ${endpoint}:`, error);
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
