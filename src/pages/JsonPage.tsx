import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MonacoEditor } from '@/components/common/MonacoEditor';
import { CopyButton } from '@/components/common/CopyButton';
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

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileJson className="h-8 w-8" />
          JSON 工具
        </h1>
        <p className="text-muted-foreground mt-2">
          JSON 格式化、压缩、验证、转义工具
        </p>
      </div>

      {/* 工具栏 */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleFormat} className="gap-2">
            <Maximize2 className="h-4 w-4" />
            格式化
          </Button>
          <Button onClick={handleCompress} variant="secondary" className="gap-2">
            <Minimize2 className="h-4 w-4" />
            压缩
          </Button>
          <Button onClick={handleValidate} variant="outline" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            验证
          </Button>
          <Button onClick={handleEscape} variant="outline" className="gap-2">
            转义
          </Button>
          <Button onClick={handleUnescape} variant="outline" className="gap-2">
            去转义
          </Button>
          <Button onClick={handleClear} variant="ghost" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            清空
          </Button>
          <Button onClick={handleExample} variant="ghost" className="gap-2">
            <Wand2 className="h-4 w-4" />
            示例
          </Button>
          
          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm text-muted-foreground">缩进:</label>
            <Input
              type="number"
              min="0"
              max="8"
              value={indent}
              onChange={(e) => setIndent(e.target.value)}
              className="w-16"
            />
          </div>
        </div>
      </Card>

      {/* 验证状态 */}
      {isValid !== null && (
        <Card className={`p-4 ${isValid ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <div className="flex items-start gap-2">
            {isValid ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    JSON 格式正确
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    您的 JSON 数据格式正确，可以正常使用
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 dark:text-red-100">
                    JSON 格式错误
                  </p>
                  {error && (
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1 font-mono">
                      {error}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {/* 输入输出区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 输入区 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">输入</h3>
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground">
                {input.length} 字符
              </span>
            </div>
          </div>
          <MonacoEditor
            value={input}
            onChange={setInput}
            placeholder="请输入 JSON 数据..."
            language="json"
            minHeight="400px"
            maxHeight="600px"
          />
        </Card>

        {/* 输出区 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">输出</h3>
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground">
                {output.length} 字符
              </span>
              {output && <CopyButton text={output} />}
            </div>
          </div>
          <MonacoEditor
            value={output}
            onChange={setOutput}
            placeholder="处理结果将显示在这里..."
            language="json"
            minHeight="400px"
            maxHeight="600px"
          />
        </Card>
      </div>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>格式化</strong>: 将压缩的 JSON 格式化为易读的格式</p>
          <p>• <strong>压缩</strong>: 移除 JSON 中的空格和换行，减小体积</p>
          <p>• <strong>验证</strong>: 检查 JSON 格式是否正确</p>
          <p>• <strong>转义</strong>: 将 JSON 转换为转义字符串格式</p>
          <p>• <strong>去转义</strong>: 将转义的 JSON 字符串还原为正常格式</p>
          <p>• <strong>缩进</strong>: 设置格式化时的缩进空格数（0-8）</p>
        </div>
      </Card>
    </div>
  );
}