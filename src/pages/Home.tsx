import {
  Lock,
  FileJson,
  Clock,
  FileCode,
  Link as LinkIcon,
  Palette,
  Search,
  ArrowRight,
} from 'lucide-react';
import { ToolCard } from '@/components/common';

export default function Home() {
  const tools = [
    {
      title: '加密解密',
      description: '支持 AES、DES、MD5、SHA 等多种加密算法，保护您的数据安全',
      icon: Lock,
      href: '/crypto',
      category: '安全工具',
    },
    {
      title: 'JSON 工具',
      description: 'JSON 格式化、压缩、验证，让 JSON 数据处理更简单',
      icon: FileJson,
      href: '/json',
      category: '数据处理',
    },
    {
      title: '时间戳转换',
      description: '时间戳与日期时间互转，支持多种时间格式和时区',
      icon: Clock,
      href: '/timestamp',
      category: '时间工具',
    },
    {
      title: 'Base64 编解码',
      description: 'Base64 编码解码，支持文本和图片处理',
      icon: FileCode,
      href: '/base64',
      category: '编码工具',
    },
    {
      title: 'URL 工具',
      description: 'URL 编码解码、参数解析，轻松处理 URL 相关问题',
      icon: LinkIcon,
      href: '/url',
      category: '网络工具',
    },
    {
      title: '颜色转换',
      description: 'HEX、RGB、HSL 颜色格式互转，实时预览效果',
      icon: Palette,
      href: '/color',
      category: '设计工具',
    },
    {
      title: '正则表达式',
      description: '正则表达式测试工具，支持匹配高亮和常用模板',
      icon: Search,
      href: '/regex',
      category: '文本工具',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12 relative">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" />
        </div>

        <div className="space-y-4">
          <div className="inline-block">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 animate-pulse">
              ✨ 现代化开发工具集
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block gradient-text animate-gradient bg-gradient-to-r from-primary via-primary/80 to-primary">
              开发者工具集
            </span>
          </h1>

          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground leading-relaxed">
            为开发者打造的实用工具集合，提供加密、编码、格式化等常用功能
            <br />
            <span className="text-sm">
              所有处理均在本地完成，保护您的数据隐私
            </span>
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>完全免费</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>开源项目</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <span>本地处理</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">功能特性</h2>
          <p className="text-muted-foreground">
            选择您需要的工具，立即开始使用
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <div
              key={tool.href}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                category={tool.category}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Additional Info */}
      <div className="relative rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur p-8 text-center overflow-hidden group hover:border-primary/40 transition-all duration-300">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold">开源免费</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            所有工具完全免费使用，数据处理均在本地完成，保护您的隐私安全。
            <br />
            欢迎在 GitHub 上查看源码、提出建议或贡献代码。
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href="https://github.com/yourusername/tool-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>查看源码</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="https://github.com/fanchw/tool-ui/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/20 text-foreground font-medium hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>反馈建议</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
