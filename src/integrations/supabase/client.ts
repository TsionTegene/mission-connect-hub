
// This file provides a mock API client to simulate backend interactions
// Replace with actual Node.js API client implementation when ready

// Mock API base URL - update this to your actual Node.js API URL when ready
const API_BASE_URL = '/api'; // Use relative URL for same-origin API

// Helper functions for making API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Includes cookies for session management
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { data: null, error: data.error || 'An error occurred' };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('API request failed:', error);
    return { data: null, error: 'Failed to connect to the server' };
  }
};

// Create a mock client object that mimics API client structure
export const supabase = {
  // Mock auth methods
  auth: {
    signInWithPassword: async (credentials: any) => {
      console.log("Mock auth sign in:", credentials);
      // In real implementation, this would call your Node.js auth endpoint
      return { data: null, error: null };
    },
    signUp: async (credentials: any) => {
      console.log("Mock auth sign up:", credentials);
      return { data: null, error: null };
    },
    signOut: async () => {
      console.log("Mock auth sign out");
      return { error: null };
    },
    getSession: async () => {
      console.log("Mock get session");
      return { data: { session: null } };
    },
    onAuthStateChange: (callback: Function) => {
      console.log("Mock auth state change listener");
      return {
        data: { 
          subscription: { 
            unsubscribe: () => {
              console.log("Mock unsubscribe from auth state");
            } 
          } 
        }
      };
    }
  },
  
  // Mock database methods
  from: (table: string) => ({
    select: (columns?: string) => {
      console.log(`Mock select from ${table}`, columns);
      return {
        eq: (column: string, value: any) => {
          console.log(`Mock where ${column} = ${value}`);
          return {
            single: async () => ({ data: null, error: null }),
            order: (column: string, options?: { ascending?: boolean }) => {
              console.log(`Mock order by ${column}`);
              return { data: [], error: null };
            },
            data: null,
            error: null
          };
        },
        gte: (column: string, value: any) => {
          console.log(`Mock where ${column} >= ${value}`);
          return {
            order: (column: string, options?: { ascending?: boolean }) => {
              console.log(`Mock order by ${column}`);
              return { data: [], error: null };
            },
            data: [],
            error: null
          };
        },
        order: (column: string, options?: { ascending?: boolean }) => {
          console.log(`Mock order by ${column}`);
          return { data: [], error: null };
        },
        count: (options?: { exact?: boolean, head?: boolean }) => {
          console.log(`Mock count from ${table}`);
          return {
            eq: (column: string, value: any) => {
              console.log(`Mock where ${column} = ${value}`);
              return { data: 0, count: 0, error: null };
            },
            data: 0,
            count: 0,
            error: null
          };
        },
        data: [],
        error: null
      };
    },
    insert: async (data: any) => {
      console.log(`Mock insert into ${table}:`, data);
      return { data: null, error: null };
    },
    update: async (data: any) => {
      console.log(`Mock update ${table}:`, data);
      return { data: null, error: null };
    },
    upsert: async (data: any) => {
      console.log(`Mock upsert ${table}:`, data);
      return { data: null, error: null };
    },
    delete: () => {
      console.log(`Mock delete from ${table}`);
      return {
        eq: (column: string, value: any) => {
          console.log(`Mock where ${column} = ${value}`);
          return { data: null, error: null };
        },
        data: null,
        error: null
      };
    }
  }),
  
  // Mock storage methods
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any) => {
        console.log(`Mock upload to ${bucket}/${path}`);
        return { data: null, error: null };
      },
      getPublicUrl: (path: string) => {
        console.log(`Mock get URL from ${bucket}/${path}`);
        return { data: { publicUrl: '' } };
      }
    })
  },
  
  // Mock functions
  functions: {
    invoke: async (name: string, options?: any) => {
      console.log(`Mock invoke function ${name}:`, options);
      return { data: null, error: null };
    }
  }
};

// Export a function to create an API client that can be used instead of Supabase
export const createApiClient = () => {
  return {
    get: (endpoint: string) => apiRequest(endpoint),
    post: (endpoint: string, data: any) => apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    put: (endpoint: string, data: any) => apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (endpoint: string) => apiRequest(endpoint, {
      method: 'DELETE'
    }),
    // Authentication methods that would talk to your Node.js backend
    auth: {
      login: async (email: string, password: string) => {
        return apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
      },
      register: async (userData: any) => {
        return apiRequest('/auth/register', {
          method: 'POST', 
          body: JSON.stringify(userData)
        });
      },
      logout: async () => {
        return apiRequest('/auth/logout', { method: 'POST' });
      },
      getUser: async () => {
        return apiRequest('/auth/me');
      }
    }
  };
};
