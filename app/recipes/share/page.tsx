import RecipeShareForm from '@/components/recipe-share-form/recipe-share-form';

export default function ShareRecipePage() {
  return (
    <>
      <header className="flex justify-center my-4">
        <h1>
          Share your <span className="text-primary-red">favorite recipe</span>
        </h1>
      </header>
      <main className="w-[90%] max-w-[75rem] mx-auto my-12">
        <RecipeShareForm />
      </main>
    </>
  );
}
