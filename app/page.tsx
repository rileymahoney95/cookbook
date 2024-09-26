import Link from 'next/link';
import styles from './page.module.css';

// import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        {/* <div className=''><ImageSlideshow /></div> */}
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <h1>
              Welcome to your <span>Cookbook</span>
            </h1>
            <h3 className={styles.headerSubtitle}>
              Document & share food from all over the world.
            </h3>
          </div>
          <div className={styles.headerButtons}>
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
          <p className={styles.sectionDescription}>
            Cookbook is a platform for home cooks to document and share their
            favorite recipes with the world. It&apos;s a place to discover new
            dishes, and to connect with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
