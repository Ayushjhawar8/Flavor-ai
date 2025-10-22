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
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
      <figure className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className="badge badge-primary font-semibold px-3 py-3">{recipe.difficulty}</div>
        </div>
      </figure>

      <div className="card-body p-6 space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={recipe.author.avatar}
            alt={recipe.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-base-300"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{recipe.author.name}</span>
            <span className="text-xs text-base-content/70">
              {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <h2 className="card-title text-xl font-bold leading-tight">{recipe.title}</h2>

        {recipe.description && (
          <p className="text-sm text-base-content/90 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        )}

        <div className="flex items-center gap-6 text-sm text-base-content/80 pt-2 border-t border-base-300">
          {recipe.cookTime && (
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-purple-600 dark:text-purple-400" />
              <span className="font-medium">{recipe.cookTime}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-2">
              <Users size={18} className="text-purple-600 dark:text-purple-400" />
              <span className="font-medium">{recipe.servings} servings</span>
            </div>
          )}
        </div>

        <div className="card-actions justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`btn btn-ghost btn-sm gap-2 hover:bg-base-300 ${
                liked ? "text-red-500" : ""
              }`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
              <span className="font-semibold">{likeCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-300"
            >
              <MessageCircle size={20} />
              <span className="font-semibold">{comments.length}</span>
            </button>

            <button onClick={handleShare} className="btn btn-ghost btn-sm hover:bg-base-300">
              <Share2 size={20} />
            </button>
          </div>

          <button className="btn btn-primary btn-sm px-6 font-semibold" onClick={handleViewRecipe}>
            View Recipe
          </button>
        </div>

        {showComments && (
          <div className="mt-2 border-t border-base-300 pt-4">
            <form onSubmit={handleComment} className="flex gap-3 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="input input-bordered input-sm flex-1 bg-base-100"
              />
              <button type="submit" className="btn btn-primary btn-sm px-4 font-semibold">
                Post
              </button>
            </form>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 text-sm bg-base-100 p-3 rounded-lg">
                  <img
                    src={currentUser.avatar}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-base-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{currentUser.name}</span>
                      <span className="text-xs text-base-content/70">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-base-content/90">{comment.comment}</p>
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