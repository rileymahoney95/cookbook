import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="flex justify-center mt-4">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col m-6">
            <h1>
              Welcome to your <span className="text-primary-red">Cookbook</span>
            </h1>
            <h3 className="flex justify-center mt-2">
              Document & share food from all over the world.
            </h3>
          </div>
          <div className="flex flex-row justify-between mx-12">
            <Link href='/recipes' passHref>
              <button>Explore Recipes</button>
            </Link>
            <Link href='/recipes/share' passHref>
              <button>Share a Recipe</button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section>
          <h2>How it works</h2>
          <p className="max-w-[56rem] mt-2">
            Cookbook is a platform for home cooks to document and share their
            favorite recipes with the world. It&apos;s a place to discover new
            dishes, and to connect with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
