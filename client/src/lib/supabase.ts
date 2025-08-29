// Mock Supabase client for static deployment
// This prevents environment variable errors while we migrate to static data

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({ eq: () => ({ order: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) }),
    insert: () => ({ select: () => Promise.resolve({ data: null, error: null }) }),
    update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: null, error: null }) }) })
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      remove: () => Promise.resolve({ error: null })
    })
  }
};

// Mock database types
export type Database = {
  public: {
    Tables: {
      quote_requests: {
        Row: any;
        Insert: any;
        Update: any;
      };
      testimonials: {
        Row: any;
        Insert: any;
        Update: any;
      };
      products: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
  };
};
