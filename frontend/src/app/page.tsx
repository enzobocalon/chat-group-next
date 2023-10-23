'use client';

import Button from '@/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { SigninParams } from '@/services/auth/signin';
import { useAuth } from '@/hooks/useAuth';

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um E-mail válido'),
  password: z.string().min(8, 'Senha é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <main className="w-screen h-screen bg-app flex flex-col items-center justify-center">
      <h1 className="text-lg text-white font-bold my-4">Login now!</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            error={errors.password?.message}
            id="password"
            {...register('password')}
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
