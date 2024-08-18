import Image from "next/image";

interface BoardHeaderProps {
  name: string;
  description?: string;
}

export default function BoardHeader({ name, description }: BoardHeaderProps) {
  return (
    <div className='flex gap-4 flex-wrap' title='Go to Home'>
      <div className='shrink-0'>
        <Image src='/images/Logo.svg' alt='Logo' width={50} height={50} />
      </div>
      <div>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='text-6xl font-semibold'>{name}</h1>
            <button>
              <Image
                src='/images/Edit_duotone.svg'
                alt='Pencil'
                width={35}
                height={35}
              />
            </button>
          </div>
          {description && <p className='text-xl'>{description}</p>}
        </div>
      </div>
    </div>
  );
}
