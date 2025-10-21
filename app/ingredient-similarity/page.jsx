"use client"
import IngredientSimilarity from '@/components/IngredientSimilarity';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function IngredientSimilarityPage() {
  // dynamic tab title
                
  useEffect(()=>{
    document.title='Flavor AI-Ingredient Similarity'
  },[])


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <BackButton />
      <div className="container mx-auto px-4 py-8 pt-20">
        <IngredientSimilarity />
      </div>
      <Footer />
    </div>
  );
} 