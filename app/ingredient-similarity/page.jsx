import IngredientSimilarity from '@/components/IngredientSimilarity';
import BackButton from '@/components/BackButton';

export default function IngredientSimilarityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <BackButton />
      <div className="container mx-auto px-4 py-8 pt-20">
        <IngredientSimilarity />
      </div>
    </div>
  );
} 