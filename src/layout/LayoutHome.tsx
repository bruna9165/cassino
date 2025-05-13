import { Sidebar } from '@/components/Sidebar/Sidebar';
import React from 'react';
import { cn } from '@/lib/utils'; 

interface LayoutHomeProps {
  children: React.ReactNode;
  className?: string; 
}

export function LayoutHome({ children, className }: LayoutHomeProps) {
  return (
    <div
      className={cn(
        'h-screen w-screen bg-gradient-to-b from-[#07080D] to-[#1D1F2C] ',
        className
      )}
    >
      <Sidebar />
      <div className="ml-80 p-14">{children}</div>
    </div>
  );
}