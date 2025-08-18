# Supabase Integration Guide

This guide explains how to set up and use Supabase with your Master Signs project.

## 🚀 Quick Start

### 1. Install Dependencies

Run these commands in your project root:

```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-react
npm install @supabase/auth-ui-react
npm install @supabase/auth-ui-shared
```

### 2. Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Create a storage bucket named `uploads` (or whatever you prefer)

### 3. Configure Environment Variables

Create a `.env` file in your project root with these variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=uploads

# Database Configuration (for Drizzle)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Environment-specific URLs
VITE_IMAGE_BASE_URL_DEV=https://your-project.supabase.co/storage/v1/object/public/uploads
VITE_IMAGE_BASE_URL_PROD=https://your-project.supabase.co/storage/v1/object/public/uploads

# Optional: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL commands

### 5. Configure Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a bucket named `uploads` (or your preferred name)
3. Set the bucket to public
4. Configure RLS policies if needed

## 📁 Project Structure

```
client/src/
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── hooks/
│   └── useSupabase.ts       # Custom hooks for Supabase operations
└── components/
    └── auth/
        ├── AuthForm.tsx      # Sign in/sign up form
        ├── ProtectedRoute.tsx # Route protection component
        └── UserProfile.tsx   # User profile display
```

## 🔐 Authentication

### Using the Auth Hook

```tsx
import { useAuth } from '@/hooks/useSupabase'

function MyComponent() {
  const { user, session, loading, signIn, signUp, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  
  if (!user) {
    return <button onClick={() => signIn('email', 'password')}>Sign In</button>
  }
  
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Protected Routes

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
    </Router>
  )
}
```

## 🗄️ Database Operations

### Quote Requests

```tsx
import { useQuoteRequests } from '@/hooks/useSupabase'

function QuoteManager() {
  const { 
    quoteRequests, 
    loading, 
    fetchQuoteRequests, 
    createQuoteRequest, 
    updateQuoteRequest 
  } = useQuoteRequests()
  
  useEffect(() => {
    fetchQuoteRequests()
  }, [])
  
  const handleCreate = async () => {
    const { error } = await createQuoteRequest({
      name: 'John Doe',
      email: 'john@example.com',
      serviceType: 'sign-making',
      description: 'Need a new sign'
    })
    
    if (error) {
      console.error('Error:', error.message)
    }
  }
  
  return (
    <div>
      {loading ? 'Loading...' : (
        <div>
          {quoteRequests.map(quote => (
            <div key={quote.id}>{quote.name} - {quote.serviceType}</div>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Testimonials

```tsx
import { useTestimonials } from '@/hooks/useSupabase'

function TestimonialManager() {
  const { testimonials, loading, fetchTestimonials, createTestimonial } = useTestimonials()
  
  // Similar usage pattern as quote requests
}
```

## 📁 File Storage

### Uploading Files

```tsx
import { useStorage } from '@/hooks/useSupabase'

function FileUploader() {
  const { uploadFile, getPublicUrl, deleteFile } = useStorage()
  
  const handleUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`
    
    // Upload to Supabase Storage
    const { error } = await uploadFile(
      'uploads', // bucket name
      `images/${fileName}`, // path
      file
    )
    
    if (error) {
      console.error('Upload failed:', error.message)
      return
    }
    
    // Get public URL
    const publicUrl = getPublicUrl('uploads', `images/${fileName}`)
    console.log('File uploaded:', publicUrl)
  }
  
  return (
    <input 
      type="file" 
      onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} 
    />
  )
}
```

## 🔒 Row Level Security (RLS)

The database schema includes RLS policies for security:

- **Quote Requests**: Anyone can view and create, only authenticated users can update
- **Testimonials**: Anyone can view, only authenticated users can create
- **Products**: Anyone can view, only admin users can create
- **Orders**: Users can only see their own orders, admins can see all

## 🚨 Error Handling

All Supabase operations return error objects that should be handled:

```tsx
const { data, error } = await supabase
  .from('table_name')
  .select('*')

if (error) {
  console.error('Database error:', error.message)
  // Handle error appropriately
  return
}

// Use data safely
console.log('Data:', data)
```

## 🔧 Configuration Options

### Supabase Client Options

```tsx
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,      // Automatically refresh auth tokens
    persistSession: true,        // Persist session in localStorage
    detectSessionInUrl: true     // Detect auth in URL for magic links
  },
  db: {
    schema: 'public'             // Default schema
  },
  global: {
    headers: {
      'X-Custom-Header': 'value' // Custom headers
    }
  }
})
```

### Storage Configuration

```tsx
// Set bucket policies
const { error } = await supabase.storage
  .from('bucket-name')
  .createSignedUrl('path/to/file', 3600) // 1 hour expiry
```

## 🧪 Testing

### Environment Setup

1. Create a test Supabase project
2. Use test environment variables
3. Run your tests against the test database

### Mocking Supabase

```tsx
// In your test files
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn()
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    })),
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
        remove: jest.fn()
      }))
    }
  }
}))
```

## 🚀 Deployment

### Environment Variables

Make sure to set all required environment variables in your deployment platform:

- Vercel: Add to project settings
- Netlify: Add to environment variables
- Docker: Use .env files or environment variables

### Database Migrations

Run database migrations before deploying:

```bash
npm run db:push
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in project root
   - Restart development server after changes
   - Check variable names match exactly

2. **Authentication Not Working**
   - Verify Supabase URL and anon key
   - Check RLS policies
   - Ensure auth is enabled in Supabase dashboard

3. **Storage Upload Fails**
   - Verify bucket exists and is public
   - Check file size limits
   - Ensure proper permissions

4. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check database is running
   - Ensure proper network access

### Getting Help

- Check Supabase dashboard logs
- Review browser console for errors
- Use Supabase community forums
- Check project GitHub issues
