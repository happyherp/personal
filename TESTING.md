# Testing Guide

This project uses a comprehensive testing strategy with both unit and E2E (end-to-end) tests.

## Overview

The testing suite includes:
- **Unit Tests (Jest + React Testing Library)**: Test individual components in isolation
- **E2E Tests (Playwright)**: Test complete user journeys in a real browser environment

## Running Tests

### Unit Tests (Jest + React Testing Library)

Run all unit tests once:
```bash
npm test
```

Run unit tests in watch mode for development:
```bash
npm run test:watch
```

Run unit tests with coverage report:
```bash
npm test -- --coverage
```

### E2E Tests (Playwright)

Run all E2E tests in headless mode (recommended for CI/sandbox):
```bash
npm run test:e2e
```

Run E2E tests with visible browser (for debugging):
```bash
npm run test:e2e:headed
```

Run E2E tests with interactive UI (requires GUI):
```bash
npm run test:e2e:ui
```

### Run All Tests

Run both unit and E2E tests:
```bash
npm run test:all
```

Note: E2E tests require the dev server to be running or will start it automatically.

## Test Structure

### Unit Tests
- **Location**: `components/**/__tests__/*.test.tsx`
- **Framework**: Jest + React Testing Library
- **Coverage**: Components, utilities, and business logic

Current unit tests:
- `LanguageSwitcher.test.tsx` - Tests language switching functionality
- `Header.test.tsx` - Tests navigation rendering
- `Footer.test.tsx` - Tests footer content

### E2E Tests
- **Location**: `e2e/**/*.spec.ts`
- **Framework**: Playwright
- **Coverage**: User flows, navigation, i18n, forms

Current E2E tests:
- `i18n.spec.ts` - Tests language switching across all locales
- `navigation.spec.ts` - Tests navigation between pages
- `contact.spec.ts` - Tests contact form functionality

### Test Utilities
- **Location**: `e2e/utils/test-helpers.ts`
- ** utilities**: `I18nHelper` class for cross-language testing

## Testing in Sandbox Environment

The test suite is optimized for sandbox/CI environments:

1. **Headless Mode**: All E2E tests run in headless mode by default (no GUI required)
2. **Automatic Setup**: Playwright automatically installs required browsers
3. **Isolated Tests**: Each test runs in isolation with fresh browser context
4. **No External Dependencies**: Tests don't rely on external services

## Continuous Integration

To run tests in CI/CD pipelines:

```bash
# Install dependencies (includes test browsers)
npm ci
npx playwright install --with-deps chromium

# Run all tests
npm run test:all
```

## Test Reports

### Unit Test Coverage
After running `npm test -- --coverage`, view the coverage report:
```bash
open coverage/lcov-report/index.html
```

### E2E Test Reports
After running E2E tests, view the HTML report:
```bash
open playwright-report/index.html
```

## Writing New Tests

### Adding Unit Tests

Create a test file next to the component:
```typescript
// components/MyComponent.tsx
export function MyComponent() { /* ... */ }

// components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Adding E2E Tests

Create a test file in the `e2e` directory:
```typescript
// e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/my-page');
    await expect(page.getByText('Expected Content')).toBeVisible();
  });
});
```

## Common Issues

### Jest Cannot Parse ES Modules
If you see "Jest encountered an unexpected token" errors, ensure:
1. All Next.js and TypeScript dependencies are installed
2. The Jest configuration is properly set up with `next/jest`
3. Component dependencies are properly mocked

### Playwright Tests Timeout
If E2E tests timeout:
1. Ensure the dev server starts properly (check `npm run dev`)
2. Increase timeout in `playwright.config.ts` if needed
3. Check that the baseURL matches your dev server URL

### Tests Are Flaky
If tests pass/fail inconsistently:
1. Add appropriate wait conditions (`waitForLoadState`, `waitForSelector`)
2. Use `test.retry()` for network-dependent tests
3. Ensure tests clean up properly after themselves

## Best Practices

1. **Unit Tests**: Test one thing at a time, mock external dependencies
2. **E2E Tests**: Test user flows, not implementation details
3. **i18n**: Always test in multiple languages
4. **Isolation**: Each test should be independent and not rely on others
5. **Descriptive Names**: Use clear test names that explain what is being tested

## Maintenance

- Update tests when adding new components or pages
- Update E2E tests when changing navigation or user flows
- Review translation tests when adding new language keys
- Monitor test runs in CI for flakiness
- Keep dependencies up to date

## Success Criteria

✅ All unit tests pass
✅ All E2E tests pass
✅ Coverage meets minimum thresholds (70%)
✅ Tests run successfully in CI/CD
✅ No flaky tests
✅ Documentation is up to date

## Questions?

For more information:
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Next.js Testing](https://nextjs.org/docs/testing)