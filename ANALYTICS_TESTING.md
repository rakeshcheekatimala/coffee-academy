# Google Analytics Testing Guide

This guide explains how to test Google Analytics integration locally before deploying to Vercel.

## Prerequisites

1. **Google Analytics ID**: Ensure you have your GA Measurement ID in your `.env` file:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Google Analytics Account**: Make sure you have access to your Google Analytics property.

## Local Testing Methods

### Method 1: Browser Developer Tools (Recommended)

This is the easiest way to verify analytics events are firing correctly.

#### Steps:

1. **Start your development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser's Developer Tools**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
   - Safari: Enable Developer menu in Preferences, then press `Cmd+Option+I`

3. **Open the Network tab**:
   - Filter by "collect" or "google-analytics" to see GA requests
   - Look for requests to `www.google-analytics.com/g/collect` or `www.googletagmanager.com`

4. **Open the Console tab**:
   - Check for any errors related to Google Analytics
   - You can also add this code to manually test events:
   ```javascript
   // Test if GA is loaded
   console.log('GA loaded:', typeof window.gtag !== 'undefined');
   ```

5. **Test Events**:
   - Click on CTAs, links, and buttons throughout your app
   - Watch the Network tab for new requests being sent to Google Analytics
   - Each event should create a new network request

### Method 2: Google Analytics DebugView (Real-time)

This method shows events in real-time in your GA dashboard.

#### Steps:

1. **Enable DebugView in Google Analytics**:
   - Go to your Google Analytics property
   - Navigate to Admin → DebugView
   - If you don't see DebugView, you may need to enable it in your GA4 property settings

2. **Install Google Analytics Debugger Extension** (Chrome):
   - Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
   - Enable it while browsing your local site

3. **Alternative: Use gtag debug mode**:
   Add this to your browser console:
   ```javascript
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'YOUR_GA_ID', {
     debug_mode: true
   });
   ```

4. **View Events in Real-time**:
   - Open DebugView in your GA dashboard
   - Interact with your app (click CTAs, navigate, etc.)
   - Events should appear in DebugView within a few seconds

### Method 3: Browser Console Logging

Add temporary logging to verify events are being called.

#### Steps:

1. **Modify `lib/utils/analytics.ts`** temporarily to add console logs:
   ```typescript
   export function trackCTAClick(ctaText: string, ctaLocation: string, destination: string) {
     console.log('🔵 GA Event - CTA Click:', { ctaText, ctaLocation, destination });
     sendGAEvent('event', 'cta_click', {
       cta_text: ctaText,
       cta_location: ctaLocation,
       destination: destination,
     });
   }
   ```

2. **Test your app**:
   - Click various CTAs and links
   - Check the console for the log messages
   - Verify the correct data is being sent

3. **Remove console logs** before committing to production

### Method 4: Google Tag Assistant (Chrome Extension)

This extension helps verify that Google Analytics is properly configured.

#### Steps:

1. **Install Google Tag Assistant**:
   - Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

2. **Enable Tag Assistant**:
   - Click the extension icon
   - Click "Enable" to start recording

3. **Navigate your site**:
   - Browse your local development site
   - Click CTAs and links
   - Tag Assistant will show which tags fired and any errors

4. **Review the report**:
   - Check for any warnings or errors
   - Verify all expected events are firing

## Testing Checklist

Before deploying to Vercel, verify the following:

### ✅ Basic Setup
- [ ] GA Measurement ID is set in `.env` file
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable is accessible
- [ ] Google Analytics script loads without errors (check browser console)
- [ ] No console errors related to GA

### ✅ Page Views
- [ ] Page views are tracked automatically (GA handles this by default)
- [ ] Navigation between pages triggers page views

### ✅ Navigation Tracking
- [ ] Header navigation links are tracked
- [ ] Mobile menu links are tracked
- [ ] Logo click is tracked
- [ ] Check Network tab for `navigation_click` events

### ✅ CTA Tracking
- [ ] Hero section CTAs are tracked
- [ ] Journey page CTAs are tracked
- [ ] Article bottom CTAs are tracked
- [ ] Homepage spotlight card CTAs are tracked
- [ ] Check Network tab for `cta_click` events with correct parameters

### ✅ Recipe Tracking
- [ ] Recipe card clicks are tracked
- [ ] Recipe detail page views are tracked
- [ ] Check Network tab for `recipe_click` and `recipe_view` events

