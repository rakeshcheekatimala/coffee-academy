# Acceptance Criteria - Coffee Academy

## Overview
This document outlines the acceptance criteria for functional testing of the Coffee Academy application. All criteria listed here should be covered by automated end-to-end tests using Playwright.

## Test Categories

### 1. Navigation & Layout

#### AC-1.1: Header Navigation (Desktop)
- **Given** user is on any page
- **When** the page loads
- **Then** header navigation should display:
  - Logo (Coffee Academy)
  - Navigation links: Learn, Brew, Lab, Glossary
  - Light/dark theme toggle
  - "Start learning" action
  - All links should be visible and clickable

#### AC-1.2: Header Navigation (Mobile)
- **Given** user is on mobile viewport (< 768px)
- **When** the page loads
- **Then**:
  - Mobile menu button (hamburger) should be visible
  - Desktop navigation should be hidden
  - Clicking hamburger opens mobile menu
  - Mobile menu displays all navigation links
  - Clicking a link closes the menu and navigates

#### AC-1.3: Logo Navigation
- **Given** user is on any page
- **When** user clicks the logo
- **Then** user is redirected to homepage (/)

#### AC-1.4: Navigation Link Clicks
- **Given** user is on any page
- **When** user clicks a navigation link
- **Then**:
  - User is redirected to correct page
  - Page loads successfully
  - Active link is visually indicated (if applicable)

### 2. Homepage

#### AC-2.1: Homepage Load
- **Given** user visits the homepage (/)
- **When** page loads
- **Then**:
  - Hero section displays with title "Coffee, understood."
  - Hero description is visible
  - CTA button "Start with the basics" is visible
  - Pour-over brew reference is visible
  - Curriculum displays Origin, Roast, Extraction, and Taste

#### AC-2.2: Homepage CTA Buttons
- **Given** user is on homepage
- **When** user clicks:
  - "Start with the basics"
  - "Open the brew lab"
  - Curriculum links
  - Field note links
  - Final "Start learning" action
- **Then** user is redirected to correct destination page

#### AC-2.3: Theme Selection
- **Given** user is on homepage
- **When** user toggles the color theme
- **Then**:
  - The page switches between light and dark themes
  - The preference persists for future visits

### 3. Levels System

#### AC-3.1: Levels Page Load
- **Given** user visits /levels
- **When** page loads
- **Then**:
  - Hero section displays
  - All available levels are displayed in a grid
  - Each level card shows: level number, title, description

#### AC-3.2: Level Card Display
- **Given** user is on levels page
- **When** page loads
- **Then** each level card shows:
  - Level number/badge
  - Level title
  - Level description
  - Progress indicator (if applicable)
  - Clickable card

#### AC-3.3: Level Detail Page
- **Given** user clicks on a level card
- **When** level detail page loads (/levels/[levelId])
- **Then**:
  - Level title and description are displayed
  - Progress bar shows current progress
  - Level content sections are visible
  - Navigation buttons (Previous/Next/All Levels) are visible
  - Back to Home button is visible

#### AC-3.4: Level Navigation
- **Given** user is on a level detail page
- **When** user clicks:
  - "Previous Level" button
  - "Next Level" button
  - "All Levels" button
- **Then** user is redirected to correct page

#### AC-3.5: Level Progress Tracking
- **Given** user has completed levels
- **When** user visits levels page
- **Then** completed levels are visually marked (if applicable)

### 4. Recipes

#### AC-4.1: Recipes Page Load
- **Given** user visits /recipes
- **When** page loads
- **Then**:
  - Hero section displays
  - Search input is visible
  - Tabs display: All, Hot, Cold, Beginner
  - Recipe cards grid displays recipes

#### AC-4.2: Recipe Card Display
- **Given** user is on recipes page
- **When** page loads
- **Then** each recipe card shows:
  - Recipe title
  - Recipe description
  - Category badge (hot/cold/beginner)
  - Difficulty badge
  - Time, servings, grind size icons
  - Ingredients preview (first 3)
  - "View Recipe" button

#### AC-4.3: Recipe Search
- **Given** user is on recipes page
- **When** user types in search box
- **Then**:
  - Results filter in real-time
  - Results match title or description
  - Results count updates
  - Search works across all tabs

#### AC-4.4: Recipe Filter Tabs
- **Given** user is on recipes page
- **When** user clicks:
  - "All" tab
  - "Hot" tab
  - "Cold" tab
  - "Beginner" tab
- **Then**:
  - Correct filtered recipes display
  - Search still works within filtered results
  - Tab selection is visually indicated

