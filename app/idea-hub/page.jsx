"use client";

import { useState, useEffect } from 'react';
import { getIdeas, createIdea, voteForIdea } from '@/lib/api';

// IdeaCard component to display each idea
function IdeaCard({ id, idea, name, createdAt, votes = 0, onVote, isVoting }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="card-body">
        <p className="text-lg mb-4">{idea}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <span className="font-medium">{name || 'Anonymous'}</span>
            <span>•</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <button 
            onClick={() => onVote(id)}
            className={`btn btn-ghost btn-sm gap-1 ${isVoting === id ? 'loading' : ''}`}
            aria-label="Vote for this idea"
            disabled={isVoting === id}
          >
            <span className="text-2xl">👍</span>
            <span className="text-sm">{votes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IdeaHub() {
  const [showForm, setShowForm] = useState(false);
  const [idea, setIdea] = useState('');
  const [name, setName] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoting, setIsVoting] = useState(null);
  const [sortBy, setSortBy] = useState('new');
  const [error, setError] = useState('');

  // Fetch ideas from the API
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setIsLoading(true);
        const response = await getIdeas(sortBy);
        if (response.success) {
          setIdeas(response.data);
        } else {
          setError('Failed to load ideas. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setError('Failed to load ideas. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, [sortBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await createIdea({
        idea: idea.trim(),
        name: name.trim()
      });

      if (response.success) {
        setIdeas([response.data, ...ideas]);
        setIdea('');
        setName('');
        setShowForm(false);
      } else {
        setError('Failed to submit idea. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting idea:', err);
      setError('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (id) => {
    try {
      setIsVoting(id);
      const response = await voteForIdea(id);
      
      if (response.success) {
        setIdeas(ideas.map(item => 
          item._id === id 
            ? { ...item, votes: response.data.votes } 
            : item
        ));
      }
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to vote. Please try again.');
    } finally {
      setIsVoting(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-base-content mb-4">💡 Idea Hub</h1>
          <p className="text-xl text-base-content/80 mb-8">
            Share and vote on ideas to help improve Flavor AI
          </p>
          
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Your Idea
            </button>
          ) : (
            <div className="bg-base-200 rounded-xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Share Your Idea</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                  aria-label="Close form"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="idea" className="block text-sm font-medium text-base-content/80 mb-2">
                    Your Idea *
                  </label>
                  <textarea
                    id="idea"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="What's your idea?"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-base-content/80 mb-2">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn btn-primary"
                    disabled={!idea.trim()}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Idea'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Community Ideas</h2>
            <div className="join">
              <button 
                className={`btn btn-sm join-item ${sortBy === 'new' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSortBy('new')}
              >
                Newest
              </button>
              <button 
                className={`btn btn-sm join-item ${sortBy === 'top' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSortBy('top')}
              >
                Top Voted
              </button>
            </div>
          </div>
          
          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : ideas.length > 0 ? (
            <div className="grid gap-6">
              {ideas.map((item) => (
                <IdeaCard
                  key={item._id}
                  id={item._id}
                  idea={item.idea}
                  name={item.name}
                  createdAt={item.createdAt}
                  votes={item.votes}
                  onVote={handleVote}
                  isVoting={isVoting}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-base-200 rounded-xl">
              <p className="text-base-content/70">No ideas yet. Be the first to share yours!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