### ✅ Level Tracking
- [ ] Level card clicks are tracked
- [ ] Level detail page views are tracked
- [ ] Check Network tab for `level_click` and `level_view` events

### ✅ Share Tracking
- [ ] Share buttons are tracked (Twitter, Facebook, LinkedIn, etc.)
- [ ] Copy link functionality is tracked
- [ ] Check Network tab for `share` events

### ✅ Wizard/Quiz Tracking
- [ ] Wizard start is tracked
- [ ] Wizard steps are tracked
- [ ] Wizard completion is tracked
- [ ] Quiz interactions are tracked

## Common Issues and Solutions

### Issue: Events not appearing in GA

**Solution**:
1. Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify the GA ID format (should start with `G-`)
3. Check browser console for errors
4. Ensure you're not using an ad blocker (they can block GA)
5. Check Network tab to see if requests are being sent

### Issue: Events firing multiple times

**Solution**:
1. Check if React Strict Mode is causing double renders (this is normal in development)
2. Verify event handlers aren't being attached multiple times
3. Check for duplicate GA script tags

### Issue: Events missing parameters

**Solution**:
1. Check the analytics utility functions are being called with all required parameters
2. Verify the event structure matches GA4 requirements
3. Check browser console for any errors

## Testing in Production (Vercel)

After deploying to Vercel:

1. **Set Environment Variable in Vercel**:
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` with your GA ID
   - **Redeploy is required** (env vars are injected at build time)

2. **Verify in Real-time Reports**:
   - Go to Google Analytics → Reports → Real-time
   - Visit your deployed site
   - Interact with CTAs and links
   - Events should appear in Real-time reports within seconds

3. **Verify the GA script is actually present in production HTML**:
   - Open `view-source:` for your deployed home page
   - Search for `googletagmanager.com/gtag/js?id=G-`
   - If you **don’t** find it, your build did not receive `NEXT_PUBLIC_GA_MEASUREMENT_ID` (most commonly: no redeploy, wrong environment selected, or a different project)

4. **Verify requests are being sent**:
   - Open DevTools → Network tab
   - Filter by `collect` or `google`
   - Click any CTA/link and confirm requests to GA endpoints (e.g. `g/collect`)

3. **Use GA4 DebugView**:
   - Enable DebugView in GA4
   - Use the Google Analytics Debugger extension
   - Test your production site

## Event Reference

Here are the events being tracked:

| Event Name | Parameters | Triggered When |
|------------|-----------|----------------|
| `navigation_click` | `link_name`, `link_location` | User clicks navigation link |
| `cta_click` | `cta_text`, `cta_location`, `destination` | User clicks a CTA button |
| `recipe_click` | `recipe_id`, `recipe_title`, `source` | User clicks a recipe card |
| `recipe_view` | `recipe_id`, `recipe_title`, `category` | User views a recipe page |
| `level_click` | `level_id`, `level_title`, `source` | User clicks a level card |
| `level_view` | `level_id`, `level_title` | User views a level page |
| `share` | `method`, `content_type`, `content_id` | User shares content |
| `wizard_start` | - | User starts the wizard |
| `wizard_step` | `step_number`, `step_id`, `selected_value` | User completes a wizard step |
| `wizard_complete` | `experience`, `intensity`, `flavor_notes` | User completes the wizard |
| `quiz_start` | - | User starts a quiz |
| `quiz_answer` | `question_id`, `answer`, `question_number` | User answers a quiz question |
| `quiz_complete` | `profile` | User completes a quiz |
| `article_view` | `article_slug`, `article_title` | User views an article |
| `article_click` | `article_slug`, `source` | User clicks an article card |
| `search` | `search_term`, `results_count`, `category` | User performs a search |
| `filter_change` | `filter_name`, `filter_value` | User changes a filter |

## Quick Test Script

Run this in your browser console to test if GA is working:

```javascript
// Check if GA is loaded
console.log('GA loaded:', typeof window.gtag !== 'undefined');

// Manually trigger a test event
if (typeof window.gtag !== 'undefined') {
  window.gtag('event', 'test_event', {
    test_param: 'test_value'
  });
  console.log('✅ Test event sent!');
} else {
  console.error('❌ GA not loaded. Check your NEXT_PUBLIC_GA_MEASUREMENT_ID');
}
```

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Third-Party Scripts](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-scripts)
- [GA4 DebugView Guide](https://support.google.com/analytics/answer/7201382)

