import { Link } from 'react-router-dom';
import { 
  Lock, 
  FileJson, 
  Clock, 
  FileCode, 
  Link as LinkIcon, 
  Palette, 
  Search,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

function ToolCard({ title, description, icon, path }: ToolCardProps) {
  return (
    <Link to={path}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-105">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{description}</CardDescription>
          <div className="mt-4 flex items-center text-sm text-primary">
            <span>开始使用</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const tools = [
    {
      title: '加密解密',
      description: '支持 AES、DES、MD5、SHA 等多种加密算法，保护您的数据安全',
      icon: <Lock className="h-5 w-5" />,
      path: '/crypto'
    },
    {
      title: 'JSON 工具',
      description: 'JSON 格式化、压缩、验证，让 JSON 数据处理更简单',
      icon: <FileJson className="h-5 w-5" />,
      path: '/json'
    },
    {
      title: '时间戳转换',
      description: '时间戳与日期时间互转，支持多种时间格式和时区',
      icon: <Clock className="h-5 w-5" />,
      path: '/timestamp'
    },
    {
      title: 'Base64 编解码',
      description: 'Base64 编码解码，支持文本和图片处理',
      icon: <FileCode className="h-5 w-5" />,
      path: '/base64'
    },
    {
      title: 'URL 工具',
      description: 'URL 编码解码、参数解析，轻松处理 URL 相关问题',
      icon: <LinkIcon className="h-5 w-5" />,
      path: '/url'
    },
    {
      title: '颜色转换',
      description: 'HEX、RGB、HSL 颜色格式互转，实时预览效果',
      icon: <Palette className="h-5 w-5" />,
      path: '/color'
    },
    {
      title: '正则表达式',
      description: '正则表达式测试工具，支持匹配高亮和常用模板',
      icon: <Search className="h-5 w-5" />,
      path: '/regex'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          开发者工具集
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          为开发者打造的实用工具集合，提供加密、编码、格式化等常用功能
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.path}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="rounded-lg border bg-card p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">开源免费</h2>
        <p className="text-muted-foreground mb-4">
          所有工具完全免费使用，数据处理均在本地完成，保护您的隐私安全
        </p>
        <a
          href="https://github.com/yourusername/tool-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <span>在 GitHub 上查看源码</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}