'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './main-header-nav.module.css';

export default function MainHeaderNav() {
  const path = usePathname();

  const isActive = (pathName: string) => {
    return path === pathName;
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link
            color='foreground'
            href='/recipes'
            className={isActive('/recipes') ? styles.activeLink : styles.link}
          >
            My Recipes
          </Link>
        </li>
        <li>
          <Link
            color='foreground'
            href='/recipes/share'
            className={
              isActive('/recipes/share') ? styles.activeLink : styles.link
            }
          >
            Share
          </Link>
        </li>
      </ul>
    </nav>
  );
}
