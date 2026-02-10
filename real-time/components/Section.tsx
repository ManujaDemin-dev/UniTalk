import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn("min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-10 relative z-10", className)}>
            {children}
        </section>
    );
}
