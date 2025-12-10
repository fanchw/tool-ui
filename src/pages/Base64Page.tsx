import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/common/CodeEditor';
import { CopyButton } from '@/components/common/CopyButton';
import {
  FileCode2,
  Image as ImageIcon,
  Upload,
  Download,
  RotateCcw,
  Wand2,
  ArrowLeftRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Base64Page() {
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [liveConvert, setLiveConvert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 实时转换效果 - 编码
  useEffect(() => {
    if (liveConvert && textInput) {
      try {
        const encoded = btoa(unescape(encodeURIComponent(textInput)));
        setTextOutput(encoded);
      } catch (error) {
        console.error('Auto encode error:', error);
      }
    }
  }, [textInput, liveConvert]);

  // Base64 编码
  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(textInput)));
      setTextOutput(encoded);
      toast.success('编码成功');
    } catch (error) {
      toast.error('编码失败');
      console.error('Encode error:', error);
    }
  };

  // Base64 解码
  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(textOutput)));
      setTextInput(decoded);
      toast.success('解码成功');
    } catch (error) {
      toast.error('解码失败，请检查输入是否为有效的 Base64');
      console.error('Decode error:', error);
    }
  };

  // 清空文本
  const handleClearText = () => {
    setTextInput('');
    setTextOutput('');
  };

  // 文本示例
  const handleTextExample = () => {
    setTextInput('Hello, 世界！这是一个 Base64 编码示例。');
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请选择图片文件');
      return;
    }

    // 检查文件大小（限制为 5MB）
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
      toast.success('图片上传成功');
    };
    reader.onerror = () => {
      toast.error('图片读取失败');
    };
    reader.readAsDataURL(file);
  };

  // 触发文件选择
  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  // 清空图片
  const handleClearImage = () => {
    setImagePreview('');
    setImageBase64('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 下载图片
  const handleDownloadImage = () => {
    if (!imageBase64) {
      toast.error('没有可下载的图片');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = imageBase64;
      link.download = `image_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('图片下载成功');
    } catch (error) {
      toast.error('图片下载失败');
      console.error('Download error:', error);
    }
  };

  // 从 Base64 加载图片
  const handleLoadFromBase64 = () => {
    try {
      if (!textInput.trim()) {
        toast.error('请输入 Base64 数据');
        return;
      }

      let base64Data = textInput.trim();
      
      // 如果不包含 data URL 前缀，添加默认的图片前缀
      if (!base64Data.startsWith('data:')) {
        base64Data = `data:image/png;base64,${base64Data}`;
      }

      // 验证是否为有效的图片 Base64
      const img = new Image();
      img.onload = () => {
        setImagePreview(base64Data);
        setImageBase64(base64Data);
        toast.success('图片加载成功');
      };
      img.onerror = () => {
        toast.error('无效的图片 Base64 数据');
      };
      img.src = base64Data;
    } catch (error) {
      toast.error('加载失败');
      console.error('Load error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileCode2 className="h-8 w-8" />
          Base64 编解码
        </h1>
        <p className="text-muted-foreground mt-2">
          Base64 编码解码工具，支持文本和图片
        </p>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="gap-2">
            <FileCode2 className="h-4 w-4" />
            文本编解码
          </TabsTrigger>
          <TabsTrigger value="image" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            图片处理
          </TabsTrigger>
        </TabsList>

        {/* 文本编解码 */}
        <TabsContent value="text" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                <Button onClick={handleClearText} variant="ghost" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  清空
                </Button>
                <Button onClick={handleTextExample} variant="ghost" className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  示例
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="liveConvert"
                  checked={liveConvert}
                  onChange={(e) => setLiveConvert(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="liveConvert" className="text-sm cursor-pointer">
                  实时转换
                </label>
              </div>
            </div>
          </Card>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
            {/* 左侧：编码 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">编码</h3>
                <Button onClick={handleEncode} size="sm" className="gap-2">
                  编码
                </Button>
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium mb-2 block">明文输入</label>
                <div className="text-sm text-muted-foreground mb-2">
                  {textInput.length} 字符
                </div>
              </div>
              <CodeEditor
                value={textInput}
                onChange={setTextInput}
                placeholder="请输入要编码的文本..."
                minHeight="400px"
                maxHeight="600px"
              />
            </Card>

            {/* 中间箭头（仅视觉指示） */}
            <div className="flex items-center justify-center lg:pt-[60px]">
              <div className="h-10 w-10 flex items-center justify-center text-muted-foreground">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
            </div>

            {/* 右侧：解码 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">解码</h3>
                <Button onClick={handleDecode} size="sm" variant="secondary" className="gap-2">
                  解码
                </Button>
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium mb-2 block">密文输出</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {textOutput.length} 字符
                  </span>
                  {textOutput && <CopyButton text={textOutput} />}
                </div>
              </div>
              <CodeEditor
                value={textOutput}
                onChange={setTextOutput}
                placeholder="处理结果将显示在这里..."
                readOnly
                minHeight="400px"
                maxHeight="600px"
              />
            </Card>
          </div>
        </TabsContent>

        {/* 图片处理 */}
        <TabsContent value="image" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSelectImage} className="gap-2">
                <Upload className="h-4 w-4" />
                选择图片
              </Button>
              <Button onClick={handleLoadFromBase64} variant="secondary" className="gap-2">
                从 Base64 加载
              </Button>
              <Button 
                onClick={handleDownloadImage} 
                variant="outline" 
                className="gap-2"
                disabled={!imageBase64}
              >
                <Download className="h-4 w-4" />
                下载图片
              </Button>
              <Button onClick={handleClearImage} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 图片预览 */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">图片预览</h3>
              <div className="border rounded-lg bg-muted/30 min-h-[400px] flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-[500px] object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground p-8">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>暂无图片</p>
                    <p className="text-sm mt-2">点击"选择图片"上传图片</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Base64 数据 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Base64 数据</h3>
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground">
                    {imageBase64.length} 字符
                  </span>
                  {imageBase64 && <CopyButton text={imageBase64} />}
                </div>
              </div>
              <CodeEditor
                value={imageBase64}
                onChange={setTextInput}
                placeholder="Base64 数据将显示在这里..."
                readOnly
                minHeight="400px"
                maxHeight="600px"
              />
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>文本编解码：</strong></p>
          <p>• <strong>编码</strong>: 在左侧输入明文，点击"编码"按钮转换为Base64</p>
          <p>• <strong>解码</strong>: 在右侧输入Base64，点击"解码"按钮还原为明文</p>
          <p>• <strong>实时转换</strong>: 勾选后，左侧输入框内容变化时自动编码</p>
          <p>• 支持中文和特殊字符</p>
          
          <p className="mt-4"><strong>图片处理：</strong></p>
          <p>• <strong>选择图片</strong>: 上传本地图片并转换为 Base64</p>
          <p>• <strong>从 Base64 加载</strong>: 将 Base64 数据转换为图片预览</p>
          <p>• <strong>下载图片</strong>: 将 Base64 数据保存为图片文件</p>
          <p>• 支持的图片格式: JPG, PNG, GIF, WebP 等</p>
          <p>• 图片大小限制: 5MB</p>
        </div>
      </Card>
    </div>
  );
}