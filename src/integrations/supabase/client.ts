
// This file provides mock functionality instead of a Supabase client
// You can replace this with your own backend API client implementation

// Create a mock client object that mimics the Supabase client API structure
export const supabase = {
  // Mock auth methods
  auth: {
    signInWithPassword: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    })
  },
  
  // Mock database methods
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        order: (column: string, options?: { ascending?: boolean }) => ({
          data: [],
          error: null
        }),
        data: null,
        error: null
      }),
      gte: (column: string, value: any) => ({
        order: (column: string, options?: { ascending?: boolean }) => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      order: (column: string, options?: { ascending?: boolean }) => ({
        data: [],
        error: null
      }),
      count: (options?: { exact?: boolean, head?: boolean }) => ({
        eq: (column: string, value: any) => ({
          data: 0,
          count: 0,
          error: null
        }),
        data: 0,
        count: 0,
        error: null
      }),
      data: [],
      error: null
    }),
    insert: async (data: any) => ({ data: null, error: null }),
    update: async (data: any) => ({ data: null, error: null }),
    upsert: async (data: any) => ({ data: null, error: null }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        data: null,
        error: null
      }),
      data: null,
      error: null
    })
  }),
  
  // Mock storage methods
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: any) => ({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } })
    })
  },
  
  // Mock functions
  functions: {
    invoke: async (name: string, options?: any) => ({ data: null, error: null })
  }
};
