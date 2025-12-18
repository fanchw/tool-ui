import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface UsageInstructionsProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function UsageInstructions({
  title = '使用说明',
  children,
  collapsible = true,
  defaultOpen = false
}: UsageInstructionsProps) {
  if (collapsible) {
    return (
      <details className="group" open={defaultOpen}>
        <summary className="cursor-pointer list-none">
          <Card className="p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{title}</h3>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                ▼
              </span>
            </div>
          </Card>
        </summary>
        <Card className="p-4 mt-2">
          {children}
        </Card>
      </details>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </Card>
  );
}
