import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className='flex gap-4 flex-wrap'>
      <div className='shrink-0'>
        <Image src='/images/Logo.svg' alt='Logo' width={50} height={50} />
      </div>
      <div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='text-6xl font-semibold'>My Task Board</h1>
            <Image
              src='/images/Edit_duotone.svg'
              alt='Pencil'
              width={35}
              height={35}
            />
          </div>
          <p className='text-xl'>Tasks to keep organized</p>
        </div>
      </div>
    </Link>
  );
}
