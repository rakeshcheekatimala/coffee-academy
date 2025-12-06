'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Comment } from '@/lib/types';
import { getComments, addComment, likeComment, getCommentCount } from '@/lib/content/comments';
import { getCurrentUser } from '@/lib/content/userContent';
import { MessageCircle, Heart, Reply, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface CommentSectionProps {
  itemId: string;
  itemType: 'recipe' | 'article' | 'brew';
}

export function CommentSection({ itemId, itemType }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(getComments(itemId));
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const currentUser = getCurrentUser();

  const handleSubmitComment = () => {
    if (!newComment.trim() || !currentUser) return;

    const comment = addComment(itemId, {
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      content: newComment.trim(),
    });

    setComments((prev) => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !currentUser) return;

    // Add reply logic - for simplicity, adding to local state
    const reply: Comment = {
      id: `reply-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      content: replyContent.trim(),
      createdAt: new Date().toISOString(),
      parentId,
      likes: 0,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      )
    );
    setReplyContent('');
    setReplyingTo(null);
    setExpandedReplies((prev) => new Set(prev).add(parentId));
  };

  const handleLike = (commentId: string) => {
    likeComment(itemId, commentId);
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
            ),
          };
        }
        return comment;
      })
    );
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const commentCount = getCommentCount(itemId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-amber-600" />
          Comments
          {commentCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {commentCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New comment form */}
        <div className="space-y-3">
          {currentUser ? (
            <>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {currentUser.displayName.charAt(0)}
                </div>
                <textarea
                  placeholder={`Share your thoughts on this ${itemType}...`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 min-h-[80px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-amber-600 hover:bg-amber-500"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                <a href="/community/submit" className="text-amber-600 hover:underline">
                  Create a profile
                </a>{' '}
                to join the conversation
              </p>
            </div>
          )}
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          <AnimatePresence>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-3"
                >
                  {/* Main comment */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {comment.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-coffee-medium/80 whitespace-pre-wrap">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-red-500"
                          onClick={() => handleLike(comment.id)}
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                        {currentUser && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground hover:text-amber-600"
                            onClick={() =>
                              setReplyingTo(replyingTo === comment.id ? null : comment.id)
                            }
                          >
                            <Reply className="w-4 h-4 mr-1" />
                            <span className="text-xs">Reply</span>
                          </Button>
                        )}
                        {comment.replies && comment.replies.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground"
                            onClick={() => toggleReplies(comment.id)}
                          >
                            {expandedReplies.has(comment.id) ? (
                              <ChevronUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 mr-1" />
                            )}
                            <span className="text-xs">
                              {comment.replies.length} repl{comment.replies.length === 1 ? 'y' : 'ies'}
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reply form */}
                  <AnimatePresence>
                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-12 space-y-2"
                      >
                        <textarea
                          placeholder={`Reply to ${comment.userName}...`}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="w-full min-h-[60px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim()}
                            className="bg-amber-600 hover:bg-amber-500"
                          >
                            Reply
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Replies */}
                  <AnimatePresence>
                    {expandedReplies.has(comment.id) && comment.replies && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-12 space-y-3"
                      >
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border-l-2 border-amber-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {reply.userName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{reply.userName}</span>
                                <span className="text-xs text-muted-foreground">
                                  {timeAgo(reply.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-coffee-medium/80">{reply.content}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 mt-2 text-muted-foreground hover:text-red-500"
                                onClick={() => handleLike(reply.id)}
                              >
                                <Heart className="w-3 h-3 mr-1" />
                                <span className="text-xs">{reply.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

