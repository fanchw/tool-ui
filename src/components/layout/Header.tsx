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
    <header className="sticky top-0 z-50 w-full border-b glass shadow-sm">
      <div className="container flex h-16 items-center">
        {/* 移动端菜单按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden hover:bg-primary/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110">
            <span className="text-xl font-bold">DT</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="hidden font-bold text-lg sm:inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Developer Tools
          </span>
        </Link>

        {/* 导航菜单 - 桌面端 */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:space-x-1 text-sm font-medium">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg transition-all hover:bg-primary/10 text-foreground hover:text-primary relative group"
          >
            首页
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 group-hover:w-3/4 transition-all duration-300" />
          </Link>
          <Link
            to="/crypto"
            className="px-4 py-2 rounded-lg transition-all hover:bg-primary/10 text-foreground/60 hover:text-primary relative group"
          >
            加密工具
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 group-hover:w-3/4 transition-all duration-300" />
          </Link>
          <Link
            to="/json"
            className="px-4 py-2 rounded-lg transition-all hover:bg-primary/10 text-foreground/60 hover:text-primary relative group"
          >
            JSON工具
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 group-hover:w-3/4 transition-all duration-300" />
          </Link>
          <Link
            to="/timestamp"
            className="px-4 py-2 rounded-lg transition-all hover:bg-primary/10 text-foreground/60 hover:text-primary relative group"
          >
            时间戳
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 group-hover:w-3/4 transition-all duration-300" />
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
            className="relative hover:bg-primary/10 group"
          >
            <div className="relative">
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform group-hover:rotate-180 group-hover:scale-110" />
              ) : (
                <Moon className="h-5 w-5 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
              )}
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* GitHub 链接 */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-primary/10 group"
          >
            <a
              href="https://github.com/yourusername/tool-ui"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}