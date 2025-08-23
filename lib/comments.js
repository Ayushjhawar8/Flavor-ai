import { promises as fs } from 'fs';
import path from 'path';
import { commentSchema, commentsResponseSchema } from './schemas.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const COMMENTS_FILE = path.join(DATA_DIR, 'comments.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Load comments from file
export async function loadComments() {
    await ensureDataDir();
    try {
        const data = await fs.readFile(COMMENTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save comments to file
async function saveComments(comments) {
    await ensureDataDir();
    await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Get comments for a specific recipe
export async function getRecipeComments(recipeId) {
    const allComments = await loadComments();
    const recipeComments = allComments
        .filter(comment => comment.recipeId === recipeId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return { comments: recipeComments, total: recipeComments.length };
}

// Add a new comment
export async function addComment(recipeId, commentData, ipAddress) {
    const allComments = await loadComments();
    
    const newComment = {
        id: Date.now().toString(),
        recipeId,
        nickname: commentData.nickname || 'Anonymous',
        comment: commentData.comment,
        timestamp: new Date().toISOString(),
        ipAddress
    };
    
    // Validate the comment structure
    const validatedComment = commentSchema.parse(newComment);
    
    allComments.push(validatedComment);
    await saveComments(allComments);
    
    return validatedComment;
}