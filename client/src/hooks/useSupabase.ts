import { useState, useEffect, useCallback } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

// Auth hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }
}

// Database hooks
export function useQuoteRequests() {
  const [quoteRequests, setQuoteRequests] = useState<Database['public']['Tables']['quote_requests']['Row'][]>([])
  const [loading, setLoading] = useState(false)

  const fetchQuoteRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching quote requests:', error)
    } else {
      setQuoteRequests(data || [])
    }
    setLoading(false)
  }

  const createQuoteRequest = async (quoteData: Database['public']['Tables']['quote_requests']['Insert']) => {
    const { data, error } = await supabase
      .from('quote_requests')
      .insert(quoteData)
      .select()
    
    if (!error && data) {
      setQuoteRequests(prev => [data[0], ...prev])
    }
    
    return { data, error }
  }

  const updateQuoteRequest = async (id: string, updates: Partial<Database['public']['Tables']['quote_requests']['Update']>) => {
    const { data, error } = await supabase
      .from('quote_requests')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (!error && data) {
      setQuoteRequests(prev => prev.map(qr => qr.id === id ? data[0] : qr))
    }
    
    return { data, error }
  }

  return {
    quoteRequests,
    loading,
    fetchQuoteRequests,
    createQuoteRequest,
    updateQuoteRequest,
  }
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Database['public']['Tables']['testimonials']['Row'][]>([])
  const [loading, setLoading] = useState(false)

  const fetchTestimonials = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('featured', { ascending: false })
    
    if (error) {
      console.error('Error fetching testimonials:', error)
    } else {
      setTestimonials(data || [])
    }
    setLoading(false)
  }

  const createTestimonial = async (testimonialData: Database['public']['Tables']['testimonials']['Insert']) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonialData)
      .select()
    
    if (!error && data) {
      setTestimonials(prev => [...prev, data[0]])
    }
    
    return { data, error }
  }

  return {
    testimonials,
    loading,
    fetchTestimonials,
    createTestimonial,
  }
}

// Storage hook
export function useStorage() {
  const uploadFile = async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    
    return { data, error }
  }

  const getPublicUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  }

  const deleteFile = async (bucket: string, path: string) => {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    return { error }
  }

  return {
    uploadFile,
    getPublicUrl,
    deleteFile,
  }
}

// Products hook
export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (category: string) => {
    try {
      console.log('🔍 Fetching products for category:', category);
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Check for duplicates in the raw data
      const uniqueIds = new Set<string>();
      const duplicateIds: string[] = [];
      data?.forEach(product => {
        if (uniqueIds.has(product.id)) {
          duplicateIds.push(product.id);
        } else {
          uniqueIds.add(product.id);
        }
      });
      
      if (duplicateIds.length > 0) {
        console.warn(`⚠️ Found ${duplicateIds.length} duplicate products in database for category: ${category}`);
        console.warn('Duplicate IDs:', duplicateIds);
      }
      
      console.log(`✅ Found ${data?.length || 0} products for category: ${category}`);
      console.log(`📊 Unique products: ${uniqueIds.size}`);
      
      setProducts(data || []);
    } catch (err) {
      console.error('❌ Error fetching products by category:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove the automatic fetch of all products
  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    refetch: fetchProducts
  };
}
