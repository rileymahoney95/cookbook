import Image from 'next/image';
import Link from 'next/link';
import skeletonChef from '@/public/skeleton-chef.svg';
import MainHeaderNav from './main-header-nav';

export default function MainHeader() {
  return (
    <header className="hidden sm:flex justify-around items-center gap-4 p-8">
      <div>
        <Link href='/' color='foreground' className="flex items-center justify-center gap-8 font-bold font-montserrat tracking-wider uppercase text-2xl">
          <Image
            src={skeletonChef}
            alt='Skeleton Chef'
            height={50}
            width={50}
            className="w-20 h-20 object-contain rounded-lg drop-shadow-[0_0_0.75rem_rgba(0,0,0,0.5)]"
          />
          <p>Cookbook</p>
        </Link>
      </div>
      <MainHeaderNav />
    </header>
  );
}
