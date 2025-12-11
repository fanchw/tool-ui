import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/store/useThemeStore';
import { ErrorBoundary } from '@/components/common';
import AppRouter from './router';

function App() {
  const theme = useThemeStore((state) => state.theme);

  // 根据环境变量动态设置 basename
  // 开发环境: "/" (本地开发)
  // 生产环境: "/tool-ui" (GitHub Pages)
  const basename = import.meta.env.DEV ? '/' : '/tool-ui';

  // 初始化主题
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <AppRouter />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;