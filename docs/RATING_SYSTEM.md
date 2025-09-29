# 🌟 Recipe Rating System

A comprehensive star rating system for the Flavor-ai application that allows users to rate recipes and view rating statistics.

## ✨ Features

### 🎯 Core Components

1. **RatingStars** - Interactive star rating component
   - 1-5 star rating system
   - Hover effects and animations
   - Keyboard navigation support
   - Accessible ARIA labels
   - Multiple sizes (sm, md, lg)
   - Multiple color themes (primary, secondary, accent, warning)

2. **RatingDisplay** - Shows average ratings and counts
   - Displays star rating with average score
   - Shows total number of ratings
   - Loading states and error handling
   - Responsive design

3. **RatingBreakdown** - Distribution chart and statistics
   - Bar chart showing rating distribution
   - Detailed statistics (average, total, 5-star count)
   - Percentage calculations
   - Visual progress bars

4. **RecipeRatingSection** - Complete rating interface
   - Interactive rating submission
   - User rating management (change/delete)
   - Rating breakdown display
   - Authentication integration

### 🔧 Technical Features

- **Local Storage**: Ratings stored in browser localStorage
- **User Management**: Integrated with mock authentication system
- **Real-time Updates**: Immediate UI updates on rating changes
- **One-Click Rating**: Smooth, instant rating experience
- **Mobile Responsive**: Works on all device sizes
- **Accessibility**: Full WCAG compliance with keyboard navigation
- **Error Handling**: Graceful error handling and fallbacks
- **Smooth Animations**: Visual feedback and transitions

## 🚀 Usage

### Dynamic Rating System

The rating system is **fully dynamic** by default. No dummy data is loaded automatically. Users will see "No ratings yet" until they start rating recipes.

### Basic Rating Display

```jsx
import RatingDisplay from "@/components/RatingDisplay";

<RatingDisplay
  recipeId="recipe_123"
  showCount={true}
  showAverage={false}
  size="sm"
  color="warning"
/>
```

**Note:** This will show "No ratings yet" until users actually rate the recipe.

### Interactive Rating

```jsx
import RatingStars from "@/components/RatingStars";

<RatingStars
  rating={currentRating}
  onRatingChange={handleRatingChange}
  interactive={true}
  size="lg"
  color="warning"
  showLabel={true}
/>
```

### Complete Rating Section

```jsx
import RecipeRatingSection from "@/components/RecipeRatingSection";

<RecipeRatingSection
  recipeId="recipe_123"
  recipeTitle="Amazing Recipe"
  showBreakdown={true}
/>
```

**Note:** Users can now click any star to rate instantly - no buttons needed!

## 📁 File Structure

```
components/
├── RatingStars.jsx          # Interactive star component
├── RatingDisplay.jsx        # Average rating display
├── RatingBreakdown.jsx      # Distribution chart
├── RecipeRatingSection.jsx  # Complete rating interface
└── RatingInitializer.jsx    # Client-side initialization

lib/
├── ratingStorage.js         # Rating data management
└── seedRatingData.js        # Sample data seeding

app/
├── rating-demo/             # Demo page
└── layout.jsx               # Global initialization

docs/
└── RATING_SYSTEM.md         # This documentation
```

## 🎨 Integration Points

### Recipe Cards
- **Community Recipe Cards**: Rating display integrated
- **Festival Dish Cards**: Rating display integrated  
- **Ingredient Explorer**: Rating display integrated

### Recipe Detail Pages
- **Recipe Page** (`/recipe`): Full rating section with breakdown
- **Meal Detail Page** (`/meal/[meal]`): Full rating section with breakdown

## 🔒 Data Storage

### Local Storage Structure

```javascript
// Recipe ratings storage
{
  "recipe_123": [
    {
      "id": "rating_1234567890_abc",
      "rating": 5,
      "userId": "user_123",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}

// User ratings tracking
{
  "user_123_recipe_123": {
    "id": "rating_1234567890_abc",
    "rating": 5,
    "userId": "user_123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and Space keys
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Proper roles and attributes
- **Color Contrast**: Accessible color combinations
- **Screen Reader Support**: Descriptive text for all interactions

## 🎭 Demo Page

Visit `/rating-demo` to see all components in action:

- Interactive rating demonstrations
- Different sizes and color themes
- Rating breakdown charts
- Complete rating section
- Demo controls for testing

### Demo Data Control

By default, the system shows no dummy data. To enable demo data for testing:

1. Visit `/rating-demo`
2. Click "Enable Demo Data" button
3. Refresh the page to see sample ratings

To disable demo data:
1. Click "Disable Demo Data" button
2. All dummy ratings will be cleared

## 🔧 API Reference

### RatingStorage Functions

```javascript
// Get ratings for a recipe
getRecipeRatings(recipeId)

// Save a rating
saveRecipeRating(recipeId, rating, userId?)

// Get user's rating for a recipe
getUserRating(recipeId, userId)

// Delete user's rating
deleteUserRating(recipeId, userId)

// Get all ratings
getAllRecipeRatings()

// Clear all ratings (for testing)
clearAllRatings()
```

### Component Props

#### RatingStars
- `rating`: Current rating value (0-5)
- `onRatingChange`: Callback for rating changes
- `interactive`: Whether component is interactive
- `size`: Size of stars ('sm', 'md', 'lg')
- `color`: Color theme ('primary', 'secondary', 'accent', 'warning')
- `showLabel`: Whether to show rating number
- `className`: Additional CSS classes

#### RatingDisplay
- `recipeId`: Unique recipe identifier
- `showCount`: Whether to show rating count
- `showAverage`: Whether to show average rating
- `size`: Size of stars ('sm', 'md', 'lg')
- `color`: Color theme
- `className`: Additional CSS classes

#### RatingBreakdown
- `recipeId`: Unique recipe identifier
- `showChart`: Whether to show bar chart
- `showStats`: Whether to show statistics
- `className`: Additional CSS classes

#### RecipeRatingSection
- `recipeId`: Unique recipe identifier
- `recipeTitle`: Recipe title for display
- `showBreakdown`: Whether to show rating breakdown
- `className`: Additional CSS classes

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time rating updates
- [ ] Rating analytics dashboard
- [ ] Rating moderation tools
- [ ] Social features (rating comments)
- [ ] Rating trends and insights
- [ ] Export rating data
- [ ] Rating notifications

## 🐛 Troubleshooting

### Common Issues

1. **Ratings not saving**: Check if localStorage is available
2. **User ratings not showing**: Verify user authentication
3. **Rating display issues**: Ensure recipeId is properly set
4. **Accessibility problems**: Check ARIA labels and keyboard navigation

### Debug Mode

Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug_ratings', 'true');
```

## 📄 License

This rating system is part of the Flavor-ai project and follows the same licensing terms.
