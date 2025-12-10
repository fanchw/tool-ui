import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CodeEditor } from '@/components/common/CodeEditor';
import { CopyButton } from '@/components/common/CopyButton';
import { KeyGenerator } from '@/components/crypto/KeyGenerator';
import {
  Lock,
  Unlock,
  Hash,
  Key,
  RotateCcw,
  Wand2,
  Eye,
  EyeOff,
  ArrowLeftRight
} from 'lucide-react';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

export default function CryptoPage() {
  // AES 加密解密统一状态
  const [aesInput, setAesInput] = useState('');
  const [aesKey, setAesKey] = useState('');
  const [aesOutput, setAesOutput] = useState('');
  const [showAesKey, setShowAesKey] = useState(false);
  const [showAesKeyGenerator, setShowAesKeyGenerator] = useState(false);
  const [liveConvertAes, setLiveConvertAes] = useState(false);

  // 密钥生成器配置状态（在页面刷新前保持）
  const [keyGeneratorConfig, setKeyGeneratorConfig] = useState({
    keyLength: 128,
    keyFormat: 'hex' as 'hex' | 'base64',
  });

  // 哈希
  const [hashInput, setHashInput] = useState('');
  const [hashResults, setHashResults] = useState<Record<string, string>>({});

  // HMAC
  const [hmacInput, setHmacInput] = useState('');
  const [hmacKey, setHmacKey] = useState('');
  const [hmacResults, setHmacResults] = useState<Record<string, string>>({});
  const [showHmacKeyGenerator, setShowHmacKeyGenerator] = useState(false);

  // AES 实时转换效果 - 加密
  useEffect(() => {
    if (liveConvertAes && aesInput && aesKey) {
      try {
        const encrypted = CryptoJS.AES.encrypt(aesInput, aesKey).toString();
        setAesOutput(encrypted);
      } catch (error) {
        console.error('Auto encrypt error:', error);
      }
    }
  }, [aesInput, aesKey, liveConvertAes]);

  // AES 加密
  const handleAesEncrypt = () => {
    try {
      if (!aesInput.trim()) {
        toast.error('请输入要加密的内容');
        return;
      }
      if (!aesKey.trim()) {
        toast.error('请输入密钥');
        return;
      }

      const encrypted = CryptoJS.AES.encrypt(aesInput, aesKey).toString();
      setAesOutput(encrypted);
      toast.success('加密成功');
    } catch (error) {
      toast.error('加密失败');
      console.error('Encrypt error:', error);
    }
  };

  // AES 解密
  const handleAesDecrypt = () => {
    try {
      if (!aesOutput.trim()) {
        toast.error('请输入要解密的内容');
        return;
      }
      if (!aesKey.trim()) {
        toast.error('请输入密钥');
        return;
      }

      const decrypted = CryptoJS.AES.decrypt(aesOutput, aesKey);
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!plaintext) {
        toast.error('解密失败，请检查密钥是否正确');
        return;
      }

      setAesInput(plaintext);
      toast.success('解密成功');
    } catch (error) {
      toast.error('解密失败');
      console.error('Decrypt error:', error);
    }
  };

  // 处理AES密钥应用（用户点击"应用此密钥"按钮时）
  const handleAesKeyGenerated = (key: string) => {
    setAesKey(key);
  };

  // 处理HMAC密钥应用（用户点击"应用此密钥"按钮时）
  const handleHmacKeyGenerated = (key: string) => {
    setHmacKey(key);
  };

  // 清空AES
  const handleClearAes = () => {
    setAesInput('');
    setAesKey('');
    setAesOutput('');
  };

  // AES示例
  const handleAesExample = () => {
    setAesInput('Hello, 这是一个加密示例！');
    setAesKey('my-secret-key-123');
  };

  // 计算哈希
  const handleCalculateHash = () => {
    try {
      if (!hashInput.trim()) {
        toast.error('请输入要计算哈希的内容');
        return;
      }

      const results = {
        'MD5': CryptoJS.MD5(hashInput).toString(),
        'SHA-1': CryptoJS.SHA1(hashInput).toString(),
        'SHA-256': CryptoJS.SHA256(hashInput).toString(),
        'SHA-512': CryptoJS.SHA512(hashInput).toString(),
        'SHA3-256': CryptoJS.SHA3(hashInput, { outputLength: 256 }).toString(),
        'SHA3-512': CryptoJS.SHA3(hashInput, { outputLength: 512 }).toString(),
        'RIPEMD-160': CryptoJS.RIPEMD160(hashInput).toString(),
      };

      setHashResults(results);
      toast.success('哈希计算成功');
    } catch (error) {
      toast.error('哈希计算失败');
      console.error('Hash error:', error);
    }
  };

  // 清空哈希
  const handleClearHash = () => {
    setHashInput('');
    setHashResults({});
  };

  // 哈希示例
  const handleHashExample = () => {
    setHashInput('Hello, World!');
  };

  // 计算 HMAC
  const handleCalculateHmac = () => {
    try {
      if (!hmacInput.trim()) {
        toast.error('请输入要计算 HMAC 的内容');
        return;
      }
      if (!hmacKey.trim()) {
        toast.error('请输入密钥');
        return;
      }

      const results = {
        'HMAC-MD5': CryptoJS.HmacMD5(hmacInput, hmacKey).toString(),
        'HMAC-SHA1': CryptoJS.HmacSHA1(hmacInput, hmacKey).toString(),
        'HMAC-SHA256': CryptoJS.HmacSHA256(hmacInput, hmacKey).toString(),
        'HMAC-SHA512': CryptoJS.HmacSHA512(hmacInput, hmacKey).toString(),
      };

      setHmacResults(results);
      toast.success('HMAC 计算成功');
    } catch (error) {
      toast.error('HMAC 计算失败');
      console.error('HMAC error:', error);
    }
  };

  // 清空 HMAC
  const handleClearHmac = () => {
    setHmacInput('');
    setHmacKey('');
    setHmacResults({});
  };

  // HMAC 示例
  const handleHmacExample = () => {
    setHmacInput('Hello, World!');
    setHmacKey('my-secret-key');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lock className="h-8 w-8" />
          加密解密工具
        </h1>
        <p className="text-muted-foreground mt-2">
          支持 AES、DES、MD5、SHA 等多种加密算法
        </p>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="aes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="aes" className="gap-2">
            <Lock className="h-4 w-4" />
            AES 加密
          </TabsTrigger>
          <TabsTrigger value="hash" className="gap-2">
            <Hash className="h-4 w-4" />
            哈希计算
          </TabsTrigger>
          <TabsTrigger value="hmac" className="gap-2">
            <Key className="h-4 w-4" />
            HMAC
          </TabsTrigger>
        </TabsList>

        {/* AES 加密解密 */}
        <TabsContent value="aes" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAesKeyGenerator(!showAesKeyGenerator)}
                  variant="outline"
                  className="gap-2"
                >
                  <Key className="h-4 w-4" />
                  生成密钥
                </Button>
                <Button onClick={handleClearAes} variant="ghost" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  清空
                </Button>
                <Button onClick={handleAesExample} variant="ghost" className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  示例
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="liveConvertAes"
                  checked={liveConvertAes}
                  onChange={(e) => setLiveConvertAes(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="liveConvertAes" className="text-sm cursor-pointer">
                  实时转换
                </label>
              </div>
            </div>
          </Card>

          {/* AES密钥生成器 Dialog */}
          <Dialog open={showAesKeyGenerator} onOpenChange={setShowAesKeyGenerator}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>密钥生成器 - AES</DialogTitle>
                <DialogDescription>
                  生成安全的随机密钥用于AES加密解密
                </DialogDescription>
              </DialogHeader>
              <KeyGenerator
                onKeyGenerated={handleAesKeyGenerated}
                defaultKeyLength={keyGeneratorConfig.keyLength}
                defaultKeyFormat={keyGeneratorConfig.keyFormat}
                onConfigChange={setKeyGeneratorConfig}
              />
            </DialogContent>
          </Dialog>

          {/* 密钥输入 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">密钥</h3>
            <div className="flex gap-2">
              <Input
                value={aesKey}
                onChange={(e) => setAesKey(e.target.value)}
                placeholder="请输入密钥..."
                className="font-mono flex-1"
                type={showAesKey ? 'text' : 'password'}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAesKey(!showAesKey)}
                title={showAesKey ? '隐藏密钥' : '显示密钥'}
              >
                {showAesKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <CopyButton text={aesKey} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              提示：请妥善保管密钥，丢失后将无法解密
            </p>
          </Card>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
            {/* 左侧：加密 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">加密</h3>
                <Button onClick={handleAesEncrypt} size="sm" className="gap-2">
                  <Lock className="h-4 w-4" />
                  加密
                </Button>
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium mb-2 block">明文输入</label>
                <div className="text-sm text-muted-foreground mb-2">
                  {aesInput.length} 字符
                </div>
              </div>
              <CodeEditor
                value={aesInput}
                onChange={setAesInput}
                placeholder="请输入要加密的内容..."
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

            {/* 右侧：解密 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">解密</h3>
                <Button onClick={handleAesDecrypt} size="sm" variant="secondary" className="gap-2">
                  <Unlock className="h-4 w-4" />
                  解密
                </Button>
              </div>
              <div className="mb-3">
                <label className="text-sm font-medium mb-2 block">密文输出</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {aesOutput.length} 字符
                  </span>
                  {aesOutput && <CopyButton text={aesOutput} />}
                </div>
              </div>
              <CodeEditor
                value={aesOutput}
                onChange={setAesOutput}
                placeholder="处理结果将显示在这里..."
                readOnly
                minHeight="400px"
                maxHeight="600px"
              />
            </Card>
          </div>
        </TabsContent>

        {/* 哈希计算 */}
        <TabsContent value="hash" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCalculateHash} className="gap-2">
                <Hash className="h-4 w-4" />
                计算哈希
              </Button>
              <Button onClick={handleClearHash} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
              <Button onClick={handleHashExample} variant="ghost" className="gap-2">
                <Wand2 className="h-4 w-4" />
                示例
              </Button>
            </div>
          </Card>

          {/* 输入区 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">输入内容</h3>
            <CodeEditor
              value={hashInput}
              onChange={setHashInput}
              placeholder="请输入要计算哈希的内容..."
              minHeight="200px"
              maxHeight="400px"
            />
          </Card>

          {/* 哈希结果 */}
          {Object.keys(hashResults).length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">哈希结果</h3>
              <div className="space-y-3">
                {Object.entries(hashResults).map(([algorithm, hash]) => (
                  <div key={algorithm} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{algorithm}</div>
                      <CopyButton text={hash} />
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs break-all">
                      {hash}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* HMAC */}
        <TabsContent value="hmac" className="space-y-4">
          {/* 工具栏 */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCalculateHmac} className="gap-2">
                <Key className="h-4 w-4" />
                计算 HMAC
              </Button>
              <Button
                onClick={() => setShowHmacKeyGenerator(!showHmacKeyGenerator)}
                variant="outline"
                className="gap-2"
              >
                <Key className="h-4 w-4" />
                生成密钥
              </Button>
              <Button onClick={handleClearHmac} variant="ghost" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                清空
              </Button>
              <Button onClick={handleHmacExample} variant="ghost" className="gap-2">
                <Wand2 className="h-4 w-4" />
                示例
              </Button>
            </div>
          </Card>

          {/* HMAC密钥生成器 Dialog */}
          <Dialog open={showHmacKeyGenerator} onOpenChange={setShowHmacKeyGenerator}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>密钥生成器 - HMAC</DialogTitle>
                <DialogDescription>
                  生成安全的随机密钥用于HMAC计算
                </DialogDescription>
              </DialogHeader>
              <KeyGenerator
                onKeyGenerated={handleHmacKeyGenerated}
                defaultKeyLength={keyGeneratorConfig.keyLength}
                defaultKeyFormat={keyGeneratorConfig.keyFormat}
                onConfigChange={setKeyGeneratorConfig}
              />
            </DialogContent>
          </Dialog>

          {/* 密钥输入 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">密钥</h3>
            <div className="flex gap-2">
              <Input
                value={hmacKey}
                onChange={(e) => setHmacKey(e.target.value)}
                placeholder="请输入密钥..."
                className="font-mono flex-1"
              />
              <CopyButton text={hmacKey} />
            </div>
          </Card>

          {/* 输入区 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">输入内容</h3>
            <CodeEditor
              value={hmacInput}
              onChange={setHmacInput}
              placeholder="请输入要计算 HMAC 的内容..."
              minHeight="200px"
              maxHeight="400px"
            />
          </Card>

          {/* HMAC 结果 */}
          {Object.keys(hmacResults).length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">HMAC 结果</h3>
              <div className="space-y-3">
                {Object.entries(hmacResults).map(([algorithm, hmac]) => (
                  <div key={algorithm} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{algorithm}</div>
                      <CopyButton text={hmac} />
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg font-mono text-xs break-all">
                      {hmac}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>AES 加密：</strong></p>
          <p>• AES (Advanced Encryption Standard) 是一种对称加密算法</p>
          <p>• 加密和解密使用相同的密钥</p>
          <p>• 点击中间的箭头按钮可切换加密/解密方向</p>
          <p>• 勾选"实时转换"后，输入框内容变化时自动转换</p>
          <p>• 请妥善保管密钥，丢失后将无法解密</p>
          
          <p className="mt-4"><strong>哈希计算：</strong></p>
          <p>• 哈希是单向加密，无法解密</p>
          <p>• 常用于密码存储、文件校验等场景</p>
          <p>• 支持 MD5、SHA-1、SHA-256、SHA-512 等算法</p>
          
          <p className="mt-4"><strong>HMAC：</strong></p>
          <p>• HMAC (Hash-based Message Authentication Code)</p>
          <p>• 用于验证消息的完整性和真实性</p>
          <p>• 需要提供密钥进行计算</p>
          
          <p className="mt-4 text-amber-600 dark:text-amber-400">
            <strong>⚠️ 安全提示：</strong>
          </p>
          <p className="text-amber-600 dark:text-amber-400">
            • 所有加密操作都在本地浏览器中完成，不会上传到服务器
          </p>
          <p className="text-amber-600 dark:text-amber-400">
            • 请勿在生产环境中使用简单密钥
          </p>
          <p className="text-amber-600 dark:text-amber-400">
            • MD5 和 SHA-1 已不够安全，建议使用 SHA-256 或更高级别
          </p>
        </div>
      </Card>
    </div>
  );
}