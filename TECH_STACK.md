# 技术栈详细说明

## 核心依赖

### 运行时依赖 (dependencies)

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.0",
  "zustand": "^4.5.0",
  "crypto-js": "^4.2.0",
  "date-fns": "^3.0.0",
  "lucide-react": "^0.400.0",
  "react-hot-toast": "^2.4.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.4.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-dropdown-menu": "^2.1.0",
  "@radix-ui/react-select": "^2.1.0",
  "@radix-ui/react-tabs": "^1.1.0",
  "@radix-ui/react-tooltip": "^1.1.0",
  "@radix-ui/react-switch": "^1.1.0",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-slot": "^1.1.0"
}
```

### 开发依赖 (devDependencies)

```json
{
  "@types/react": "^18.3.0",
  "@types/react-dom": "^18.3.0",
  "@types/crypto-js": "^4.2.0",
  "@typescript-eslint/eslint-plugin": "^7.0.0",
  "@typescript-eslint/parser": "^7.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "typescript": "^5.5.0",
  "vite": "^5.4.0",
  "eslint": "^8.57.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.0",
  "prettier": "^3.3.0",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "vitest": "^1.6.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/jest-dom": "^6.4.0"
}
```

## 技术选型理由

### 1. React 18.3+

**选择理由:**
- 成熟稳定的生态系统
- 优秀的性能（Concurrent Features）
- 丰富的社区资源和第三方库
- 良好的 TypeScript 支持
- 适合构建复杂的单页应用

**核心特性:**
- Concurrent Rendering
- Automatic Batching
- Transitions API
- Suspense for Data Fetching

### 2. TypeScript 5.5+

**选择理由:**
- 静态类型检查，减少运行时错误
- 更好的 IDE 支持和代码提示
- 提高代码可维护性
- 更好的重构支持
- 自文档化代码

**配置要点:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 3. Vite 5.4+

**选择理由:**
- 极快的冷启动速度
- 即时的热模块替换（HMR）
- 优化的生产构建（基于 Rollup）
- 开箱即用的 TypeScript 支持
- 丰富的插件生态

**性能对比:**
- 开发服务器启动: Vite < 1s vs Webpack ~10s
- HMR 更新: Vite < 100ms vs Webpack ~1s
- 生产构建: 优化的 Tree Shaking 和代码分割

**配置示例:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'crypto-vendor': ['crypto-js'],
          'ui-vendor': ['lucide-react', 'react-hot-toast'],
        },
      },
    },
  },
});
```

### 4. shadcn/ui + Radix UI

**选择理由:**
- 完全可定制的组件
- 无需安装整个组件库，按需复制
- 基于 Radix UI，保证可访问性
- 与 Tailwind CSS 完美集成
- 现代化的设计风格

**核心组件:**
- Dialog: 模态框
- Dropdown Menu: 下拉菜单
- Select: 选择器
- Tabs: 标签页
- Tooltip: 提示框
- Switch: 开关
- Button: 按钮
- Input: 输入框
- Textarea: 文本域
- Card: 卡片

**优势:**
- 完全控制组件代码
- 易于定制样式
- 无额外的 bundle 大小
- 符合 WAI-ARIA 标准

### 5. Tailwind CSS 3.4+

**选择理由:**
- 实用优先的 CSS 框架
- 高度可定制
- 优秀的开发体验
- 自动清除未使用的样式
- 响应式设计简单

**配置示例:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... 更多颜色定义
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

### 6. React Router 6.26+

**选择理由:**
- React 官方推荐的路由库
- 声明式路由配置
- 支持嵌套路由
- 代码分割友好
- 强大的导航 API

**路由配置示例:**
```typescript
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'json', element: <JsonPage /> },
      { path: 'timestamp', element: <TimestampPage /> },
      // ... 更多路由
    ],
  },
]);
```

### 7. Zustand 4.5+

**选择理由:**
- 极简的状态管理库
- 无需 Provider 包裹
- 优秀的 TypeScript 支持
- 小巧的体积（~1KB）
- 易于学习和使用

**对比其他方案:**
- vs Redux: 更简单，无需 actions/reducers
- vs Context API: 更好的性能，避免不必要的重渲染
- vs Jotai/Recoil: 更简单的 API

