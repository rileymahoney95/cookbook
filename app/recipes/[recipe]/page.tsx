type RecipeDetailsPageProps = {
  params: {
    recipe: string,
  }
}
export default function RecipeDetailsPage({ params }: RecipeDetailsPageProps) {
  return (
    <main>
      <h1>{params.recipe}</h1>
    </main>
  )
}