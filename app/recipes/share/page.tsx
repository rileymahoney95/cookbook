import RecipeShareForm from '@/components/recipe-share-form/recipe-share-form';

export default function ShareRecipePage() {
  return (
    <>
      <header className="flex justify-center my-4">
        <h1>
          Share your <span className="text-primary-red">favorite recipe</span>
        </h1>
      </header>
      <main className="w-[100%] mx-auto my-12">
        <RecipeShareForm />
      </main>
    </>
  );
}
