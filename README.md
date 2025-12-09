# 🛠️ Developer Tools UI

一个现代化的、功能丰富的前端开发者工具集，提供各种常用的开发工具，如加密解密、JSON 处理、时间戳转换等。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-5.4+-646cff.svg)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## ✨ 特性

- 🚀 **快速高效** - 基于 Vite 构建，启动速度极快
- 🎨 **现代化 UI** - 使用 shadcn/ui 和 Tailwind CSS，界面美观
- 🌓 **主题切换** - 支持明暗主题，保护眼睛
- 📱 **响应式设计** - 完美适配桌面、平板和移动设备
- 🔒 **隐私安全** - 所有操作在本地完成，不上传任何数据
- ⚡ **离线可用** - 支持 PWA，可离线使用
- 🎯 **类型安全** - 使用 TypeScript，代码更可靠

## 🎯 功能列表

### 🔐 加密解密工具
- **AES 加密/解密** - 支持多种模式（CBC, ECB, CTR 等）
- **RSA 加密/解密** - 支持公钥/私钥生成
- **DES/3DES 加密/解密** - 经典加密算法
- **哈希生成** - MD5, SHA-1, SHA-256, SHA-512
- **HMAC 生成** - 消息认证码
- **密钥生成器** - 随机密钥生成

### 📝 JSON 工具
- **JSON 格式化** - 美化 JSON，支持自定义缩进
- **JSON 压缩** - 最小化 JSON，减少体积
- **JSON 转义/去转义** - 处理特殊字符
- **JSON 验证** - 语法检查，错误定位
- **JSON 路径查询** - 快速查找数据

### ⏰ 时间戳工具
- **时间戳转换** - 时间戳 ↔ 日期时间
- **多种格式支持** - 秒、毫秒、微秒
- **时区转换** - 支持全球时区
- **相对时间** - 计算时间差
- **批量转换** - 一次转换多个时间戳

### 🔤 Base64 工具
- **文本编解码** - Base64 编码/解码
- **图片编解码** - 图片转 Base64
- **文件上传** - 支持拖拽上传
- **URL Safe** - URL 安全的 Base64

### 🔗 URL 工具
- **URL 编解码** - URL 编码/解码
- **参数解析** - 解析 URL 参数
- **URL 构建器** - 快速构建 URL
- **Query String 转 JSON** - 参数转对象

### 🎨 颜色转换工具
- **HEX ↔ RGB** - 十六进制与 RGB 互转
- **RGB ↔ HSL** - RGB 与 HSL 互转
- **颜色预览** - 实时预览颜色
- **颜色选择器** - 可视化选择颜色
- **渐变生成** - 生成渐变色

### 🔍 正则表达式工具
- **正则测试** - 测试正则表达式
- **匹配高亮** - 高亮显示匹配结果
- **常用模板** - 邮箱、手机号等常用正则
- **正则替换** - 批量替换文本
- **正则解释** - 解释正则表达式含义

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/tool-ui.git

# 进入项目目录
cd tool-ui

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📦 技术栈

- **框架**: React 18.3+
- **语言**: TypeScript 5.5+
- **构建工具**: Vite 5.4+
- **UI 框架**: shadcn/ui + Tailwind CSS
- **路由**: React Router 6.26+
- **状态管理**: Zustand 4.5+
- **加密库**: crypto-js 4.2+
- **日期处理**: date-fns 3.0+
- **图标**: Lucide React
- **通知**: React Hot Toast

## 📁 项目结构

```
tool-ui/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   │   ├── ui/           # shadcn/ui 组件
│   │   ├── layout/       # 布局组件
│   │   └── common/       # 通用组件
│   ├── features/          # 功能模块
│   │   ├── crypto/       # 加密工具
│   │   ├── json/         # JSON 工具
│   │   ├── timestamp/    # 时间戳工具
│   │   ├── base64/       # Base64 工具
│   │   ├── url/          # URL 工具
│   │   ├── color/        # 颜色工具
│   │   └── regex/        # 正则工具
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具函数
│   ├── pages/            # 页面组件
│   ├── store/            # 状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # 类型定义
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 入口文件
│   └── router.tsx        # 路由配置
├── .eslintrc.cjs         # ESLint 配置
├── .prettierrc           # Prettier 配置
├── components.json       # shadcn/ui 配置
├── tailwind.config.js    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── package.json          # 项目配置
```

## 🎨 主题

应用支持明暗两种主题，可以通过右上角的主题切换按钮进行切换。主题设置会自动保存到本地存储。

## 📱 响应式设计

- **桌面端** (≥1024px): 侧边栏 + 主内容区
- **平板端** (768px-1023px): 可折叠侧边栏
- **移动端** (<768px): 底部导航栏

## 🔒 隐私和安全

- ✅ 所有操作在浏览器本地完成
- ✅ 不上传任何数据到服务器
- ✅ 不收集用户信息
- ✅ 开源透明，代码可审查

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Conventional Commits 规范
- 编写单元测试
- 更新文档

## 🧪 测试

```bash
# 运行单元测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 运行 E2E 测试
npm run test:e2e
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详情。

## 🙏 致谢

- [React](https://react.dev/) - 用户界面库
- [Vite](https://vitejs.dev/) - 构建工具
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库

## 📮 联系方式

- 项目主页: [https://github.com/yourusername/tool-ui](https://github.com/yourusername/tool-ui)
- 问题反馈: [https://github.com/yourusername/tool-ui/issues](https://github.com/yourusername/tool-ui/issues)

## 🗺️ 路线图

- [x] 基础架构搭建
- [x] 核心工具实现
- [ ] 用户系统（可选）
- [ ] 云端同步（可选）
- [ ] 插件系统
- [ ] 国际化支持
- [ ] 移动端 App
- [ ] 桌面端应用

## ⭐ Star History

如果这个项目对你有帮助，请给它一个 Star ⭐️

---

Made with ❤️ by [Your Name](https://github.com/yourusername)