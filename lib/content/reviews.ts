import { Review } from '@/lib/types';

// Mock reviews data
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    targetType: 'recipe',
    targetId: 'v60-pour-over',
    rating: 5,
    title: 'Game changer for my morning coffee',
    content: 'After years of using a drip machine, this recipe opened my eyes to what coffee can really taste like. The instructions are clear, and the tips about grind size were incredibly helpful. My V60 brews are now consistently delicious.',
    pros: ['Clear instructions', 'Great tips', 'Produces excellent coffee'],
    cons: ['Requires some practice', 'Need a gooseneck kettle'],
    createdAt: '2024-03-01T10:00:00Z',
    helpful: 24,
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: 'Marcus Rodriguez',
    targetType: 'recipe',
    targetId: 'french-press',
    rating: 4,
    title: 'Simple and reliable',
    content: 'This is my go-to for lazy weekend mornings. The results are consistent and the cleanup is easy. Only downside is the sediment at the bottom of the cup, but that\'s just French press life.',
    pros: ['Easy to follow', 'Consistent results', 'No fancy equipment needed'],
    cons: ['Some sediment in cup'],
    createdAt: '2024-02-28T08:30:00Z',
    helpful: 18,
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: 'Emily Watson',
    targetType: 'recipe',
    targetId: 'cold-brew',
    rating: 5,
    title: 'Perfect summer coffee',
    content: 'Made my first batch following this recipe and I\'m hooked. So smooth, no bitterness, and it lasts all week in the fridge. The 1:1 dilution ratio is spot on.',
    pros: ['Smooth taste', 'Easy to batch', 'Lasts all week'],
    cons: ['Requires planning ahead'],
    createdAt: '2024-03-05T14:20:00Z',
    helpful: 31,
  },
  {
    id: 'review-4',
    userId: 'user-1',
    userName: 'Sarah Chen',
    targetType: 'coffee',
    targetId: 'brazilian-medium',
    rating: 4,
    title: 'Great everyday coffee',
    content: 'This Brazilian is my daily driver. Nothing fancy, but reliably smooth and comforting. Perfect with a splash of oat milk in the morning.',
    createdAt: '2024-02-15T09:00:00Z',
    helpful: 12,
  },
  {
    id: 'review-5',
    userId: 'user-2',
    userName: 'Marcus Rodriguez',
    targetType: 'equipment',
    targetId: 'aeropress',
    rating: 5,
    title: 'Most versatile brewer I own',
    content: 'I\'ve tried countless brewing methods and the AeroPress remains my favorite for single cups. Quick, clean, and you can make everything from espresso-style to regular coffee. Travel-friendly too!',
    pros: ['Versatile', 'Quick cleanup', 'Travel-friendly', 'Durable'],
    cons: ['Single serving only'],
    createdAt: '2024-03-08T11:45:00Z',
    helpful: 42,
  },
];

const REVIEWS_KEY = 'coffeeAcademy_reviews';

// Get all reviews
export const getAllReviews = (): Review[] => {
  if (typeof window === 'undefined') return mockReviews;
  
  const storedReviews = localStorage.getItem(REVIEWS_KEY);
  const userReviews: Review[] = storedReviews ? JSON.parse(storedReviews) : [];
  
  return [...mockReviews, ...userReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get reviews for a specific item
export const getReviewsForItem = (
  targetType: Review['targetType'],
  targetId: string
): Review[] => {
  return getAllReviews().filter(
    review => review.targetType === targetType && review.targetId === targetId
  );
};

// Get average rating for an item
export const getAverageRating = (
  targetType: Review['targetType'],
  targetId: string
): { average: number; count: number } => {
  const reviews = getReviewsForItem(targetType, targetId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
};

// Add a review
export const addReview = (
  review: Omit<Review, 'id' | 'createdAt' | 'helpful'>
): Review => {
  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    createdAt: new Date().toISOString(),
    helpful: 0,
  };
  
  if (typeof window !== 'undefined') {
    const storedReviews = localStorage.getItem(REVIEWS_KEY);
    const userReviews: Review[] = storedReviews ? JSON.parse(storedReviews) : [];
    userReviews.push(newReview);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(userReviews));
  }
  
  return newReview;
};

// Mark review as helpful
export const markReviewHelpful = (reviewId: string): void => {
  if (typeof window === 'undefined') return;
  
  const storedReviews = localStorage.getItem(REVIEWS_KEY);
  const userReviews: Review[] = storedReviews ? JSON.parse(storedReviews) : [];
  
  const review = userReviews.find(r => r.id === reviewId);
  if (review) {
    review.helpful++;
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(userReviews));
  }
};

// Get user's reviews
export const getUserReviews = (userId: string): Review[] => {
  return getAllReviews().filter(review => review.userId === userId);
};

