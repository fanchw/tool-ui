# 项目安装和启动指南

## 📋 前提条件

确保你的系统已安装：
- Node.js 18+ 
- npm 或 yarn 或 pnpm

## 🚀 快速开始

### 1. 安装依赖

项目已经创建了完整的配置文件，现在需要安装所有依赖包：

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

这将安装 `package.json` 中定义的所有依赖，包括：
- React 和 React DOM
- TypeScript
- Vite
- React Router
- Zustand (状态管理)
- crypto-js (加密库)
- date-fns (日期处理)
- Tailwind CSS
- shadcn/ui 相关包
- 以及所有开发依赖

### 2. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:5173 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 4. 预览生产构建

```bash
npm run preview
```

## 📁 当前项目状态

### ✅ 已完成的配置

1. **项目配置文件**
   - ✅ package.json - 项目依赖和脚本
   - ✅ tsconfig.json - TypeScript 配置
   - ✅ tsconfig.node.json - Node TypeScript 配置
   - ✅ vite.config.ts - Vite 构建配置
   - ✅ tailwind.config.js - Tailwind CSS 配置
   - ✅ postcss.config.js - PostCSS 配置
   - ✅ components.json - shadcn/ui 配置

2. **代码质量工具**
   - ✅ .eslintrc.cjs - ESLint 配置
   - ✅ .prettierrc - Prettier 配置
   - ✅ .gitignore - Git 忽略文件

3. **基础代码结构**
   - ✅ index.html - HTML 入口
   - ✅ src/main.tsx - 应用入口
   - ✅ src/App.tsx - 根组件
   - ✅ src/router.tsx - 路由配置
   - ✅ src/styles/globals.css - 全局样式
   - ✅ src/lib/utils.ts - 工具函数
   - ✅ src/types/index.ts - 类型定义
   - ✅ src/store/useThemeStore.ts - 主题状态管理
   - ✅ src/store/useHistoryStore.ts - 历史记录状态管理

### ⏳ 待实现的功能

接下来需要实现：

1. **工具功能开发** (下一步 - 第三阶段)
   - 加密解密工具
   - JSON 工具
   - 时间戳工具
   - Base64 工具
   - URL 工具
   - 颜色转换工具
   - 正则表达式工具

2. **功能完善**
   - 用户体验优化
   - 响应式设计优化
   - 性能优化

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行 ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 格式化代码
npm run format

# 运行测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## ⚠️ 注意事项

1. **TypeScript 错误**
   - 当前看到的 TypeScript 错误是正常的，因为还没有安装依赖包
   - 运行 `npm install` 后这些错误会消失

2. **缺失的文件**
   - 路由中引用的页面组件还未创建
   - 布局组件还未创建
   - 这些将在下一阶段实现

3. **shadcn/ui 组件**
   - 需要使用 `npx shadcn-ui@latest add [component]` 命令添加所需组件
   - 或者在实现具体功能时按需添加

## 📝 下一步

1. 运行 `npm install` 安装所有依赖
2. 创建布局组件（Header, Sidebar, Footer, Layout）
3. 创建页面组件（Home, CryptoPage 等）
4. 实现具体的工具功能
5. 添加 shadcn/ui 组件
6. 测试和优化

## 🆘 常见问题

### Q: 安装依赖时出错？
A: 尝试清除缓存：
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: 端口 5173 被占用？
A: 修改 `vite.config.ts` 中的 `server.port` 配置

### Q: TypeScript 错误不消失？
A: 重启 VS Code 或 TypeScript 服务器

## 📚 相关文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 架构设计文档
- [TECH_STACK.md](./TECH_STACK.md) - 技术栈说明
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - 实施计划
- [PROJECT_SETUP_GUIDE.md](./PROJECT_SETUP_GUIDE.md) - 详细配置指南
- [README.md](./README.md) - 项目说明

---

**当前进度**: 第三阶段进行中 - 工具功能开发 🚀

**已完成功能**:
- ✅ 项目基础搭建（第一阶段）
- ✅ 核心布局开发（Header、Sidebar、Footer、Layout）
- ✅ 主题系统实现（明暗主题切换、平滑动画、持久化）
- ✅ 通用组件开发（ToolCard、CopyButton、CodeEditor、Loading、ErrorBoundary）
- ✅ JSON 工具（格式化、压缩、验证、转义）
- ✅ Base64 工具（文本编解码、图片处理）
- ✅ URL 工具（编码解码、参数解析、URL构建）
- ✅ 时间戳工具（时间戳转换、日期转换、实时显示）
- ✅ 加密解密工具（AES加密、哈希计算、HMAC）
- ✅ 颜色转换工具（HEX/RGB/HSL互转、颜色预览、常用颜色）
- ✅ 正则表达式工具（测试匹配、高亮显示、文本替换、常用模板）

**下一阶段**: 功能完善和优化（用户体验、响应式设计、性能优化）🎯