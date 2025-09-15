"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/mockAuth";
import { Heart, MessageCircle, Share2, Clock, Users } from "lucide-react";

export default function CommunityRecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 5); // for now random like count
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  
  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment_${Date.now()}`,
      userId: currentUser.id,
      comment: newComment,
      createdAt: new Date().toISOString()
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleShare = () => {
    const shareText = `Check out this amazing recipe: ${recipe.title}`;
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  const handleViewRecipe = () => {
    // Store recipe in localStorage for the recipe page to access
    localStorage.setItem('current_recipe', JSON.stringify(recipe));
    router.push('/recipe');
  };

  return (
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="badge badge-primary">{recipe.difficulty}</div>
        </div>
      </figure>

      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{recipe.author.name}</span>
          <span className="text-xs text-base-content/60">
            {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h2 className="card-title text-lg">{recipe.title}</h2>

        {recipe.description && (
          <p className="text-sm text-base-content/80 line-clamp-2">
            {recipe.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
          {recipe.cookTime && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{recipe.cookTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`btn btn-ghost btn-sm gap-2 ${
                liked ? "text-red-500" : ""
              }`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="btn btn-ghost btn-sm gap-2"
            >
              <MessageCircle size={18} />
              <span>{comments.length}</span>
            </button>

            <button onClick={handleShare} className="btn btn-ghost btn-sm">
              <Share2 size={18} />
            </button>
          </div>

          <button className="btn btn-primary btn-sm" onClick={handleViewRecipe}>
            View Recipe
          </button>
        </div>

        {showComments && (
          <div className="mt-4 border-t pt-4">
            <form onSubmit={handleComment} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="input input-bordered input-sm flex-1"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Post
              </button>
            </form>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 text-sm">
                  <img
                    src={currentUser.avatar}
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="ml-2">{comment.comment}</span>
                    <div className="text-xs text-base-content/60">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}