#### AC-4.5: Recipe Detail Page
- **Given** user clicks "View Recipe" on a recipe card
- **When** recipe detail page loads (/recipes/[recipeId])
- **Then**:
  - Recipe title and description display
  - Recipe info cards show: Time, Servings, Difficulty, Grind Size
  - Ingredients section lists all ingredients with amounts
  - Tools section lists required tools
  - Step-by-step instructions display
  - Tips section displays
  - Quick Reference card shows key measurements
  - "Back to Recipes" button is visible

#### AC-4.6: Recipe Card Click Navigation
- **Given** user clicks a recipe card
- **When** navigation occurs
- **Then** user is redirected to recipe detail page

### 5. Articles

#### AC-5.1: Articles Page Load
- **Given** user visits /articles
- **When** page loads
- **Then**:
  - Hero section displays
  - Search input is visible
  - Category filter buttons display: All Topics, Coffee Basics, Brewing, Roasting, Equipment, Culture, Science
  - Featured article displays (if applicable)
  - Article grid displays articles

#### AC-5.2: Article Card Display
- **Given** user is on articles page
- **When** page loads
- **Then** each article card shows:
  - Category badge
  - Article title
  - Article excerpt
  - Read time
  - Publication date
  - Author name (if applicable)

#### AC-5.3: Article Search
- **Given** user is on articles page
- **When** user types in search box
- **Then**:
  - Results filter by title, excerpt, or tags
  - Clear button (X) appears when search has value
  - Results update in real-time
  - "No articles found" message displays when no matches

#### AC-5.4: Article Category Filter
- **Given** user is on articles page
- **When** user clicks a category button
- **Then**:
  - Only articles from that category display
  - Category description shows
  - Results count displays
  - "Clear filters" button appears

#### AC-5.5: Article Detail Page
- **Given** user clicks on an article card
- **When** article detail page loads (/articles/[slug])
- **Then**:
  - Article title displays
  - Article excerpt displays
  - Author and publication date display
  - Article content displays (formatted)
  - Tags section displays (if available)
  - Related articles section displays (if available)
  - "Back to Articles" button is visible
  - CTA section with links to Quiz and Recipes displays

#### AC-5.6: Related Articles Navigation
- **Given** user is on article detail page
- **When** related articles are displayed
- **Then** clicking a related article navigates to that article

### 6. Quiz

#### AC-6.1: Quiz Page Load
- **Given** user visits /quiz
- **When** page loads
- **Then**:
  - Hero section displays
  - First question displays
  - Progress bar shows "Question 1 of 5"
  - Answer options display

#### AC-6.2: Quiz Question Navigation
- **Given** user is on quiz page
- **When** user selects an answer option
- **Then**:
  - Next question displays automatically
  - Progress bar updates
  - Question number increments

#### AC-6.3: Quiz Completion
- **Given** user answers all 5 questions
- **When** last answer is selected
- **Then**:
  - Results page displays
  - Coffee profile displays (e.g., "Bright & Fruity Explorer")
  - Profile description displays
  - Recommendations list displays
  - "Take Quiz Again" button displays
  - "View All Recommendations" button displays

#### AC-6.4: Quiz Reset
- **Given** user is on quiz results page
- **When** user clicks "Take Quiz Again"
- **Then**:
  - Quiz resets to first question
  - All answers are cleared
  - Progress bar resets

### 7. Wizard (Coffee Finder)

#### AC-7.1: Wizard Page Load
- **Given** user visits /wizard
- **When** page loads
- **Then**:
  - Hero section displays
  - First question displays
  - Progress bar shows current step
  - Question options display

#### AC-7.2: Wizard Single Select Steps
- **Given** user is on a single-select wizard step
- **When** user selects an option
- **Then**:
  - Next step displays automatically
  - Selection is visually indicated
  - Progress bar updates

#### AC-7.3: Wizard Multi-Select Steps
- **Given** user is on a multi-select wizard step
- **When** user selects options
- **Then**:
  - Selected options are visually indicated
  - Multiple selections are allowed
  - "Continue" button becomes enabled when at least one option is selected
  - "Continue" button advances to next step

#### AC-7.4: Wizard Navigation
- **Given** user is on wizard step 2 or later
- **When** user clicks "Back" button
- **Then**:
  - Previous step displays
  - Previous selections are preserved
  - Progress bar updates

#### AC-7.5: Wizard Completion
- **Given** user completes all wizard steps
- **When** last step is completed
- **Then**:
  - Results page displays
  - Personalized recommendations display:
    - Recommended coffees (up to 3)
    - Recommended recipes (up to 3)
    - Recommended equipment (up to 3)
    - Personalized tips
  - "Save Preferences" button displays
  - "Start Over" button displays

#### AC-7.6: Wizard Reset
- **Given** user is on wizard results page
- **When** user clicks "Start Over"
- **Then** wizard resets to first step

### 10. Glossary

