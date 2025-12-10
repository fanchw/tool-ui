import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category?: string;
}

export function ToolCard({ title, description, icon: Icon, href, category }: ToolCardProps) {
  return (
    <Link to={href} className="block group">
      <Card className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 border-2 hover:border-primary/30 bg-card/50 backdrop-blur">
        {/* 渐变背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 光晕效果 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                  {title}
                </CardTitle>
                {category && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20">
                    {category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {description}
          </CardDescription>
          
          {/* 箭头指示器 */}
          <div className="mt-4 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
            <span>了解更多</span>
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}