**使用示例:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    { name: 'theme-storage' }
  )
);
```

### 8. crypto-js 4.2+

**选择理由:**
- 纯 JavaScript 实现，无需 Node.js
- 支持多种加密算法
- 浏览器兼容性好
- 简单易用的 API

**支持的算法:**
- AES (Advanced Encryption Standard)
- DES (Data Encryption Standard)
- Triple DES
- Rabbit
- RC4
- MD5
- SHA-1, SHA-256, SHA-512
- HMAC

**使用示例:**
```typescript
import CryptoJS from 'crypto-js';

// AES 加密
const encrypted = CryptoJS.AES.encrypt('message', 'secret key').toString();

// AES 解密
const decrypted = CryptoJS.AES.decrypt(encrypted, 'secret key');
const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

// SHA-256 哈希
const hash = CryptoJS.SHA256('message').toString();
```

### 9. date-fns 3.0+

**选择理由:**
- 模块化设计，按需导入
- 不可变性，函数式编程
- TypeScript 原生支持
- 小巧的体积
- 丰富的日期处理函数

**对比 Moment.js:**
- 更小的 bundle 大小
- 不可变的 API
- Tree-shaking 友好
- 更好的 TypeScript 支持

**使用示例:**
```typescript
import { format, parseISO, addDays } from 'date-fns';

// 格式化日期
const formatted = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

// 解析 ISO 字符串
const date = parseISO('2024-01-01T00:00:00Z');

// 日期计算
const tomorrow = addDays(new Date(), 1);
```

### 10. Lucide React 0.400+

**选择理由:**
- 现代化的图标库
- 基于 Feather Icons
- 完全可定制
- Tree-shaking 友好
- 优秀的 TypeScript 支持

**特点:**
- 1000+ 图标
- 一致的设计风格
- 可调整大小、颜色、描边宽度
- 支持 React 组件

**使用示例:**
```typescript
import { Lock, Key, Hash, Clock } from 'lucide-react';

<Lock size={24} color="#000" strokeWidth={2} />
```

### 11. React Hot Toast 2.4+

**选择理由:**
- 轻量级的通知库
- 美观的默认样式
- 高度可定制
- 支持 Promise 通知
- 无需额外配置

**使用示例:**
```typescript
import toast from 'react-hot-toast';

// 成功通知
toast.success('操作成功！');

// 错误通知
toast.error('操作失败！');

// Promise 通知
toast.promise(
  saveData(),
  {
    loading: '保存中...',
    success: '保存成功！',
    error: '保存失败！',
  }
);
```

## 开发工具

### 1. ESLint + Prettier

**ESLint 配置:**
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
```

**Prettier 配置:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 2. Vitest

**选择理由:**
- 与 Vite 完美集成
- 快速的测试执行
- 兼容 Jest API
- 内置代码覆盖率

**配置示例:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

## 性能优化策略

### 1. 代码分割

```typescript
// 路由级别的代码分割
import { lazy, Suspense } from 'react';

const CryptoPage = lazy(() => import('./pages/CryptoPage'));
const JsonPage = lazy(() => import('./pages/JsonPage'));

// 使用 Suspense 包裹
<Suspense fallback={<Loading />}>
  <CryptoPage />
</Suspense>
```

### 2. Bundle 分析

```bash
# 安装 rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer

# 在 vite.config.ts 中配置
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});
```

### 3. 资源优化

- 图片懒加载
- 使用 WebP 格式
- 启用 Gzip/Brotli 压缩
- CDN 加速

## 浏览器兼容性

### 目标浏览器

```json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}
```

### 支持的浏览器

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills

如需支持更旧的浏览器，可以添加：
- core-js
- regenerator-runtime

## 总结

这个技术栈的选择遵循以下原则：

1. **现代化**: 使用最新的稳定版本
2. **性能优先**: 选择性能优秀的工具
3. **开发体验**: 提供良好的 DX
4. **可维护性**: 易于理解和维护
5. **社区支持**: 活跃的社区和丰富的资源
6. **类型安全**: 完整的 TypeScript 支持
7. **轻量级**: 避免过度依赖，控制 bundle 大小

这些技术的组合为项目提供了：
- 快速的开发速度
- 优秀的运行性能
- 良好的用户体验
- 易于维护和扩展