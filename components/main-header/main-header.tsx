import Image from 'next/image';
import Link from 'next/link';
import skeletonChef from '@/public/skeleton-chef.svg';
import styles from './main-header.module.css';
import MainHeaderNav from './main-header-nav';

export default function MainHeader() {
  return (
    <header className={styles.headerContainer}>
      <div>
        <Link href='/' color='foreground' className={styles.logo}>
          <Image
            src={skeletonChef}
            alt='Skeleton Chef'
            height={50}
            width={50}
          />
          <p className={styles.brandText}>Cookbook</p>
        </Link>
      </div>
      <MainHeaderNav />
    </header>
  );
}
