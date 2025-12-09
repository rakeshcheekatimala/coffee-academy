# E2E Tests - Coffee Academy

This directory contains end-to-end tests for the Coffee Academy application using Playwright.

## Test Structure

Tests are organized by feature area:

- `navigation.spec.ts` - Navigation and layout tests
- `homepage.spec.ts` - Homepage functionality tests
- `levels.spec.ts` - Learning levels system tests
- `recipes.spec.ts` - Recipe browsing and detail tests
- `articles.spec.ts` - Article browsing and reading tests
- `quiz.spec.ts` - Interactive quiz tests
- `wizard.spec.ts` - Coffee finder wizard tests
- `community.spec.ts` - Community features tests
- `forms.spec.ts` - Form submission tests
- `search-filter.spec.ts` - Search and filtering tests
- `glossary.spec.ts` - Glossary functionality tests
- `recommendations.spec.ts` - Coffee recommendations tests
- `explore.spec.ts` - Explore page tests
- `profile.spec.ts` - User profile tests
- `brew-of-the-week.spec.ts` - Featured brew tests
- `analytics.spec.ts` - Google Analytics tracking tests
- `responsive.spec.ts` - Responsive design tests
- `error-handling.spec.ts` - Error handling and edge cases

## Running Tests

### Run all tests
```bash
yarn test:e2e
```

### Run tests in UI mode (interactive)
```bash
yarn test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
yarn test:e2e:headed
```

### Run tests in debug mode
```bash
yarn test:e2e:debug
```

### Run specific test file
```bash
npx playwright test e2e/navigation.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
```

## Test Coverage

These tests cover all acceptance criteria defined in `acceptancecriteria.md`:

- ✅ Navigation & Layout (AC-1.1 to AC-1.4)
- ✅ Homepage (AC-2.1 to AC-2.3)
- ✅ Levels System (AC-3.1 to AC-3.5)
- ✅ Recipes (AC-4.1 to AC-4.6)
- ✅ Articles (AC-5.1 to AC-5.6)
- ✅ Quiz (AC-6.1 to AC-6.4)
- ✅ Wizard (AC-7.1 to AC-7.6)
- ✅ Community (AC-8.1 to AC-8.6)
- ✅ Form Submissions (AC-9.1 to AC-9.8)
- ✅ Glossary (AC-10.1 to AC-10.4)
- ✅ Recommendations (AC-11.1 to AC-11.3)
- ✅ Explore Page (AC-12.1 to AC-12.2)
- ✅ Profile (AC-13.1 to AC-13.5)
- ✅ Brew of the Week (AC-14.1 to AC-14.2)
- ✅ Analytics Tracking (AC-15.1 to AC-15.17)
- ✅ Error Handling (AC-16.1 to AC-16.5)
- ✅ Responsive Design (AC-17.1 to AC-17.4)

## Configuration

Test configuration is in `playwright.config.ts`. The default setup:

- Base URL: `http://localhost:3000`
- Automatically starts dev server before tests
- Runs tests in parallel
- Generates HTML reports
- Screenshots on failure
- Traces on retry

## Environment Variables

Set `PLAYWRIGHT_TEST_BASE_URL` to override the base URL:

```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000 yarn test:e2e
```

## CI/CD

Tests are configured to:
- Retry failed tests 2 times on CI
- Run serially on CI
- Generate HTML reports for review

## Debugging

1. Use `yarn test:e2e:debug` for step-by-step debugging
2. Use `yarn test:e2e:ui` for interactive test runner
3. Check `playwright-report/` folder for detailed HTML reports
4. Screenshots and traces are saved on test failures


