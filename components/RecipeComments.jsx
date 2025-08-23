'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Send, Clock, User } from 'lucide-react';

export default function RecipeComments({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { question: `${num1} + ${num2}`, answer: num1 + num2 };
  };
  
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Extract num1 and num2 from captcha.question (format: 'num1 + num2')
      const [num1, num2] = captcha.question.split(' + ').map(Number);
      const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim() || undefined,
          comment: newComment.trim(),
          captchaAnswer: parseInt(captchaInput),
          captchaNum1: num1,
          captchaNum2: num2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Comment posted successfully!');
        setNewComment('');
        setNickname('');
        setCaptchaInput('');
        setCaptcha(generateCaptcha());
        fetchComments(); // Refresh comments
      } else {
        setError(data.error || 'Failed to post comment');
        if (data.error?.includes('captcha') || data.error?.includes('math')) {
          setCaptcha(generateCaptcha());
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h4 className="card-title text-lg">Leave a Comment</h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nickname Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nickname (optional)</span>
              </label>
              <input
                type="text"
                placeholder="Your nickname (or leave blank for Anonymous)"
                className="input input-bordered w-full"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={50}
                disabled={isSubmitting}
              />
            </div>

            {/* Comment Textarea */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Comment</span>
                <span className="label-text-alt">
                  {newComment.length}/500
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 resize-none"
                placeholder="Share your thoughts about this recipe..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                minLength={10}
                maxLength={500}
                required
                disabled={isSubmitting}
              />
              <label className="label">
                <span className="label-text-alt text-xs">
                  Minimum 10 characters required
                </span>
              </label>
            </div>

            {/* CAPTCHA */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Verify you're human: {captcha.question} = ?</span>
              </label>
              <input
                type="number"
                placeholder="Enter the answer"
                className="input input-bordered w-32"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                <span>{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting || newComment.length < 10}
            >
              {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card bg-base-100 shadow-sm">
              <div className="card-body py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{comment.nickname}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-base-content/60">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimestamp(comment.timestamp)}</span>
                  </div>
                </div>
                <p className="text-base-content leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}