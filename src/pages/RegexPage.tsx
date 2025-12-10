import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeEditor } from '@/components/common/CodeEditor';
import { CopyButton } from '@/components/common/CopyButton';
import { 
  Search, 
  RotateCcw,
  Wand2,
  CheckCircle2,
  XCircle,
  Replace
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MatchResult {
  match: string;
  index: number;
  groups?: string[];
}

export default function RegexPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [replaceResult, setReplaceResult] = useState('');
  const [error, setError] = useState('');

  // 测试正则表达式
  const handleTest = () => {
    try {
      if (!pattern) {
        toast.error('请输入正则表达式');
        return;
      }

      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testText)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(results);
      setError('');
      
      if (results.length > 0) {
        toast.success(`找到 ${results.length} 个匹配项`);
      } else {
        toast('没有找到匹配项', { icon: 'ℹ️' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '正则表达式错误';
      setError(errorMessage);
      setMatches([]);
      toast.error('正则表达式错误');
    }
  };

  // 替换文本
  const handleReplace = () => {
    try {
      if (!pattern) {
        toast.error('请输入正则表达式');
        return;
      }

      const regex = new RegExp(pattern, flags);
      const result = replaceText.replace(regex, replaceWith);
      setReplaceResult(result);
      setError('');
      toast.success('替换成功');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '替换失败';
      setError(errorMessage);
      toast.error('替换失败');
    }
  };

  // 清空
  const handleClear = () => {
    setPattern('');
    setFlags('g');
    setTestText('');
    setReplaceText('');
    setReplaceWith('');
    setMatches([]);
    setReplaceResult('');
    setError('');
  };

  // 常用正则表达式模板
  const templates = [
    {
      name: '邮箱',
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      example: 'user@example.com'
    },
    {
      name: '手机号',
      pattern: '1[3-9]\\d{9}',
      example: '13800138000'
    },
    {
      name: 'URL',
      pattern: 'https?://[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*',
      example: 'https://example.com'
    },
    {
      name: 'IP地址',
      pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
      example: '192.168.1.1'
    },
    {
      name: '日期(YYYY-MM-DD)',
      pattern: '\\d{4}-\\d{2}-\\d{2}',
      example: '2024-01-01'
    },
    {
      name: '时间(HH:MM:SS)',
      pattern: '([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]',
      example: '12:30:45'
    },
    {
      name: '中文字符',
      pattern: '[\\u4e00-\\u9fa5]+',
      example: '中文'
    },
    {
      name: '数字',
      pattern: '\\d+',
      example: '12345'
    }
  ];

  // 使用模板
  const handleUseTemplate = (template: typeof templates[0]) => {
    setPattern(template.pattern);
    setTestText(template.example);
    setError('');
  };

  // 高亮显示匹配结果
  const highlightMatches = (text: string, matches: MatchResult[]): JSX.Element => {
    if (matches.length === 0) {
      return <span>{text}</span>;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    matches.forEach((match, idx) => {
      // 添加匹配前的文本
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // 添加匹配的文本（高亮）
      parts.push(
        <span
          key={`match-${idx}`}
          className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded"
        >
          {match.match}
        </span>
      );

      lastIndex = match.index + match.match.length;
    });

    // 添加最后剩余的文本
    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Search className="h-8 w-8" />
          正则表达式
        </h1>
        <p className="text-muted-foreground mt-2">
          正则表达式测试工具，支持匹配高亮和替换功能
        </p>
      </div>

      {/* 正则表达式输入 */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">正则表达式</label>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="请输入正则表达式，例如: \d+"
                className="font-mono"
              />
            </div>
            <div className="w-32">
              <label className="text-sm font-medium mb-2 block">标志</label>
              <Input
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="g, i, m"
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleTest} className="gap-2">
              <Search className="h-4 w-4" />
              测试匹配
            </Button>
            <Button onClick={handleClear} variant="ghost" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              清空
            </Button>
          </div>

          {/* 标志说明 */}
          <div className="text-xs text-muted-foreground space-y-1 bg-muted p-3 rounded-lg">
            <p><strong>标志说明:</strong></p>
            <p>• <strong>g</strong> - 全局匹配（查找所有匹配项）</p>
            <p>• <strong>i</strong> - 忽略大小写</p>
            <p>• <strong>m</strong> - 多行模式</p>
            <p>• <strong>s</strong> - 单行模式（. 匹配换行符）</p>
            <p>• <strong>u</strong> - Unicode 模式</p>
          </div>
        </div>
      </Card>

      {/* 错误提示 */}
      {error && (
        <Card className="p-4 bg-red-50 dark:bg-red-950">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <p className="font-medium text-red-900 dark:text-red-100">
                正则表达式错误
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1 font-mono">
                {error}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* 测试区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 测试文本 */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">测试文本</h3>
              <span className="text-sm text-muted-foreground">
                {testText.length} 字符
              </span>
            </div>
            <CodeEditor
              value={testText}
              onChange={setTestText}
              placeholder="请输入要测试的文本..."
              minHeight="300px"
              maxHeight="500px"
            />
          </div>
        </Card>

        {/* 匹配结果 */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">匹配结果</h3>
              <div className="flex items-center gap-2">
                {matches.length > 0 && (
                  <>
                    <span className="text-sm text-muted-foreground">
                      {matches.length} 个匹配
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </>
                )}
              </div>
            </div>
            
            {matches.length > 0 ? (
              <div className="space-y-3">
                {/* 高亮显示 */}
                <div className="p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap break-all max-h-[300px] overflow-y-auto">
                  {highlightMatches(testText, matches)}
                </div>

                {/* 匹配详情 */}
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {matches.map((match, idx) => (
                    <div key={idx} className="p-3 bg-muted rounded-lg text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">匹配 #{idx + 1}</span>
                        <CopyButton text={match.match} />
                      </div>
                      <div className="space-y-1 text-muted-foreground">
                        <p>内容: <span className="font-mono">{match.match}</span></p>
                        <p>位置: {match.index}</p>
                        {match.groups && match.groups.length > 0 && (
                          <p>分组: {match.groups.join(', ')}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {testText ? '没有找到匹配项' : '请输入测试文本'}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 替换功能 */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">文本替换</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">原始文本</label>
              <CodeEditor
                value={replaceText}
                onChange={setReplaceText}
                placeholder="请输入要替换的文本..."
                minHeight="150px"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">替换结果</label>
              <CodeEditor
                value={replaceResult}
                onChange={setReplaceResult}
                placeholder="替换结果将显示在这里..."
                readOnly
                minHeight="150px"
              />
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">替换为</label>
              <Input
                value={replaceWith}
                onChange={(e) => setReplaceWith(e.target.value)}
                placeholder="输入替换后的文本，支持 $1, $2 等分组引用"
                className="font-mono"
              />
            </div>
            <Button onClick={handleReplace} className="gap-2">
              <Replace className="h-4 w-4" />
              替换
            </Button>
            {replaceResult && <CopyButton text={replaceResult} />}
          </div>
        </div>
      </Card>

      {/* 常用模板 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          常用正则表达式
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {templates.map((template) => (
            <button
              key={template.name}
              onClick={() => handleUseTemplate(template)}
              className="p-3 text-left rounded-lg border hover:bg-accent transition-colors"
            >
              <p className="font-medium mb-1">{template.name}</p>
              <p className="text-xs text-muted-foreground font-mono break-all">
                {template.pattern}
              </p>
            </button>
          ))}
        </div>
      </Card>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>测试匹配</strong>: 输入正则表达式和测试文本，点击"测试匹配"查看匹配结果</p>
          <p>• <strong>高亮显示</strong>: 匹配的文本会以黄色背景高亮显示</p>
          <p>• <strong>匹配详情</strong>: 显示每个匹配项的内容、位置和分组信息</p>
          <p>• <strong>文本替换</strong>: 使用正则表达式替换文本，支持分组引用（$1, $2 等）</p>
          <p>• <strong>常用模板</strong>: 点击模板可以快速使用常见的正则表达式</p>
          <p>• <strong>标志</strong>: 使用标志控制匹配行为，如 g（全局）、i（忽略大小写）等</p>
        </div>
      </Card>
    </div>
  );
}