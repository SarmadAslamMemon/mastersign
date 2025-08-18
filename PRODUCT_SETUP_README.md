# Product Database Setup Guide

This guide will help you set up the products table in Supabase and add 5 sample products with real images from your Master Signs project.

## 🚀 Quick Start

### 1. **Set Up Database Schema**
First, you need to create the products table in your Supabase database:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/qwwptkqqybufsbeeyvcr
2. Navigate to **"SQL Editor"** in the left sidebar
3. Copy and paste the following SQL and click **"Run"**:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10,2),
    images JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

CREATE POLICY "Products are insertable by admin users" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
```

### 2. **Get Your Service Role Key**
You need the service role key to add products:

1. In your Supabase dashboard, go to **"Settings"** → **"API"**
2. Copy the **"service_role"** key (not the anon key)
3. This key has admin privileges and can bypass RLS policies

### 3. **Update the Script**
Edit the file `scripts/add-products-simple.js`:

```javascript
// Replace this line:
const SUPABASE_SERVICE_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE';

// With your actual service role key:
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 4. **Run the Script**
Execute the script to add the 5 products:

```bash
npm run add-products
```

## 📦 Products Being Added

The script will add these 5 products with real images from your project:

### 1. **Premium Channel Letters** - $299.99
- **Category**: SIGNS
- **Images**: Business Signage Performance.jpg, Hectors_Building.jpg
- **Description**: High-quality illuminated channel letters for business storefronts

### 2. **Custom Vinyl Banner** - $129.99
- **Category**: BANNERS_FLAGS
- **Images**: MAIN Banner.jpg, Banner (1) copy.jpg
- **Description**: Weather-resistant vinyl banners for events and outdoor advertising

### 3. **Full Vehicle Wrap** - $2,499.99
- **Category**: VEHICLE_TRAILER
- **Images**: Vehicle Graphics 20240309_133150.jpg, 20230410_173103.jpg
- **Description**: Complete vehicle wrap service with professional installation

### 4. **Laser Engraved Plaque** - $89.99
- **Category**: LASER_ENGRAVING
- **Images**: Laser Engraving fish.jpg, laser-sign.jpg
- **Description**: High-precision laser engraved plaques for awards and recognition

### 5. **Trade Show Display Banner** - $399.99
- **Category**: EXPO_DISPLAY
- **Images**: Tradeshows-Expos popup1.jpg, MAIN Banner.jpg
- **Description**: Professional trade show display with retractable stand

## 🖼️ Image Sources

All images are sourced from your existing Supabase storage:
- **Business Signage**: Performance.jpg, Hectors_Building.jpg, Liberty.JPG, Dancology.jpg
- **Banners**: MAIN Banner.jpg, Banner (1) copy.jpg, Banner (3).jpg
- **Vehicle Graphics**: 20240309_133150.jpg, 20230410_173103.jpg
- **Laser Engraving**: fish.jpg, laser-sign.jpg
- **Tradeshows-Expos**: popup1.jpg

## 🔧 Technical Details

### Database Schema
```sql
products table structure:
- id: UUID (Primary Key)
- name: TEXT (Required)
- description: TEXT
- category: TEXT (Required)
- price: DECIMAL(10,2)
- images: JSONB (Array of image URLs)
- specifications: JSONB (Product specifications object)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Image Storage
- Images are stored as URLs in the `images` JSONB field
- Each product has 2 images (main image + additional view)
- All images are publicly accessible from Supabase Storage
- Images are organized by category in your storage bucket

### Categories Used
- **SIGNS**: Business signage and channel letters
- **BANNERS_FLAGS**: Vinyl banners and flags
- **VEHICLE_TRAILER**: Vehicle wraps and graphics
- **LASER_ENGRAVING**: Laser engraved items
- **EXPO_DISPLAY**: Trade show and exhibition displays

## 🚨 Troubleshooting

### Common Issues

1. **"Table 'products' does not exist"**
   - Run the SQL schema creation script first
   - Check that you're in the correct Supabase project

2. **"Permission denied"**
   - Make sure you're using the service role key (not anon key)
   - Check that RLS policies are set up correctly

3. **"Connection failed"**
   - Verify your Supabase URL is correct
   - Check that your service role key is valid
   - Ensure your Supabase project is active

4. **"Images not loading"**
   - Verify the image URLs are accessible
   - Check that your storage bucket is public
   - Ensure images exist in the specified paths

### Getting Help

- Check Supabase dashboard logs for detailed error messages
- Verify your service role key has the correct permissions
- Test the database connection manually in Supabase SQL Editor

## 📊 Verification

After running the script, you can verify the products were added:

1. **Supabase Dashboard**: Go to **"Table Editor"** → **"products"**
2. **Check Count**: Should show 5 products
3. **Verify Images**: Click on any product to see its details and images
4. **Test API**: Use the Supabase client to query products

## 🔄 Adding More Products

To add more products:

1. **Edit the Script**: Add new product objects to the `products` array
2. **Update Images**: Use existing images from your Supabase storage
3. **Run Again**: Execute `npm run add-products` (it will skip existing products)

## 🎯 Next Steps

After adding products:

1. **Test Your App**: Verify products display correctly in your React components
2. **Update Components**: Use the new product data instead of dummy data
3. **Add Product Pages**: Create detailed product view pages
4. **Implement Search**: Add product search and filtering functionality
5. **Shopping Cart**: Integrate with your existing e-commerce features

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Management](https://supabase.com/docs/guides/storage)

---

**Need Help?** Check the troubleshooting section above or refer to the main Supabase integration guide.
