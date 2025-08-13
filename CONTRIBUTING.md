# Contributing to Artomate

Thank you for your interest in contributing to Artomate! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- A GitHub account

### Setting Up the Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/artomate.git
   cd artomate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your API keys
   nano .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Development Workflow

### Code Style

We use ESLint and Prettier to maintain code quality:

- **ESLint**: Catches potential errors and enforces coding standards
- **Prettier**: Ensures consistent code formatting

Run these commands before committing:
```bash
npm run lint      # Check for linting errors
npm run format    # Format code with Prettier
```

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Test your changes thoroughly

3. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(auth): add Google OAuth login`
- `fix(ui): resolve button alignment issue`
- `docs(readme): update installation instructions`

## 🧪 Testing

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Writing Tests

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Use descriptive test names

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Code is properly documented
- [ ] No console.log statements in production code
- [ ] Environment variables are properly configured

### Pull Request Template

Use the provided PR template and fill out all sections:

- **Description**: What does this PR do?
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Testing**: How was this tested?
- **Screenshots**: If applicable, include screenshots

### Review Process

1. **Automated checks** must pass
2. **Code review** from maintainers
3. **Approval** from at least one maintainer
4. **Merge** after approval

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the problem
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

### Feature Requests

For feature requests:

- **Description**: What feature would you like?
- **Use case**: How would this feature be used?
- **Alternatives**: Are there existing alternatives?

## 🏗️ Project Structure

```
artomate/
├── src/
│   ├── components/     # React components
│   ├── services/       # API and external services
│   ├── utils/          # Utility functions
│   └── styles/         # CSS and styling
├── public/             # Static assets
├── tests/              # Test files
└── docs/               # Documentation
```

## 🔒 Security

- **Never commit API keys** or sensitive information
- **Use environment variables** for configuration
- **Report security issues** privately to maintainers
- **Follow security best practices** in your code

## 📚 Documentation

- **Update README.md** for user-facing changes
- **Add JSDoc comments** for new functions
- **Update API documentation** if applicable
- **Include examples** for new features

## 🎯 Areas for Contribution

### High Priority
- [ ] Unit tests for existing components
- [ ] Error handling improvements
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Medium Priority
- [ ] Additional content types
- [ ] UI/UX enhancements
- [ ] Internationalization support
- [ ] Mobile responsiveness

### Low Priority
- [ ] Documentation improvements
- [ ] Code refactoring
- [ ] Developer experience tools

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Help others** when possible
- **Provide constructive feedback**
- **Follow the project's code of conduct**

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Discord**: Join our community server
- **Email**: For private matters

## 🏆 Recognition

Contributors are recognized in:

- **README.md** contributors section
- **GitHub** contributors page
- **Release notes** for significant contributions
- **Project documentation**

## 📄 License

By contributing to Artomate, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Artomate! 🎉
