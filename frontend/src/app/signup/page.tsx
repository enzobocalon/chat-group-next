'use client';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth';
import { SignupParams } from '@/services/auth/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'E-mail is required').email('E-mail is not valid'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { signin } = useAuth();

  const { mutateAsync } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    console.log(data);
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <main className="w-screen h-screen bg-app flex flex-col items-center justify-center">
      <h1 className="text-lg text-white font-bold my-4">Register now!</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <Input
            placeholder="Your name..."
            type="text"
            id="name"
            error={errors.name?.message}
            {...register('name')}
          />
        </div>
        <div>
          <label className="text-white" htmlFor="email">
            Email
          </label>
          <Input
            placeholder="Your email..."
            type="email"
            id="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div>
          <label className="text-white" htmlFor="password">
            Password
          </label>
          <Input
            placeholder="Your password..."
            type="password"
            id="password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <p className="text-white mt-4">
        Already have an account?{' '}
        <Link className="text-[#2F80ED]" href={'/'}>
          Sign-in
        </Link>
      </p>
    </main>
  );
}
