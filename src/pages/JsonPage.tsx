import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MonacoEditor } from '@/components/common/MonacoEditor';
import { PageHeader, Toolbar, EditorSection, UsageInstructions } from '@/components/common';
import type { ToolbarButton } from '@/components/common';
import { 
  FileJson, 
  Minimize2, 
  Maximize2, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  Wand2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function JsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // JSON 格式化
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indent) || 2);
      setOutput(formatted);
      setError('');
      setIsValid(true);
      toast.success('格式化成功');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '格式化失败';
      setError(errorMessage);
      setIsValid(false);
      toast.error('JSON 格式错误');
    }
  };

  // JSON 压缩
  const handleCompress = () => {
    try {
      const parsed = JSON.parse(input);
      const compressed = JSON.stringify(parsed);
      setOutput(compressed);
      setError('');
      setIsValid(true);
      toast.success('压缩成功');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '压缩失败';
      setError(errorMessage);
      setIsValid(false);
      toast.error('JSON 格式错误');
    }
  };

  // JSON 验证
  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError('');
      setIsValid(true);
      toast.success('JSON 格式正确');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '验证失败';
      setError(errorMessage);
      setIsValid(false);
      toast.error('JSON 格式错误');
    }
  };

  // JSON 转义
  const handleEscape = () => {
    try {
      const parsed = JSON.parse(input);
      const jsonString = JSON.stringify(parsed);
      const escaped = JSON.stringify(jsonString);
      setOutput(escaped);
      setError('');
      setIsValid(true);
      toast.success('转义成功');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '转义失败';
      setError(errorMessage);
      setIsValid(false);
      toast.error('JSON 格式错误');
    }
  };

  // JSON 去转义
  const handleUnescape = () => {
    try {
      const unescaped = JSON.parse(input);
      if (typeof unescaped === 'string') {
        const parsed = JSON.parse(unescaped);
        const formatted = JSON.stringify(parsed, null, parseInt(indent) || 2);
        setOutput(formatted);
        setError('');
        setIsValid(true);
        toast.success('去转义成功');
      } else {
        throw new Error('输入不是转义的 JSON 字符串');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '去转义失败';
      setError(errorMessage);
      setIsValid(false);
      toast.error('去转义失败');
    }
  };

  // 清空
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(null);
  };

  // 使用示例
  const handleExample = () => {
    const example = {
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com',
      address: {
        city: '北京',
        district: '朝阳区',
        street: '建国路1号'
      },
      hobbies: ['阅读', '旅游', '摄影'],
      isActive: true,
      balance: 1234.56
    };
    setInput(JSON.stringify(example, null, 2));
    setError('');
    setIsValid(null);
  };

  const toolbarButtons: ToolbarButton[] = [
    { label: '格式化', icon: Maximize2, onClick: handleFormat },
    { label: '压缩', icon: Minimize2, onClick: handleCompress, variant: 'secondary' },
    { label: '验证', icon: CheckCircle2, onClick: handleValidate, variant: 'outline' },
    { label: '转义', onClick: handleEscape, variant: 'outline' },
    { label: '去转义', onClick: handleUnescape, variant: 'outline' },
    { label: '清空', icon: RotateCcw, onClick: handleClear, variant: 'ghost' },
    { label: '示例', icon: Wand2, onClick: handleExample, variant: 'ghost' },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        icon={FileJson}
        title="JSON 工具"
        description="JSON 格式化、压缩、验证、转义工具"
        size="sm"
      />

      <Toolbar buttons={toolbarButtons} size="sm" padding="sm">
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-muted-foreground">缩进:</label>
          <Input
            type="number"
            min="0"
            max="8"
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
            className="w-16 h-8"
          />
        </div>
      </Toolbar>

      {/* 验证状态 - 紧凑版 */}
      {isValid !== null && (
        <Card className={`p-3 ${isValid ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <div className="flex items-start gap-2">
            {isValid ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-green-900 dark:text-green-100">
                    JSON 格式正确
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-0.5">
                    您的 JSON 数据格式正确，可以正常使用
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-red-900 dark:text-red-100">
                    JSON 格式错误
                  </p>
                  {error && (
                    <p className="text-xs text-red-700 dark:text-red-300 mt-0.5 font-mono">
                      {error}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {/* 输入输出区域 - 优化空间 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <EditorSection title="输入" value={input} size="sm" padding="sm">
          <MonacoEditor
            value={input}
            onChange={setInput}
            placeholder="请输入 JSON 数据..."
            language="json"
            minHeight="500px"
            maxHeight="70vh"
          />
        </EditorSection>

        <EditorSection title="输出" value={output} showCopy size="sm" padding="sm">
          <MonacoEditor
            value={output}
            onChange={setOutput}
            placeholder="处理结果将显示在这里..."
            language="json"
            minHeight="500px"
            maxHeight="70vh"
          />
        </EditorSection>
      </div>

      <UsageInstructions collapsible>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-1">格式化</p>
            <p>将压缩的 JSON 格式化为易读的格式</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">压缩</p>
            <p>移除 JSON 中的空格和换行，减小体积</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">验证</p>
            <p>检查 JSON 格式是否正确</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">转义</p>
            <p>将 JSON 转换为转义字符串格式</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">去转义</p>
            <p>将转义的 JSON 字符串还原为正常格式</p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">缩进</p>
            <p>设置格式化时的缩进空格数（0-8）</p>
          </div>
        </div>
      </UsageInstructions>
    </div>
  );
}