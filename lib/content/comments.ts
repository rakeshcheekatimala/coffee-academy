import { Comment } from '@/lib/types';

// Mock comments data
export const mockComments: Record<string, Comment[]> = {
  'v60-pour-over': [
    {
      id: 'comment-1',
      userId: 'user-1',
      userName: 'Sarah Chen',
      content: 'This method completely changed my morning routine! The clarity in the cup is incredible compared to my old drip machine.',
      createdAt: '2024-03-10T08:30:00Z',
      likes: 12,
    },
    {
      id: 'comment-2',
      userId: 'user-2',
      userName: 'Marcus Rodriguez',
      content: 'Pro tip: try using water at 195°F instead of 205°F for Ethiopian beans. The lower temp brings out more floral notes!',
      createdAt: '2024-03-12T14:15:00Z',
      likes: 8,
      replies: [
        {
          id: 'comment-2-1',
          userId: 'user-3',
          userName: 'Emily Watson',
          content: 'Just tried this - you\'re absolutely right! The jasmine notes really popped.',
          createdAt: '2024-03-12T16:45:00Z',
          parentId: 'comment-2',
          likes: 3,
        },
      ],
    },
    {
      id: 'comment-3',
      userId: 'user-3',
      userName: 'Emily Watson',
      content: 'I struggled with this at first - my brew time was always too fast. Grinding finer fixed it!',
      createdAt: '2024-03-14T10:00:00Z',
      likes: 5,
    },
  ],
  'french-press': [
    {
      id: 'comment-4',
      userId: 'user-1',
      userName: 'Sarah Chen',
      content: 'The 4-minute steep time is perfect. I used to do 5 minutes and it was always too bitter.',
      createdAt: '2024-03-08T09:20:00Z',
      likes: 7,
    },
    {
      id: 'comment-5',
      userId: 'user-2',
      userName: 'Marcus Rodriguez',
      content: 'Don\'t skip the step of skimming the foam! Makes a huge difference in the final cup clarity.',
      createdAt: '2024-03-11T07:45:00Z',
      likes: 15,
    },
  ],
  'what-is-single-origin': [
    {
      id: 'comment-6',
      userId: 'user-3',
      userName: 'Emily Watson',
      content: 'This article really helped me understand why Ethiopian coffee tastes so different from Brazilian. Great explanation!',
      createdAt: '2024-02-20T11:30:00Z',
      likes: 9,
    },
  ],
};

const COMMENTS_KEY = 'coffeeAcademy_comments';

// Get comments for a specific item
export const getComments = (itemId: string): Comment[] => {
  if (typeof window === 'undefined') {
    return mockComments[itemId] || [];
  }
  
  const storedComments = localStorage.getItem(COMMENTS_KEY);
  const allComments: Record<string, Comment[]> = storedComments 
    ? { ...mockComments, ...JSON.parse(storedComments) }
    : mockComments;
  
  return allComments[itemId] || [];
};

// Add a comment
export const addComment = (
  itemId: string,
  comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>
): Comment => {
  const newComment: Comment = {
    ...comment,
    id: `comment-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  
  if (typeof window !== 'undefined') {
    const storedComments = localStorage.getItem(COMMENTS_KEY);
    const allComments: Record<string, Comment[]> = storedComments 
      ? JSON.parse(storedComments) 
      : {};
    
    if (!allComments[itemId]) {
      allComments[itemId] = [];
    }
    allComments[itemId].push(newComment);
    
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
  
  return newComment;
};

// Add a reply to a comment
export const addReply = (
  itemId: string,
  parentCommentId: string,
  reply: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'parentId'>
): Comment => {
  const newReply: Comment = {
    ...reply,
    id: `reply-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: 0,
    parentId: parentCommentId,
  };
  
  if (typeof window !== 'undefined') {
    const storedComments = localStorage.getItem(COMMENTS_KEY);
    const allComments: Record<string, Comment[]> = storedComments 
      ? JSON.parse(storedComments) 
      : {};
    
    const itemComments = allComments[itemId] || [];
    const parentComment = itemComments.find(c => c.id === parentCommentId);
    
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(newReply);
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    }
  }
  
  return newReply;
};

// Like a comment
export const likeComment = (itemId: string, commentId: string): void => {
  if (typeof window === 'undefined') return;
  
  const storedComments = localStorage.getItem(COMMENTS_KEY);
  const allComments: Record<string, Comment[]> = storedComments 
    ? JSON.parse(storedComments) 
    : {};
  
  const itemComments = allComments[itemId] || [];
  
  const updateLikes = (comments: Comment[]): boolean => {
    for (const comment of comments) {
      if (comment.id === commentId) {
        comment.likes++;
        return true;
      }
      if (comment.replies && updateLikes(comment.replies)) {
        return true;
      }
    }
    return false;
  };
  
  if (updateLikes(itemComments)) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  }
};

// Get comment count for an item
export const getCommentCount = (itemId: string): number => {
  const comments = getComments(itemId);
  let count = comments.length;
  
  comments.forEach(comment => {
    if (comment.replies) {
      count += comment.replies.length;
    }
  });
  
  return count;
};

