# API Documentation

This document describes the APIs and services used in Artomate.

## 🔥 Firebase Services

### Authentication

Firebase Authentication provides user management and authentication.

#### Sign Up
```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
```

#### Sign In
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
```

#### Google Sign In
```javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};
```

### Firestore Database

Firestore provides NoSQL document storage for user data and campaigns.

#### User Collection
```javascript
// User document structure
{
  uid: "user123",
  email: "user@example.com",
  displayName: "John Doe",
  subscription: {
    plan: "free", // "free", "pro"
    status: "active", // "active", "cancelled", "expired"
    expiresAt: "2024-12-31T23:59:59Z"
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

#### Campaign Collection
```javascript
// Campaign document structure
{
  id: "campaign123",
  userId: "user123",
  title: "Summer Music Campaign",
  contentType: "music", // "music", "video", "text"
  status: "completed", // "processing", "completed", "failed"
  content: {
    originalFile: "path/to/original.mp3",
    generatedContent: {
      socialPosts: [...],
      videoClips: [...],
      emailNewsletter: "..."
    }
  },
  aiModel: "gemini-pro",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

## 🤖 Google Gemini AI

### Content Generation

Gemini AI generates marketing content based on uploaded files.

#### Generate Social Media Posts
```javascript
const generateSocialPosts = async (content, context) => {
  const prompt = `
    Generate 5 engaging social media posts for ${context.platform} 
    based on this content: ${content}
    
    Requirements:
    - Platform: ${context.platform}
    - Tone: ${context.tone}
    - Hashtags: Include relevant hashtags
    - Length: ${context.maxLength} characters
  `;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  return response.json();
};
```

#### Generate Video Scripts
```javascript
const generateVideoScript = async (content, duration) => {
  const prompt = `
    Create a ${duration}-second video script for social media 
    based on this content: ${content}
    
    Include:
    - Hook (first 3 seconds)
    - Main content
    - Call to action
    - Visual suggestions
  `;

  // Implementation similar to generateSocialPosts
};
```

### Image Generation (Imagen)

Imagen generates visual content for campaigns.

```javascript
const generateImage = async (prompt, style) => {
  const response = await fetch(`https://imagen.googleapis.com/v1/images:generate?key=${IMAGEN_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
      sampleImageStyle: style,
      aspectRatio: "1:1",
      safetyFilterLevel: "block_some"
    })
  });

  return response.json();
};
```

## 💳 Stripe Integration

### Payment Processing

Stripe handles all payment processing and subscription management.

#### Create Checkout Session
```javascript
const createCheckoutSession = async (priceId, successUrl, cancelUrl) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
      successUrl: successUrl,
      cancelUrl: cancelUrl
    })
  });

  return response.json();
};
```

#### Handle Webhooks
```javascript
// Server-side webhook handling
app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
  }

  res.json({ received: true });
});
```

## 🔐 Security

### API Key Management

- Never expose API keys in client-side code
- Use environment variables for configuration
- Implement proper CORS policies
- Validate all user inputs

### Rate Limiting

```javascript
// Example rate limiting implementation
const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
};
```

### Input Validation

```javascript
const validateContent = (content) => {
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid content format');
  }
  
  if (content.length > 10000) {
    throw new Error('Content too long');
  }
  
  // Sanitize content to prevent XSS
  return DOMPurify.sanitize(content);
};
```

## 📊 Error Handling

### Standard Error Response

```javascript
{
  error: {
    code: "INVALID_INPUT",
    message: "Invalid input provided",
    details: {
      field: "email",
      reason: "Invalid email format"
    },
    timestamp: "2024-01-01T00:00:00Z"
  }
}
```

### Error Codes

- `AUTHENTICATION_FAILED`: User authentication failed
- `AUTHORIZATION_DENIED`: User lacks permission
- `INVALID_INPUT`: Invalid request data
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## 🧪 Testing

### API Testing

```bash
# Test Firebase Authentication
npm run test:auth

# Test Gemini AI Integration
npm run test:ai

# Test Stripe Integration
npm run test:stripe

# Test All APIs
npm run test:api
```

### Mock Data

```javascript
// Use mock data for development
const MOCK_RESPONSES = {
  gemini: {
    socialPosts: [
      "🎵 New track dropping soon! #music #newrelease",
      "Can't wait to share this with you all! 🎶"
    ]
  },
  stripe: {
    sessionId: "cs_test_1234567890"
  }
};
```

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

**For API support and questions, please refer to our [Support Guide](SUPPORT.md).**
