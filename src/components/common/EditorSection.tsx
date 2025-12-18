import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/common/CopyButton';
import { ReactNode } from 'react';

interface EditorSectionProps {
  title: string;
  value: string;
  characterCount?: boolean;
  showCopy?: boolean;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  };
  children: ReactNode;
  padding?: 'sm' | 'md';
  size?: 'sm' | 'md';
}

export function EditorSection({
  title,
  value,
  characterCount = true,
  showCopy = false,
  actionButton,
  children,
  padding = 'sm',
  size = 'sm'
}: EditorSectionProps) {
  const cardPadding = padding === 'sm' ? 'p-3' : 'p-4';
  const titleSize = size === 'sm' ? 'text-sm' : 'text-base';
  const countSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const buttonHeight = size === 'sm' ? 'h-8' : 'h-9';
  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const gapClass = size === 'sm' ? 'gap-1.5' : 'gap-2';
  const marginBottom = size === 'sm' ? 'mb-2' : 'mb-3';

  return (
    <Card className={cardPadding}>
      <div className={`flex items-center justify-between ${marginBottom}`}>
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold ${titleSize}`}>{title}</h3>
          {characterCount && (
            <span className={`${countSize} text-muted-foreground`}>
              {value.length} 字符
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {showCopy && value && <CopyButton text={value} />}
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              size={buttonSize}
              variant={actionButton.variant || 'default'}
              className={`${gapClass} ${buttonHeight}`}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
}
