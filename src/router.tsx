import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';

// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'));
const CryptoPage = lazy(() => import('@/pages/CryptoPage'));
const JsonPage = lazy(() => import('@/pages/JsonPage'));
const TimestampPage = lazy(() => import('@/pages/TimestampPage'));
const Base64Page = lazy(() => import('@/pages/Base64Page'));
const UrlPage = lazy(() => import('@/pages/UrlPage'));
const ColorPage = lazy(() => import('@/pages/ColorPage'));
const RegexPage = lazy(() => import('@/pages/RegexPage'));

// 加载组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crypto" element={<CryptoPage />} />
          <Route path="json" element={<JsonPage />} />
          <Route path="timestamp" element={<TimestampPage />} />
          <Route path="base64" element={<Base64Page />} />
          <Route path="url" element={<UrlPage />} />
          <Route path="color" element={<ColorPage />} />
          <Route path="regex" element={<RegexPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;