# Deployment Guide

This guide covers deploying Artomate to various hosting platforms and environments.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- Git repository set up
- Environment variables configured
- API keys for Firebase, Gemini AI, and Stripe

### Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the `dist/` directory
```

## 🌐 Hosting Platforms

### 1. GitHub Pages (Free)

#### Automatic Deployment (Recommended)

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** - deployment happens automatically

The GitHub Actions workflow in `.github/workflows/deploy.yml` will:
- Build the project
- Deploy to GitHub Pages
- Update on every push to main

#### Manual Deployment

```bash
# Build the project
npm run build

# Push the dist folder to gh-pages branch
npx gh-pages -d dist
```

#### Custom Domain

1. Add your domain to repository settings
2. Create a `CNAME` file in the `public/` directory:
   ```
   yourdomain.com
   ```
3. Configure DNS records:
   ```
   CNAME yourdomain.com username.github.io
   ```

### 2. Netlify (Free Tier)

#### Drag & Drop Deployment

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist/` folder
3. Your site is live instantly

#### Git Integration

1. **Connect your GitHub repository**
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables**:
   - Add your API keys in Netlify dashboard
4. **Deploy automatically** on every push

#### Custom Domain & HTTPS

- Netlify provides free SSL certificates
- Add custom domain in site settings
- Automatic HTTPS redirects

### 3. Vercel (Free Tier)

#### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# Set build command: npm run build
# Set output directory: dist
```

#### Git Integration

1. **Import your GitHub repository**
2. **Framework preset**: Other
3. **Build settings**:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Environment variables**: Add your API keys

#### Automatic Deployments

- Deploys on every push to main
- Preview deployments for pull requests
- Automatic HTTPS and CDN

### 4. AWS S3 + CloudFront

#### S3 Setup

```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://your-artomate-bucket

# Enable static website hosting
aws s3 website s3://your-artomate-bucket --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://your-artomate-bucket --delete
```

#### CloudFront Distribution

1. **Create CloudFront distribution**
2. **Origin**: Your S3 bucket
3. **Behaviors**: Cache based on file type
4. **Custom domain**: Add your domain
5. **SSL certificate**: Request from ACM

#### CI/CD Pipeline

```yaml
# .github/workflows/deploy-aws.yml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://your-bucket --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

### 5. Firebase Hosting

#### Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Select your project and set public directory to 'dist'
```

#### Deploy

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

#### Configuration

```json
// firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# .env.production
NODE_ENV=production
VITE_APP_URL=https://yourdomain.com
VITE_FIREBASE_API_KEY=your_production_key
VITE_GEMINI_API_KEY=your_production_key
VITE_STRIPE_PUBLISHABLE_KEY=your_production_key
```

### Build Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    }
  }
});
```

## 🔒 Security Considerations

### HTTPS Enforcement

```javascript
// Force HTTPS in production
if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
  window.location.href = window.location.href.replace('http:', 'https:');
}
```

### Content Security Policy

```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://firebase.googleapis.com https://generativelanguage.googleapis.com https://api.stripe.com;
">
```

### API Key Security

- Never expose API keys in client-side code
- Use environment variables
- Implement server-side proxy for sensitive operations
- Use Firebase Functions for secure operations

## 📊 Performance Optimization

### Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          stripe: ['@stripe/stripe-js']
        }
      }
    }
  }
});
```

### CDN Configuration

```javascript
// Use CDN for static assets
const CDN_URL = 'https://your-cdn.com';
const assetUrl = (path) => `${CDN_URL}${path}`;
```

### Caching Strategy

```javascript
// Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] All tests pass locally
- [ ] Build completes without errors
- [ ] Environment variables are set
- [ ] API keys are valid
- [ ] Database connections work
- [ ] Payment processing works

### Post-deployment Testing

- [ ] Site loads correctly
- [ ] Authentication works
- [ ] AI generation functions
- [ ] Payment processing works
- [ ] Mobile responsiveness
- [ ] Performance metrics

### Monitoring

```javascript
// Add analytics and monitoring
import { analytics } from './services/analytics';

// Track page views
analytics.trackPageView();

// Track user actions
analytics.trackEvent('campaign_created', {
  contentType: 'music',
  userId: user.uid
});
```

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Environment Variables
```bash
# Check if variables are loaded
console.log(import.meta.env.VITE_APP_URL);

# Verify in build output
grep -r "your_api_key" dist/
```

#### CORS Issues
```javascript
// Configure CORS in your API
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:3000'],
  credentials: true
}));
```

#### 404 Errors (SPA)
```javascript
// Configure redirects for SPA
// All routes should serve index.html
{
  "source": "**",
  "destination": "/index.html"
}
```

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://create-react-app.dev/docs/deployment/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

---

**Need help with deployment? Check our [Support Guide](SUPPORT.md) or open an issue on GitHub.**
