
// This file now provides mock functionality instead of a Supabase client
// You can replace this with your own backend API client

// Create a simple mock client object that can be imported but doesn't do anything
export const supabase = {
  // Mock methods that would be called in components
  auth: {
    signInWithPassword: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => ({
          data: [],
          error: null
        })
      }),
      order: () => ({
        data: [],
        error: null
      })
    }),
    insert: async () => ({ error: null }),
    update: async () => ({ error: null }),
    upsert: async () => ({ error: null }),
    delete: async () => ({ error: null })
  }),
  functions: {
    invoke: async () => ({ data: null, error: null })
  }
};