#### AC-10.1: Glossary Page Load
- **Given** user visits /glossary
- **When** page loads
- **Then**:
  - Hero section displays
  - Search input displays
  - Category filter dropdown displays
  - Glossary terms grid displays

#### AC-10.2: Glossary Search
- **Given** user is on glossary page
- **When** user types in search box
- **Then**:
  - Results filter by term name or definition
  - Results update in real-time
  - Results count displays

#### AC-10.3: Glossary Category Filter
- **Given** user is on glossary page
- **When** user selects a category from dropdown
- **Then**:
  - Only terms from that category display
  - Results count updates

#### AC-10.4: Glossary Term Card
- **Given** user is on glossary page
- **When** page loads
- **Then** each term card displays:
  - Term name
  - Category badge
  - Definition
  - Example (if available)

### 11. Recommendations

#### AC-11.1: Recommendations Page Load
- **Given** user visits /recommendations
- **When** page loads
- **Then**:
  - Hero section displays
  - Tabs display: Beginner, Light Roast, Medium Roast, Dark Roast
  - Coffee recommendation cards display in grid

#### AC-11.2: Recommendation Tabs
- **Given** user is on recommendations page
- **When** user clicks different tabs
- **Then**:
  - Appropriate coffee recommendations display for each roast level
  - Tab selection is visually indicated

#### AC-11.3: Recommendation Card Display
- **Given** user is on recommendations page
- **When** page loads
- **Then** each card displays:
  - Coffee name
  - Origin
  - Acidity badge
  - Body badge
  - Description
  - Flavor profile tags
  - "Best For" list

### 12. Explore Page

#### AC-12.1: Explore Page Load
- **Given** user visits /explore
- **When** page loads
- **Then**:
  - Hero section displays
  - "How to Find Good Cafés" section displays
  - "Common Menu Items Explained" section displays
  - "Understanding Coffee Terms" section displays
  - "Tips for Ordering with Confidence" section displays

#### AC-12.2: Explore Section Content
- **Given** user is on explore page
- **When** page loads
- **Then** each section displays:
  - Appropriate icons
  - Titles and descriptions
  - Content cards with information

### 14. Brew of the Week

#### AC-14.1: Brew of the Week Page Load
- **Given** user visits /brew-of-the-week
- **When** page loads
- **Then**:
  - Current featured brew displays prominently
  - Newsletter signup section displays
  - Previous brews section displays (if available)

#### AC-14.2: Newsletter Signup
- **Given** user is on brew of the week page
- **When** page loads
- **Then**:
  - Email input field displays
  - "Subscribe" button displays
  - Section explains the newsletter benefit

### 15. Analytics Tracking

#### AC-15.1: Navigation Click Tracking
- **Given** user clicks any navigation link
- **When** link is clicked
- **Then** Google Analytics event "navigation_click" is fired with correct parameters

#### AC-15.2: Recipe View Tracking
- **Given** user views a recipe detail page
- **When** page loads
- **Then** Google Analytics event "recipe_view" is fired

#### AC-15.3: Recipe Click Tracking
- **Given** user clicks a recipe card
- **When** click occurs
- **Then** Google Analytics event "recipe_click" is fired

#### AC-15.4: Level View Tracking
- **Given** user views a level detail page
- **When** page loads
- **Then** Google Analytics event "level_view" is fired

#### AC-15.5: Quiz Start Tracking
- **Given** user visits quiz page
- **When** page loads
- **Then** Google Analytics event "quiz_start" is fired

#### AC-15.6: Quiz Answer Tracking
- **Given** user answers a quiz question
- **When** answer is selected
- **Then** Google Analytics event "quiz_answer" is fired with question and answer data

#### AC-15.7: Quiz Complete Tracking
- **Given** user completes quiz
- **When** results page displays
- **Then** Google Analytics event "quiz_complete" is fired with profile data

#### AC-15.8: Wizard Start Tracking
- **Given** user visits wizard page
- **When** page loads
- **Then** Google Analytics event "wizard_start" is fired

#### AC-15.9: Wizard Step Tracking
- **Given** user completes a wizard step
- **When** step is completed
- **Then** Google Analytics event "wizard_step" is fired with step data

#### AC-15.10: Wizard Complete Tracking
- **Given** user completes wizard
- **When** results page displays
- **Then** Google Analytics event "wizard_complete" is fired with preferences data

#### AC-15.11: Search Tracking
- **Given** user performs a search
- **When** search query is entered
- **Then** Google Analytics event "search" is fired with query and results count

#### AC-15.12: Tab Change Tracking
- **Given** user changes tabs (e.g., on recipes page)
- **When** tab is clicked
- **Then** Google Analytics event "tab_change" is fired

#### AC-15.13: Brew Submission Tracking
- **Given** user submits a brew
- **When** submission is successful
- **Then** Google Analytics event "brew_submission" is fired

