import { NextRequest, NextResponse } from 'next/server';
import { getRecipeComments, addComment } from '../../../../../lib/comments.js';
import { commentSubmissionSchema } from '../../../../../lib/schemas.js';

// In-memory rate limiting (resets on server restart)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function getRealIP(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    if (realIP) {
        return realIP.trim();
    }
    return request.ip || 'unknown';
}

function isRateLimited(ip) {
    const now = Date.now();
    const userLastRequest = rateLimitMap.get(ip);
    
    if (userLastRequest && (now - userLastRequest) < RATE_LIMIT_WINDOW) {
        return true;
    }
    
    rateLimitMap.set(ip, now);
    return false;
}

// Simple math captcha validation
function validateCaptcha(answer, expectedAnswer) {
    return parseInt(answer) === expectedAnswer;
}

// GET endpoint - fetch comments for a recipe
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const comments = await getRecipeComments(id);
        
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST endpoint - submit new comment
export async function POST(request, { params }) {
    try {
        const { id } = params;
        const ip = getRealIP(request);
        
        // Rate limiting check
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Please wait before posting another comment' },
                { status: 429 }
            );
        }
        
        const body = await request.json();
        // Expect num1 and num2 from frontend for captcha validation
        const { captchaNum1, captchaNum2, captchaAnswer, ...rest } = body;
        // Validate input with Zod schema (excluding captchaNum1, captchaNum2)
        const validatedData = commentSubmissionSchema.parse({ ...rest, captchaAnswer });
        // CAPTCHA validation
        if (
            typeof captchaNum1 !== 'number' ||
            typeof captchaNum2 !== 'number' ||
            !validateCaptcha(captchaAnswer, captchaNum1 + captchaNum2)
        ) {
            return NextResponse.json(
                { error: 'CAPTCHA validation failed. Please try again.' },
                { status: 400 }
            );
        }
        // Basic content filtering
        const bannedWords = ['spam', 'scam', 'viagra', 'casino'];
        const containsBannedWords = bannedWords.some(word => 
            validatedData.comment.toLowerCase().includes(word.toLowerCase())
        );
        if (containsBannedWords) {
            return NextResponse.json(
                { error: 'Comment contains inappropriate content' },
                { status: 400 }
            );
        }
        // Add comment to storage
        const newComment = await addComment(id, validatedData, ip);
        return NextResponse.json({ 
            success: true, 
            comment: newComment 
        }, { status: 201 });
        
    } catch (error) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input data', details: error.errors },
                { status: 400 }
            );
        }
        
        console.error('Error adding comment:', error);
        return NextResponse.json(
            { error: 'Failed to add comment' },
            { status: 500 }
        );
    }
}