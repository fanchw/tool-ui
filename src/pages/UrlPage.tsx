import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/common/CodeEditor';
import { CopyButton } from '@/components/common/CopyButton';
import { 
  Link2, 
  Code2,
  List,
  RotateCcw,
  Wand2,
  Plus,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UrlParam {
  key: string;
  value: string;
}

export default function UrlPage() {
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeOutput, setEncodeOutput] = useState('');
  const [parseUrl, setParseUrl] = useState('');
  const [parsedParams, setParsedParams] = useState<UrlParam[]>([]);
  const [buildParams, setBuildParams] = useState<UrlParam[]>([{ key: '', value: '' }]);
  const [buildBaseUrl, setBuildBaseUrl] = useState('');
  const [buildResult, setBuildResult] = useState('');

  // URL 编码
  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(encodeInput);
      setEncodeOutput(encoded);
      toast.success('编码成功');
    } catch (error) {
      toast.error('编码失败');
      console.error('Encode error:', error);
    }
  };

  // URL 解码
  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(encodeInput);
      setEncodeOutput(decoded);
      toast.success('解码成功');
    } catch (error) {
      toast.error('解码失败');
      console.error('Decode error:', error);
    }
  };

  // 清空编码
  const handleClearEncode = () => {
    setEncodeInput('');
    setEncodeOutput('');
  };

  // 编码示例
  const handleEncodeExample = () => {
    setEncodeInput('https://example.com/search?q=前端开发&type=article&page=1');
  };

  // 解析 URL
  const handleParseUrl = () => {
    try {
      if (!parseUrl.trim()) {
        toast.error('请输入 URL');
        return;
      }

      const url = new URL(parseUrl);
      const params: UrlParam[] = [];
      
      url.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });

      setParsedParams(params);
      
      if (params.length === 0) {
        toast.success('该 URL 没有查询参数');
      } else {
        toast.success(`解析成功，找到 ${params.length} 个参数`);
      }
    } catch (error) {
      toast.error('URL 格式错误');
      console.error('Parse error:', error);
    }
  };

  // 清空解析
  const handleClearParse = () => {
    setParseUrl('');
    setParsedParams([]);
  };

  // 解析示例
  const handleParseExample = () => {
    setParseUrl('https://example.com/search?q=前端开发&type=article&page=1&sort=date');
  };

  // 添加参数
  const handleAddParam = () => {
    setBuildParams([...buildParams, { key: '', value: '' }]);
  };

  // 删除参数
  const handleRemoveParam = (index: number) => {
    const newParams = buildParams.filter((_, i) => i !== index);
    setBuildParams(newParams.length > 0 ? newParams : [{ key: '', value: '' }]);
  };

  // 更新参数
  const handleUpdateParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...buildParams];
    newParams[index][field] = value;
    setBuildParams(newParams);
  };

  // 构建 URL
  const handleBuildUrl = () => {
    try {
      if (!buildBaseUrl.trim()) {
        toast.error('请输入基础 URL');
        return;
      }

      // 验证基础 URL
      let baseUrl = buildBaseUrl.trim();
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = 'https://' + baseUrl;
      }

      const url = new URL(baseUrl);
      
      // 添加参数
      buildParams.forEach(param => {
        if (param.key.trim()) {
          url.searchParams.append(param.key.trim(), param.value);
        }
      });

      setBuildResult(url.toString());
      toast.success('URL 构建成功');
    } catch (error) {
      toast.error('URL 构建失败，请检查基础 URL 格式');
      console.error('Build error:', error);
    }
  };

  // 清空构建
  const handleClearBuild = () => {
    setBuildBaseUrl('');
    setBuildParams([{ key: '', value: '' }]);
    setBuildResult('');
  };

  // 构建示例
  const handleBuildExample = () => {
    setBuildBaseUrl('https://example.com/api/search');
    setBuildParams([
      { key: 'q', value: '前端开发' },
      { key: 'type', value: 'article' },
      { key: 'page', value: '1' }
    ]);
  };

  // 参数转 JSON
  const paramsToJson = () => {
    const obj: Record<string, string> = {};
    parsedParams.forEach(param => {
      obj[param.key] = param.value;
    });
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Link2 className="h-8 w-8" />
          URL 工具
        </h1>
        <p className="text-muted-foreground mt-2">
          URL 编码解码、参数解析、URL 构建工具
        </p>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="encode" className="gap-2">
            <Code2 className="h-4 w-4" />
            编码解码
          </TabsTrigger>
          <TabsTrigger value="parse" className="gap-2">
            <List className="h-4 w-4" />
            参数解析
          </TabsTrigger>
          <TabsTrigger value="build" className="gap-2">
            <Link2 className="h-4 w-4" />
            URL 构建
          </TabsTrigger>
        </TabsList>

        {/* 编码解码 */}
        <TabsContent value="encode" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleEncode} className="gap-2">
                编码
              </Button>
              <Button onClick={handleDecode} variant="secondary" className="gap-2">
                解码
              </Button>
              <Button onClick={handleClearEncode} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
              <Button onClick={handleEncodeExample} variant="ghost" className="gap-2">
                <Wand2 className="h-4 w-4" />
                示例
              </Button>
            </div>
          </Card>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 输入区 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">输入</h3>
                <span className="text-sm text-muted-foreground">
                  {encodeInput.length} 字符
                </span>
              </div>
              <CodeEditor
                value={encodeInput}
                onChange={setEncodeInput}
                placeholder="请输入要编码或解码的 URL..."
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
                    {encodeOutput.length} 字符
                  </span>
                  {encodeOutput && <CopyButton text={encodeOutput} />}
                </div>
              </div>
              <CodeEditor
                value={encodeOutput}
                onChange={setEncodeOutput}
                placeholder="处理结果将显示在这里..."
                readOnly
                minHeight="400px"
                maxHeight="600px"
              />
            </Card>
          </div>
        </TabsContent>

        {/* 参数解析 */}
        <TabsContent value="parse" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleParseUrl} className="gap-2">
                解析
              </Button>
              <Button onClick={handleClearParse} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
              <Button onClick={handleParseExample} variant="ghost" className="gap-2">
                <Wand2 className="h-4 w-4" />
                示例
              </Button>
            </div>
          </Card>

          {/* URL 输入 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">URL 地址</h3>
            <Input
              value={parseUrl}
              onChange={(e) => setParseUrl(e.target.value)}
              placeholder="请输入完整的 URL 地址..."
              className="font-mono"
            />
          </Card>

          {/* 参数列表 */}
          {parsedParams.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">查询参数 ({parsedParams.length})</h3>
                <CopyButton text={paramsToJson()} showText />
              </div>
              <div className="space-y-2">
                {parsedParams.map((param, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">参数名</div>
                      <div className="font-mono text-sm">{param.key}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">参数值</div>
                      <div className="font-mono text-sm break-all">{param.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* URL 构建 */}
        <TabsContent value="build" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleBuildUrl} className="gap-2">
                构建 URL
              </Button>
              <Button onClick={handleClearBuild} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
              <Button onClick={handleBuildExample} variant="ghost" className="gap-2">
                <Wand2 className="h-4 w-4" />
                示例
              </Button>
            </div>
          </Card>

          {/* 基础 URL */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">基础 URL</h3>
            <Input
              value={buildBaseUrl}
              onChange={(e) => setBuildBaseUrl(e.target.value)}
              placeholder="https://example.com/api/endpoint"
              className="font-mono"
            />
          </Card>

          {/* 参数列表 */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">查询参数</h3>
              <Button onClick={handleAddParam} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                添加参数
              </Button>
            </div>
            <div className="space-y-2">
              {buildParams.map((param, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={param.key}
                    onChange={(e) => handleUpdateParam(index, 'key', e.target.value)}
                    placeholder="参数名"
                    className="font-mono"
                  />
                  <Input
                    value={param.value}
                    onChange={(e) => handleUpdateParam(index, 'value', e.target.value)}
                    placeholder="参数值"
                    className="font-mono"
                  />
                  <Button
                    onClick={() => handleRemoveParam(index)}
                    size="icon"
                    variant="ghost"
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* 构建结果 */}
          {buildResult && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">构建结果</h3>
                <CopyButton text={buildResult} />
              </div>
              <div className="p-3 bg-muted/30 rounded-lg font-mono text-sm break-all">
                {buildResult}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>编码解码：</strong></p>
          <p>• <strong>编码</strong>: 将 URL 中的特殊字符转换为百分号编码</p>
          <p>• <strong>解码</strong>: 将百分号编码还原为原始字符</p>
          
          <p className="mt-4"><strong>参数解析：</strong></p>
          <p>• 输入完整的 URL 地址</p>
          <p>• 自动提取并显示所有查询参数</p>
          <p>• 支持复制为 JSON 格式</p>
          
          <p className="mt-4"><strong>URL 构建：</strong></p>
          <p>• 输入基础 URL 地址</p>
          <p>• 添加多个查询参数</p>
          <p>• 自动生成完整的 URL</p>
        </div>
      </Card>
    </div>
  );
}