#### AC-15.14: Recipe Submission Tracking
- **Given** user submits a recipe
- **When** submission is successful
- **Then** Google Analytics event "recipe_submission" is fired with category and difficulty

#### AC-15.15: Article View Tracking
- **Given** user views an article
- **When** article page loads
- **Then** Google Analytics event "article_view" is fired

#### AC-15.16: Share Tracking
- **Given** user clicks a share button
- **When** share action occurs
- **Then** Google Analytics event "share" is fired with platform and content type

#### AC-15.17: CTA Click Tracking
- **Given** user clicks a CTA button
- **When** click occurs
- **Then** Google Analytics event "cta_click" is fired with CTA location and destination

### 16. Error Handling & Edge Cases

#### AC-16.1: 404 Page Not Found
- **Given** user visits invalid URL (e.g., /recipes/invalid-id)
- **When** page loads
- **Then** 404 error page displays (Next.js default or custom)

#### AC-16.2: Empty Search Results
- **Given** user performs search with no matches
- **When** search executes
- **Then**:
  - "No results found" message displays
  - Clear filters/search button displays
  - User can clear and try again

#### AC-16.3: Empty State Handling
- **Given** user views page with no content (e.g., no favorites)
- **When** page loads
- **Then**:
  - Appropriate empty state message displays
  - Call-to-action button displays (if applicable)

#### AC-16.4: Form Validation Errors
- **Given** user attempts to submit invalid form data
- **When** validation fails
- **Then**:
  - Form does not submit
  - Error indicators display (if implemented)
  - User can correct errors

#### AC-16.5: Required Field Validation
- **Given** user is on a form with required fields
- **When** required fields are empty
- **Then**:
  - Submit button is disabled (or shows error)
  - User cannot proceed until required fields are filled

### 17. Responsive Design

#### AC-17.1: Mobile Navigation
- **Given** user is on mobile viewport (< 768px)
- **When** page loads
- **Then**:
  - Mobile menu button displays
  - Desktop navigation is hidden
  - Mobile menu functions correctly

#### AC-17.2: Mobile Grid Layouts
- **Given** user is on mobile viewport
- **When** viewing pages with grids (recipes, articles, levels)
- **Then**:
  - Grid adapts to single column layout
  - Cards remain readable and clickable
  - No horizontal scrolling

#### AC-17.3: Mobile Forms
- **Given** user is on mobile viewport
- **When** viewing forms
- **Then**:
  - Form inputs are appropriately sized
  - Buttons are easily tappable
  - Form is usable without zooming

#### AC-17.4: Tablet Layout
- **Given** user is on tablet viewport (768px - 1024px)
- **When** page loads
- **Then**:
  - Layout adapts appropriately
  - Content remains readable
  - Navigation functions correctly

### 18. Performance & Loading

#### AC-18.1: Page Load Time
- **Given** user visits any page
- **When** page loads
- **Then** page loads within acceptable time (< 3 seconds on fast connection)

#### AC-18.2: Image Loading
- **Given** page contains images
- **When** page loads
- **Then** images load progressively (if lazy loading implemented)

#### AC-18.3: Content Rendering
- **Given** page contains dynamic content
- **When** page loads
- **Then** content renders without flickering (if applicable)

## Test Data Requirements

### Static Content Data
- At least 6 levels in the system
- Multiple recipes across all categories (hot, cold, beginner)
- Multiple articles across all categories
- Multiple glossary terms across categories
- Multiple coffee recommendations for each roast level
- At least one featured brew

### User-Generated Content
- Sample user profiles
- Sample user brews
- Sample user-submitted recipes
- Sample comments and reviews

### Test User Accounts
- Guest user (not logged in)
- Logged-in user with profile
- User with saved preferences
- User with favorites and history

## Browser & Device Testing

### Supported Browsers
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Testing
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

## Test Priority

### P0 - Critical Paths
- Navigation functionality
- Homepage load and CTAs
- Recipe browsing and detail view
- Level browsing and detail view
- Quiz completion flow
- Wizard completion flow

### P1 - High Priority
- Article browsing and reading
- Search and filter functionality
- Analytics event tracking

### P2 - Medium Priority
- Glossary functionality
- Recommendations page
- Explore page
- Brew of the week
- Social sharing

### P3 - Low Priority
- Edge cases
- Error handling
- Empty states
- Performance metrics

## Notes

- All tests should verify both visual elements and functional behavior
- Analytics tests should verify events are fired correctly (may require mocking GA)
- Form submissions should test both valid and invalid scenarios
- Tests should handle dynamic content appropriately
- Consider testing localStorage interactions (preferences, favorites, history)
- Mobile tests should verify touch interactions work correctly
