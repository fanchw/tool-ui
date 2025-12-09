import { Moon, Sun, Github, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/useThemeStore';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* 移动端菜单按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">DT</span>
          </div>
          <span className="hidden font-bold sm:inline-block">
            Developer Tools
          </span>
        </Link>

        {/* 导航菜单 - 桌面端 */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            首页
          </Link>
          <Link
            to="/crypto"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            加密工具
          </Link>
          <Link
            to="/json"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            JSON工具
          </Link>
          <Link
            to="/timestamp"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            时间戳
          </Link>
        </nav>

        {/* 右侧操作区 */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* 主题切换 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* GitHub 链接 */}
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/yourusername/tool-ui"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}