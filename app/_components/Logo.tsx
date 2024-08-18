import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className='flex gap-4 flex-wrap' title="Go to Home">
      <div className='shrink-0'>
        <Image src='/images/Logo.svg' alt='Logo' width={50} height={50} />
      </div>
      <div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='text-6xl font-semibold'>
              Task-Board!
            </h1>
          </div>
          <p className='text-xl'>
            A simple task board to keep track of your tasks!
          </p>
        </div>
      </div>
    </Link>
  );
}
