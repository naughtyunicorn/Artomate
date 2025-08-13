# Support Guide

Welcome to Artomate! This guide will help you get the support you need.

## 🆘 Getting Help

### Before Asking for Help

1. **Check the Documentation**
   - [README.md](README.md) - Project overview and setup
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
   - [CHANGELOG.md](CHANGELOG.md) - Recent changes and updates

2. **Search Existing Issues**
   - Check if your question has already been answered
   - Look for similar problems in [GitHub Issues](https://github.com/treyschmitt/artomate/issues)
   - Search through [GitHub Discussions](https://github.com/treyschmitt/artomate/discussions)

3. **Check Common Problems**
   - Verify your environment meets the requirements
   - Ensure all dependencies are properly installed
   - Check that your API keys are correctly configured

## 📞 Support Channels

### 1. GitHub Issues
**Best for:** Bug reports, feature requests, and specific problems

- [Report a Bug](https://github.com/treyschmitt/artomate/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/treyschmitt/artomate/issues/new?template=feature_request.md)
- [Browse All Issues](https://github.com/treyschmitt/artomate/issues)

### 2. GitHub Discussions
**Best for:** General questions, discussions, and community help

- [Q&A](https://github.com/treyschmitt/artomate/discussions/categories/q-a)
- [General Discussion](https://github.com/treyschmitt/artomate/discussions/categories/general)
- [Show and Tell](https://github.com/treyschmitt/artomate/discussions/categories/show-and-tell)

### 3. Discord Community
**Best for:** Real-time help, quick questions, and community interaction

- [Join our Discord](https://discord.gg/artomate)
- Get instant help from community members
- Participate in live discussions and events

### 4. Email Support
**Best for:** Private matters, security issues, and business inquiries

- **General Support**: [support@artomate.com](mailto:support@artomate.com)
- **Security Issues**: [security@artomate.com](mailto:security@artomate.com)
- **Business Inquiries**: [business@artomate.com](mailto:business@artomate.com)

## 🚀 Quick Troubleshooting

### Common Setup Issues

#### Firebase Configuration
```javascript
// Check your firebaseConfig in index.html
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};
```

#### Gemini AI Setup
```javascript
// Verify your API key in src/services/geminiService.js
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
```

#### Stripe Configuration
```javascript
// Check your keys in src/services/stripeService.js
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY';
```

### Environment Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Development Server Issues

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Start development server
npm run dev
```

## 📚 Additional Resources

### Official Documentation
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community Resources
- [Stack Overflow](https://stackoverflow.com/questions/tagged/artomate)
- [Reddit r/reactjs](https://www.reddit.com/r/reactjs/)
- [Dev.to](https://dev.to/t/artomate)

### Video Tutorials
- [Getting Started with Artomate](https://youtube.com/playlist?list=...)
- [Firebase Integration Guide](https://youtube.com/watch?v=...)
- [Stripe Payment Setup](https://youtube.com/watch?v=...)

## 🏗️ Contributing to Support

### Help Others
- Answer questions in GitHub Discussions
- Help with issues in GitHub Issues
- Share your knowledge in the Discord community
- Write tutorials or documentation

### Improve Documentation
- Fix typos or errors
- Add missing information
- Improve examples and explanations
- Translate documentation to other languages

### Report Issues
- Report bugs you encounter
- Suggest improvements to the support system
- Share feedback on documentation quality

## ⏰ Response Times

We aim to respond to all support requests promptly:

- **GitHub Issues**: Within 24-48 hours
- **GitHub Discussions**: Within 12-24 hours
- **Discord**: Usually within a few hours
- **Email**: Within 24-48 hours
- **Security Issues**: Within 12 hours

## 🎯 Support Priorities

1. **Critical Issues**: Security vulnerabilities, major bugs
2. **High Priority**: Feature requests, significant improvements
3. **Medium Priority**: General questions, documentation updates
4. **Low Priority**: Minor suggestions, style improvements

## 🤝 Community Guidelines

When seeking or providing support:

- **Be respectful** and patient
- **Provide clear information** about your problem
- **Include relevant details** (error messages, code snippets, etc.)
- **Help others** when you can
- **Follow the Code of Conduct**

## 📞 Emergency Contact

For urgent matters outside of normal support channels:

- **Security Emergencies**: [security@artomate.com](mailto:security@artomate.com)
- **Service Outages**: [status@artomate.com](mailto:status@artomate.com)
- **Legal Matters**: [legal@artomate.com](mailto:legal@artomate.com)

---

**Thank you for using Artomate! We're here to help you succeed. 🚀**
