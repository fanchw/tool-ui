import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Lock, 
  FileJson, 
  Clock, 
  FileCode, 
  Link as LinkIcon, 
  Palette, 
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Tool {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

interface ToolCategory {
  name: string;
  tools: Tool[];
}

const toolCategories: ToolCategory[] = [
  {
    name: '编码工具',
    tools: [
      {
        name: '加密解密',
        path: '/crypto',
        icon: <Lock className="h-4 w-4" />,
        description: 'AES、DES、MD5、SHA等加密工具'
      },
      {
        name: 'Base64',
        path: '/base64',
        icon: <FileCode className="h-4 w-4" />,
        description: 'Base64编码解码工具'
      }
    ]
  },
  {
    name: '格式化工具',
    tools: [
      {
        name: 'JSON工具',
        path: '/json',
        icon: <FileJson className="h-4 w-4" />,
        description: 'JSON格式化、压缩、验证'
      }
    ]
  },
  {
    name: '转换工具',
    tools: [
      {
        name: '时间戳',
        path: '/timestamp',
        icon: <Clock className="h-4 w-4" />,
        description: '时间戳与日期时间转换'
      },
      {
        name: '颜色转换',
        path: '/color',
        icon: <Palette className="h-4 w-4" />,
        description: 'HEX、RGB、HSL颜色转换'
      }
    ]
  },
  {
    name: '其他工具',
    tools: [
      {
        name: 'URL工具',
        path: '/url',
        icon: <LinkIcon className="h-4 w-4" />,
        description: 'URL编码解码、参数解析'
      },
      {
        name: '正则表达式',
        path: '/regex',
        icon: <Search className="h-4 w-4" />,
        description: '正则表达式测试工具'
      }
    ]
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    toolCategories.map(cat => cat.name)
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredCategories = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <aside className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        {/* 搜索框 */}
        <div className="px-3 py-2">
          <div className="relative group">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="搜索工具..."
              className="pl-10 h-11 border-2 focus:border-primary/50 transition-all bg-card/50 backdrop-blur"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 工具分类列表 */}
        <div className="px-3 space-y-3">
          {filteredCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-primary/10 transition-all group bg-card/50 backdrop-blur border border-border/50"
              >
                <span className="text-foreground group-hover:text-primary transition-colors">{category.name}</span>
                {expandedCategories.includes(category.name) ? (
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:text-primary" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                )}
              </button>

              {expandedCategories.includes(category.name) && (
                <div className="space-y-1.5 pl-2">
                  {category.tools.map((tool) => {
                    const isActive = location.pathname === tool.path;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className={cn(
                          'flex items-start gap-3 rounded-xl px-3 py-3 text-sm transition-all group relative overflow-hidden',
                          isActive
                            ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-foreground shadow-sm border-l-2 border-primary'
                            : 'text-muted-foreground hover:bg-card/80 hover:text-foreground hover:shadow-sm backdrop-blur border border-transparent hover:border-border/50'
                        )}
                      >
                        <div className={cn(
                          "mt-0.5 p-1.5 rounded-lg transition-all",
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary"
                        )}>
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-foreground" : "group-hover:text-foreground"
                          )}>
                            {tool.name}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {tool.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="px-2 py-8 text-center">
              <div className="text-muted-foreground text-sm mb-2">未找到匹配的工具</div>
              <div className="text-xs text-muted-foreground/60">尝试使用其他关键词搜索</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}