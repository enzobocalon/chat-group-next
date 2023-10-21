import Button from '@/components/Button';
import { Input } from '@/components/Input';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-app flex flex-col items-center justify-center">
      <h1 className="text-lg text-white font-bold my-4">Login now!</h1>
      <form className="flex flex-col gap-4">
        <div>
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <Input
            placeholder="Your email..."
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <Input
            placeholder="Your password..."
            type="password"
            name="password"
            id="password"
          />
        </div>
        <Button>Login</Button>
      </form>
      <p className="text-white mt-4">
        Don&apos;t have an account yet?{' '}
        <Link className="text-[#2F80ED]" href={'/signup'}>
          Sign-up
        </Link>
      </p>
    </main>
  );
}
