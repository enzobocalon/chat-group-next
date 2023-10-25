'use client';

import { Input } from '@/components/Input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRef, KeyboardEvent } from 'react';

interface SearchProps {
  onSearch: (searchContent: string | undefined) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const searchValue = useRef<HTMLInputElement | null>(null);

  function handleChange(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    onSearch(searchValue.current?.value);
  }
  return (
    <>
      <Input onKeyDown={handleChange} placeholder="Search..." ref={searchValue}>
        <MagnifyingGlassIcon className="w-6 h-6" />
      </Input>
    </>
  );
}
