/**
 * Google Analytics event tracking utilities
 * Provides type-safe event tracking functions for common user interactions
 */

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Track page view (typically handled automatically by GA, but can be used for custom pages)
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined') return;
  
  sendGAEvent('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Track navigation clicks
 */
export function trackNavigation(linkName: string, linkLocation: string) {
  sendGAEvent('event', 'navigation_click', {
    link_name: linkName,
    link_location: linkLocation,
  });
}

/**
 * Track recipe interactions
 */
export function trackRecipeView(recipeId: string, recipeTitle: string, category?: string) {
  sendGAEvent('event', 'recipe_view', {
    recipe_id: recipeId,
    recipe_title: recipeTitle,
    category: category,
  });
}

export function trackRecipeClick(recipeId: string, recipeTitle: string, source: string) {
  sendGAEvent('event', 'recipe_click', {
    recipe_id: recipeId,
    recipe_title: recipeTitle,
    source: source, // e.g., 'recipe_list', 'homepage', 'recommendations'
  });
}

/**
 * Track level interactions
 */
export function trackLevelView(levelId: number, levelTitle: string) {
  sendGAEvent('event', 'level_view', {
    level_id: levelId.toString(),
    level_title: levelTitle,
  });
}

export function trackLevelNavigation(direction: 'next' | 'previous', fromLevel: number, toLevel: number) {
  sendGAEvent('event', 'level_navigation', {
    direction: direction,
    from_level: fromLevel.toString(),
    to_level: toLevel.toString(),
  });
}

export function trackLevelCompletion(levelId: number, levelTitle: string) {
  sendGAEvent('event', 'level_completion', {
    level_id: levelId.toString(),
    level_title: levelTitle,
  });
}

/**
 * Track quiz interactions
 */
export function trackQuizStart() {
  sendGAEvent('event', 'quiz_start');
}

export function trackQuizAnswer(questionId: string, answer: string, questionNumber: number) {
  sendGAEvent('event', 'quiz_answer', {
    question_id: questionId,
    answer: answer,
    question_number: questionNumber,
  });
}

export function trackQuizComplete(profile: string) {
  sendGAEvent('event', 'quiz_complete', {
    profile: profile,
  });
}

/**
 * Track wizard interactions
 */
export function trackWizardStart() {
  sendGAEvent('event', 'wizard_start');
}

export function trackWizardStep(stepNumber: number, stepId: string, selectedValue: string | string[]) {
  sendGAEvent('event', 'wizard_step', {
    step_number: stepNumber,
    step_id: stepId,
    selected_value: Array.isArray(selectedValue) ? selectedValue.join(',') : selectedValue,
  });
}

export function trackWizardComplete(preferences: Record<string, string | string[] | undefined>) {
  sendGAEvent('event', 'wizard_complete', {
    experience: typeof preferences.experience === 'string' ? preferences.experience : '',
    intensity: typeof preferences.intensity === 'string' ? preferences.intensity : '',
    flavor_notes: Array.isArray(preferences.flavorNotes) ? preferences.flavorNotes.join(',') : '',
  });
}

/**
 * Track search interactions
 */
export function trackSearch(query: string, resultsCount?: number, category?: string) {
  sendGAEvent('event', 'search', {
    search_term: query,
    results_count: resultsCount || 0,
    category: category || '',
  });
}

export function trackFilterChange(filterName: string, filterValue: string) {
  sendGAEvent('event', 'filter_change', {
    filter_name: filterName,
    filter_value: filterValue,
  });
}

/**
 * Track community interactions
 */
export function trackBrewSubmission(recipeId?: string) {
  sendGAEvent('event', 'brew_submission', {
    recipe_id: recipeId || '',
  });
}

export function trackRecipeSubmission(category: string, difficulty: string) {
  sendGAEvent('event', 'recipe_submission', {
    category: category,
    difficulty: difficulty,
  });
}

export function trackBrewLike(brewId: string) {
  sendGAEvent('event', 'brew_like', {
    brew_id: brewId,
  });
}

export function trackComment(commentType: 'comment' | 'reply', parentId?: string) {
  sendGAEvent('event', 'comment', {
    comment_type: commentType,
    parent_id: parentId || '',
  });
}

export function trackReviewSubmission(rating: number, recipeId?: string) {
  sendGAEvent('event', 'review_submission', {
    rating: rating,
    recipe_id: recipeId || '',
  });
}

/**
 * Track article interactions
 */
export function trackArticleView(articleSlug: string, articleTitle: string) {
  sendGAEvent('event', 'article_view', {
    article_slug: articleSlug,
    article_title: articleTitle,
  });
}

export function trackArticleClick(articleSlug: string, source: string) {
  sendGAEvent('event', 'article_click', {
    article_slug: articleSlug,
    source: source,
  });
}

/**
 * Track sharing interactions
 */
export function trackShare(platform: string, contentType: 'recipe' | 'article' | 'brew', contentId: string) {
  sendGAEvent('event', 'share', {
    method: platform, // 'twitter', 'facebook', 'linkedin', 'whatsapp', 'email', 'copy_link'
    content_type: contentType,
    content_id: contentId,
  });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaText: string, ctaLocation: string, destination: string) {
  sendGAEvent('event', 'cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    destination: destination,
  });
}

/**
 * Track tab changes
 */
export function trackTabChange(tabName: string, location: string) {
  sendGAEvent('event', 'tab_change', {
    tab_name: tabName,
    location: location,
  });
}

