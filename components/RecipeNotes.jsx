"use client";

import { useState, useEffect } from "react";
import { getRecipeNotes, saveRecipeNotes } from "@/lib/communityStorage";
import { Edit3, Save, X, StickyNote, Trash2 } from "lucide-react";

export default function RecipeNotes({ recipeId }) {
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  useEffect(() => {
    const savedNotes = getRecipeNotes(recipeId);
    setNotes(savedNotes);
  }, [recipeId]);

  const handleEdit = () => {
    setTempNotes(notes);
    setIsEditing(true);
  };

  const handleSave = () => {
    saveRecipeNotes(recipeId, tempNotes);
    setNotes(tempNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNotes("");
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete these notes?")) {
      saveRecipeNotes(recipeId, "");
      setNotes("");
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-base-100 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Edit3 size={18} className="text-primary" />
          <h3 className="font-semibold text-base-content">Edit Notes</h3>
        </div>
        <textarea
          value={tempNotes}
          onChange={(e) => setTempNotes(e.target.value)}
          placeholder="Add your personal notes, modifications, or tips for this recipe..."
          className="textarea textarea-bordered w-full min-h-[120px] resize-y"
          rows={4}
        />
        <div className="flex gap-2 mt-3">
          <button onClick={handleSave} className="btn btn-primary btn-sm gap-2">
            💾 Save Note
          </button>
          <button onClick={handleCancel} className="btn btn-ghost btn-sm gap-2">
            <X size={16} />
            Cancel
          </button>
          {notes.trim() && (
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-2"
            >
              ❌ Delete Note
            </button>
          )}
        </div>
      </div>
    );
  }

  if (notes.trim()) {
    return (
      <div className="bg-base-100 rounded-lg p-4 border border-base-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNote size={18} className="text-primary" />
            <h3 className="font-semibold text-base-content">My Notes</h3>
          </div>
          <button onClick={handleEdit} className="btn btn-ghost btn-xs gap-1">
            🖊️ Edit
          </button>
        </div>
        <div className="text-base-content whitespace-pre-wrap">{notes}</div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg p-4 border border-dashed border-base-300">
      <div className="text-center">
        <StickyNote size={24} className="text-base-content/40 mx-auto mb-2" />
        <p className="text-base-content/60 mb-3">No personal notes yet</p>
        <button onClick={handleEdit} className="btn btn-outline btn-sm gap-2">
          🖊️ Add/Edit Note
        </button>
      </div>
    </div>
  );
}
