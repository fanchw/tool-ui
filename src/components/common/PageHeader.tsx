import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  size?: 'sm' | 'lg';
}

export function PageHeader({ 
  icon: Icon, 
  title, 
  description,
  size = 'sm' 
}: PageHeaderProps) {
  const isSmall = size === 'sm';
  
  return (
    <div className={isSmall ? 'flex items-center justify-between' : ''}>
      <div>
        <h1 className={`${isSmall ? 'text-2xl' : 'text-3xl'} font-bold flex items-center gap-2`}>
          <Icon className={isSmall ? 'h-6 w-6' : 'h-8 w-8'} />
          {title}
        </h1>
        <p className={`text-muted-foreground ${isSmall ? 'text-sm mt-1' : 'mt-2'}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
