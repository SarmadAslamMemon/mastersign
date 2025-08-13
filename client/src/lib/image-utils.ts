/**
 * Utility functions for handling Supabase image URLs
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL_DEV || import.meta.env.VITE_IMAGE_BASE_URL_PROD;

/**
 * Get Supabase storage URL for an image
 */
export function getSupabaseImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, construct Supabase URL
  if (imagePath.startsWith('/')) {
    imagePath = imagePath.slice(1);
  }
  
  // Encode the path for URL safety
  const encodedPath = encodeURIComponent(imagePath);
  
  return `${IMAGE_BASE_URL}/${encodedPath}`;
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  imagePath: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): string {
  const baseUrl = getSupabaseImageUrl(imagePath);
  
  if (!baseUrl || !SUPABASE_URL) return baseUrl;
  
  // Add transformation parameters
  const params = new URLSearchParams();
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  if (options.format) params.append('format', options.format);
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Preload image for better performance
 */
export function preloadImage(imagePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = getSupabaseImageUrl(imagePath);
  });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(imagePaths: string[]): Promise<void> {
  const promises = imagePaths.map(path => preloadImage(path));
  await Promise.allSettled(promises);
}

/**
 * Check if an image URL is from Supabase
 */
export function isSupabaseImageUrl(url: string): boolean {
  return url.includes('supabase.co') && url.includes('storage');
}

/**
 * Extract image path from Supabase URL
 */
export function extractImagePathFromSupabaseUrl(url: string): string | null {
  if (!isSupabaseImageUrl(url)) return null;
  
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'public');
    
    if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
      return pathParts.slice(bucketIndex + 1).join('/');
    }
  } catch (error) {
    console.error('Error parsing Supabase URL:', error);
  }
  
  return null;
}
