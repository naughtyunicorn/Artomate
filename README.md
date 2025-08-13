# Artomate - AI-Powered Content Creation Suite

Artomate is a comprehensive SaaS application designed for artists (musicians, authors, content creators) to automate their social media marketing. Users upload their primary content, and AI generates a complete marketing campaign package including social media posts, video clips, and email newsletters.

## 🚀 Features

- **AI-Powered Content Generation**: Uses Google's Gemini AI to create engaging marketing content
- **Multi-Format Support**: Handles music, video, and text content
- **Complete Marketing Package**: Generates Instagram posts, video reels, and email campaigns
- **User Authentication**: Firebase Authentication with email/password and Google sign-in
- **Subscription Management**: Free tier with pay-per-campaign and pro subscription options
- **Payment Processing**: Stripe integration for monetization
- **Modern UI/UX**: Dark theme with Tailwind CSS and smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS (CDN)
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **AI Services**: Google Gemini AI, Imagen AI
- **Payments**: Stripe
- **Deployment**: Single HTML file with CDN dependencies

## 📁 Project Structure

```
Artomate/
├── index.html                 # Main HTML file with CDN dependencies
├── src/
│   ├── main.jsx              # React app entry point
│   ├── App.jsx               # Main app component with auth routing
│   ├── components/
│   │   ├── auth/             # Authentication components
│   │   ├── layout/           # Layout and navigation
│   │   ├── pages/            # Main page components
│   │   ├── campaigns/        # Content creation flow
│   │   └── ui/               # Reusable UI components
│   └── services/             # API services (Gemini, Stripe)
└── README.md                 # This file
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Artomate
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication and Firestore
4. Get your Firebase configuration
5. Update `index.html` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Configure Gemini AI

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Update `src/services/geminiService.js`:

```javascript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const IMAGEN_API_KEY = 'YOUR_IMAGEN_API_KEY';
```

### 4. Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable and secret keys
3. Create price IDs for your products
4. Update `src/services/stripeService.js`:

```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
const STRIPE_SECRET_KEY = 'sk_test_YOUR_STRIPE_SECRET_KEY';

const PRICE_IDS = {
  PER_CAMPAIGN: 'price_YOUR_PER_CAMPAIGN_PRICE_ID',
  PRO_SUBSCRIPTION: 'price_YOUR_PRO_SUBSCRIPTION_PRICE_ID'
};
```

### 5. Run the Application

Since this is a single HTML file application, you can:

1. **Local Development**: Use a local server
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Production**: Upload to any web hosting service

3. **Open in Browser**: Navigate to `http://localhost:8000`

## 🔧 Configuration Details

### Firebase Setup

1. **Authentication**: Enable Email/Password and Google sign-in methods
2. **Firestore**: Create a database with the following collections:
   - `users`: User profiles and subscription status
   - `campaigns`: Generated campaigns and content

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own campaigns
    match /campaigns/{campaignId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### Stripe Webhook Setup

Configure webhooks for:
- `checkout.session.completed`: Handle successful payments
- `customer.subscription.updated`: Handle subscription changes
- `customer.subscription.deleted`: Handle subscription cancellations

Webhook endpoint: `https://yourdomain.com/api/stripe/webhook`

## 🎨 Customization

### Brand Colors

Update colors in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',    // Your primary color
        secondary: '#22D3EE',  // Your secondary color
      }
    }
  }
}
```

### Fonts

Change fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Content Types

Add new content types in `src/components/campaigns/UploadStep.jsx`:

```javascript
const contentTypes = [
  { id: 'music', label: 'Song/Audio', icon: 'music', extensions: ['.mp3', '.wav'] },
  { id: 'video', label: 'Video', icon: 'video', extensions: ['.mp4', '.mov'] },
  { id: 'book', label: 'Text/Book', icon: 'document-text', extensions: ['.txt', '.pdf'] },
  // Add your new content type here
  { id: 'artwork', label: 'Visual Art', icon: 'image', extensions: ['.jpg', '.png'] }
];
```

## 🔒 Security Considerations

1. **API Keys**: Never expose API keys in client-side code in production
2. **Firebase Rules**: Implement proper Firestore security rules
3. **Stripe**: Use webhooks to verify payments server-side
4. **CORS**: Configure proper CORS headers for your domain
5. **Rate Limiting**: Implement rate limiting for AI generation

## 🚀 Deployment

### Static Hosting

- **Netlify**: Drag and drop the `index.html` file
- **Vercel**: Connect your repository
- **GitHub Pages**: Push to a GitHub repository
- **AWS S3**: Upload files to S3 bucket with static website hosting

### Domain Configuration

Update redirect URLs in `src/services/stripeService.js`:

```javascript
const SUCCESS_URLS = {
  PER_CAMPAIGN: 'https://yourdomain.com/campaign-success',
  SUBSCRIPTION: 'https://yourdomain.com/subscription-success'
};
```

## 🧪 Testing

### Development Mode

Use the mock implementations in the services:

```javascript
// In geminiService.js
export const generateContentWithAI = async (campaignData) => {
  // Use mock implementation for development
  return generateMockContent(campaignData);
};
```

### Production Testing

1. Test with real API keys
2. Verify Stripe webhooks
3. Test Firebase authentication
4. Validate AI content generation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the Firebase documentation
2. Review Stripe integration guides
3. Check Gemini AI documentation
4. Open an issue in the repository

## 🔮 Future Enhancements

- [ ] Advanced analytics dashboard
- [ ] Social media scheduling
- [ ] Team collaboration features
- [ ] Custom AI model training
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced video editing
- [ ] A/B testing for campaigns

## 📊 Performance Optimization

- [ ] Lazy loading for components
- [ ] Image optimization
- [ ] Code splitting
- [ ] Service worker for offline support
- [ ] CDN optimization

---

**Built with ❤️ for artists and creators everywhere** 