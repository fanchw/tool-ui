import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface ToolbarButton {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
}

interface ToolbarProps {
  buttons: ToolbarButton[];
  children?: ReactNode;
  size?: 'sm' | 'md';
  padding?: 'sm' | 'md';
}

export function Toolbar({ 
  buttons, 
  children,
  size = 'sm',
  padding = 'sm'
}: ToolbarProps) {
  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const cardPadding = padding === 'sm' ? 'p-3' : 'p-4';
  const gapClass = size === 'sm' ? 'gap-1.5' : 'gap-2';
  
  return (
    <Card className={cardPadding}>
      <div className="flex flex-wrap gap-2 items-center">
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            variant={button.variant || 'default'}
            size={buttonSize}
            className={button.icon ? gapClass : ''}
            disabled={button.disabled}
          >
            {button.icon && <button.icon className={iconSize} />}
            {button.label}
          </Button>
        ))}
        {children}
      </div>
    </Card>
  );
}
