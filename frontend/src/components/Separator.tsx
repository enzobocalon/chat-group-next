import { cn } from '@/utils/cn';

interface SeparatorProps {
  className?: string;
}

export default function Separator({ className }: SeparatorProps) {
  return <div className={cn('w-full h-[1px] bg-[#828282]', className)}></div>;
}
