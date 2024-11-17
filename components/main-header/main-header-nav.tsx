'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainHeaderNav() {
  const path = usePathname();

  const isActive = (pathName: string) => {
    return path === pathName;
  };

  return (
    <nav>
      <ul className="flex gap-6 text-xl list-none">
        <li>
          <Link
            color='foreground'
            href='/recipes'
            className={
              isActive('/recipes')
                ? 'font-bold text-primary-red'
                : 'text-inherit font-normal hover:text-primary-red hover:shadow-glow'
            }
          >
            My Recipes
          </Link>
        </li>
        <li>
          <Link
            color='foreground'
            href='/recipes/share'
            className={
              isActive('/recipes/share')
                ? 'font-bold text-primary-red'
                : 'text-inherit font-normal hover:text-primary-red hover:shadow-glow'
            }
          >
            Share
          </Link>
        </li>
      </ul>
    </nav>
  );
}
