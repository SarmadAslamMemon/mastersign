# 🔥 SignFlow Firebase Backend

Complete Firebase backend setup for SignFlow - Professional Sign Design Platform.

## 🚀 Quick Start

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize Firebase Project
```bash
npm run setup
```

### 5. Start Development
```bash
npm run dev
```

## 📁 Project Structure

```
firebase-backend/
├── src/
│   ├── firebase-config.js    # Firebase configuration
│   ├── schema.js             # Database schema definitions
│   └── services/             # Firebase service functions
├── config/                   # Configuration files
├── public/                   # Static files for hosting
├── firebase.json            # Firebase project configuration
├── .firebaserc              # Firebase project selection
├── firestore.rules          # Database security rules
├── storage.rules            # Storage security rules
└── package.json             # Dependencies and scripts
```

## 🔧 Firebase Setup Steps

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `signflow-master-signs`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Firebase Services
1. **Authentication**: Enable Email/Password sign-in
2. **Firestore Database**: Create database in test mode
3. **Storage**: Create storage bucket
4. **Hosting**: Enable web hosting

### Step 3: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Copy the config object
5. Update `src/firebase-config.js` with your values

### Step 4: Update Project ID
1. Edit `.firebaserc`
2. Replace `signflow-master-signs` with your actual project ID

## 🗄️ Database Collections

The app uses these Firestore collections:

- **users** - User accounts and profiles
- **products** - Product catalog
- **templates** - Sign design templates
- **userDesigns** - User-created designs
- **orders** - Customer orders
- **cartItems** - Shopping cart
- **quoteRequests** - Customer quote requests
- **testimonials** - Customer reviews
- **categories** - Product categories

## 🔒 Security Rules

### Firestore Rules
- Users can only access their own data
- Products and templates are viewable by everyone
- Only admins can create/edit products and templates
- User designs are private to each user

### Storage Rules
- Product images are viewable by everyone
- User uploads are restricted to their own files
- Admin-only uploads for product/template images

## 🚀 Deployment

### Development
```bash
npm run dev          # Start emulators
```

### Production
```bash
npm run deploy       # Deploy everything
npm run deploy:hosting    # Deploy only hosting
npm run deploy:firestore # Deploy only database
npm run deploy:storage   # Deploy only storage
```

## 📱 Frontend Integration

### 1. Install Firebase SDK
```bash
npm install firebase
```

### 2. Import Configuration
```javascript
import { auth, db, storage } from './firebase-backend/src/firebase-config';
```

### 3. Use Firebase Services
```javascript
// Authentication
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
```

## 🔍 Testing

### Local Testing
```bash
npm run dev
```
This starts Firebase emulators for local development and testing.

### Emulator UI
Access the emulator UI at: `http://localhost:4000`

## 📊 Pricing

### Free Tier (Spark Plan)
- **Authentication**: 50,000 monthly active users
- **Firestore**: 1GB storage, 50,000 reads/day, 20,000 writes/day
- **Storage**: 5GB storage, 1GB/day download
- **Hosting**: 10GB storage, 360MB/day transfer

### Paid Tier (Blaze Plan)
- **Pay-as-you-go** pricing
- **For 150 users**: Estimated $0-5/month

## 🆘 Troubleshooting

### Common Issues
1. **Project not found**: Check `.firebaserc` file
2. **Permission denied**: Verify Firebase CLI login
3. **Rules not working**: Check security rules syntax
4. **Storage upload fails**: Verify storage rules

### Getting Help
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

## 🎯 Next Steps

1. **Complete Firebase setup** with your project credentials
2. **Test authentication** locally with emulators
3. **Connect frontend** to Firebase services
4. **Deploy to production** when ready

---

**SignFlow Firebase Backend** - Professional Sign Design Platform 🚀
