import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import CategoryMeals from "./CategoryMeals";

export default async function Page({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params;
  
  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full min-h-screen bg-base-100">
        <BackButton />
        <h1 className="text-4xl md:text-6xl text-secondary mb-10 capitalize">
          {category} 🍽
        </h1>
        <CategoryMeals category={category} />
      </div>
      <Footer />
    </>
  );
}
