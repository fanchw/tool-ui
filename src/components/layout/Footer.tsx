import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with{' '}
            <Heart className="inline h-4 w-4 text-red-500" fill="currentColor" />{' '}
            by developers, for developers.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/fanchw/tool-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://github.com/fanchw/tool-ui/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            反馈
          </a>
          <span>•</span>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}