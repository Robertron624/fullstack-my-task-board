import Link from 'next/link'

export default function NotFound() {
  return( 
  <main className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-2xl '>Not found – 404!</h1>
      <div className='mt-6'>
        <Link className="text-xl underline text-blue" href="/">Go back to Home!</Link>
      </div>
  </main>
  );
}