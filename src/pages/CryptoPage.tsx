import { useState } from 'react';
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
  EyeOff
} from 'lucide-react';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

export default function CryptoPage() {
  // AES 加密
  const [encryptInput, setEncryptInput] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [encryptOutput, setEncryptOutput] = useState('');
  const [showEncryptKey, setShowEncryptKey] = useState(false);
  const [showEncryptKeyGenerator, setShowEncryptKeyGenerator] = useState(false);

  // AES 解密
  const [decryptInput, setDecryptInput] = useState('');
  const [decryptKey, setDecryptKey] = useState('');
  const [decryptOutput, setDecryptOutput] = useState('');
  const [showDecryptKey, setShowDecryptKey] = useState(false);
  const [showDecryptKeyGenerator, setShowDecryptKeyGenerator] = useState(false);

  // 当前 AES tab
  const [aesTab, setAesTab] = useState<'encrypt' | 'decrypt'>('encrypt');

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

  // AES 加密
  const handleAesEncrypt = () => {
    try {
      if (!encryptInput.trim()) {
        toast.error('请输入要加密的内容');
        return;
      }
      if (!encryptKey.trim()) {
        toast.error('请输入密钥');
        return;
      }

      const encrypted = CryptoJS.AES.encrypt(encryptInput, encryptKey).toString();
      setEncryptOutput(encrypted);
      toast.success('加密成功');
    } catch (error) {
      toast.error('加密失败');
      console.error('Encrypt error:', error);
    }
  };

  // AES 解密
  const handleAesDecrypt = () => {
    try {
      if (!decryptInput.trim()) {
        toast.error('请输入要解密的内容');
        return;
      }
      if (!decryptKey.trim()) {
        toast.error('请输入密钥');
        return;
      }

      const decrypted = CryptoJS.AES.decrypt(decryptInput, decryptKey);
      const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!plaintext) {
        toast.error('解密失败，请检查密钥是否正确');
        return;
      }

      setDecryptOutput(plaintext);
      toast.success('解密成功');
    } catch (error) {
      toast.error('解密失败');
      console.error('Decrypt error:', error);
    }
  };

  // 处理加密密钥应用（用户点击"应用此密钥"按钮时）
  const handleEncryptKeyGenerated = (key: string) => {
    setEncryptKey(key);
  };

  // 处理解密密钥应用（用户点击"应用此密钥"按钮时）
  const handleDecryptKeyGenerated = (key: string) => {
    setDecryptKey(key);
  };

  // 清空加密
  const handleClearEncrypt = () => {
    setEncryptInput('');
    setEncryptKey('');
    setEncryptOutput('');
  };

  // 清空解密
  const handleClearDecrypt = () => {
    setDecryptInput('');
    setDecryptKey('');
    setDecryptOutput('');
  };

  // 加密示例
  const handleEncryptExample = () => {
    setEncryptInput('Hello, 这是一个加密示例！');
    setEncryptKey('my-secret-key-123');
  };

  // 解密示例
  const handleDecryptExample = () => {
    setDecryptInput('U2FsdGVkX1+8xjnBHQyZpKMZqKqZqKqZqKqZ');
    setDecryptKey('my-secret-key-123');
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
          {/* 加密/解密切换 */}
          <Tabs value={aesTab} onValueChange={(v) => setAesTab(v as 'encrypt' | 'decrypt')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt" className="gap-2">
                <Lock className="h-4 w-4" />
                加密
              </TabsTrigger>
              <TabsTrigger value="decrypt" className="gap-2">
                <Unlock className="h-4 w-4" />
                解密
              </TabsTrigger>
            </TabsList>

            {/* 加密 Tab */}
            <TabsContent value="encrypt" className="space-y-4 mt-4">
              {/* 工具栏 */}
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleAesEncrypt} className="gap-2">
                    <Lock className="h-4 w-4" />
                    加密
                  </Button>
                  <Button
                    onClick={() => setShowEncryptKeyGenerator(!showEncryptKeyGenerator)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Key className="h-4 w-4" />
                    生成密钥
                  </Button>
                  <Button onClick={handleClearEncrypt} variant="ghost" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    清空
                  </Button>
                  <Button onClick={handleEncryptExample} variant="ghost" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    示例
                  </Button>
                </div>
              </Card>

              {/* 加密密钥生成器 Dialog */}
              <Dialog open={showEncryptKeyGenerator} onOpenChange={setShowEncryptKeyGenerator}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>密钥生成器 - 加密</DialogTitle>
                    <DialogDescription>
                      生成安全的随机密钥用于AES加密
                    </DialogDescription>
                  </DialogHeader>
                  <KeyGenerator
                    onKeyGenerated={handleEncryptKeyGenerated}
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
                    value={encryptKey}
                    onChange={(e) => setEncryptKey(e.target.value)}
                    placeholder="请输入密钥..."
                    className="font-mono flex-1"
                    type={showEncryptKey ? 'text' : 'password'}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEncryptKey(!showEncryptKey)}
                    title={showEncryptKey ? '隐藏密钥' : '显示密钥'}
                  >
                    {showEncryptKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <CopyButton text={encryptKey} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  提示：请妥善保管密钥，丢失后将无法解密
                </p>
              </Card>

              {/* 输入输出区域 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 输入区 */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">明文输入</h3>
                    <span className="text-sm text-muted-foreground">
                      {encryptInput.length} 字符
                    </span>
                  </div>
                  <CodeEditor
                    value={encryptInput}
                    onChange={setEncryptInput}
                    placeholder="请输入要加密的内容..."
                    minHeight="400px"
                    maxHeight="600px"
                  />
                </Card>

                {/* 输出区 */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">密文输出</h3>
                    <div className="flex gap-2">
                      <span className="text-sm text-muted-foreground">
                        {encryptOutput.length} 字符
                      </span>
                      {encryptOutput && <CopyButton text={encryptOutput} />}
                    </div>
                  </div>
                  <CodeEditor
                    value={encryptOutput}
                    onChange={setEncryptOutput}
                    placeholder="加密结果将显示在这里..."
                    readOnly
                    minHeight="400px"
                    maxHeight="600px"
                  />
                </Card>
              </div>
            </TabsContent>

            {/* 解密 Tab */}
            <TabsContent value="decrypt" className="space-y-4 mt-4">
              {/* 工具栏 */}
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleAesDecrypt} className="gap-2">
                    <Unlock className="h-4 w-4" />
                    解密
                  </Button>
                  <Button
                    onClick={() => setShowDecryptKeyGenerator(!showDecryptKeyGenerator)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Key className="h-4 w-4" />
                    生成密钥
                  </Button>
                  <Button onClick={handleClearDecrypt} variant="ghost" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    清空
                  </Button>
                  <Button onClick={handleDecryptExample} variant="ghost" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    示例
                  </Button>
                </div>
              </Card>

              {/* 解密密钥生成器 Dialog */}
              <Dialog open={showDecryptKeyGenerator} onOpenChange={setShowDecryptKeyGenerator}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>密钥生成器 - 解密</DialogTitle>
                    <DialogDescription>
                      生成安全的随机密钥用于AES解密
                    </DialogDescription>
                  </DialogHeader>
                  <KeyGenerator
                    onKeyGenerated={handleDecryptKeyGenerated}
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
                    value={decryptKey}
                    onChange={(e) => setDecryptKey(e.target.value)}
                    placeholder="请输入密钥..."
                    className="font-mono flex-1"
                    type={showDecryptKey ? 'text' : 'password'}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDecryptKey(!showDecryptKey)}
                    title={showDecryptKey ? '隐藏密钥' : '显示密钥'}
                  >
                    {showDecryptKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <CopyButton text={decryptKey} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  提示：请使用加密时的密钥进行解密
                </p>
              </Card>

              {/* 输入输出区域 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 输入区 */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">密文输入</h3>
                    <span className="text-sm text-muted-foreground">
                      {decryptInput.length} 字符
                    </span>
                  </div>
                  <CodeEditor
                    value={decryptInput}
                    onChange={setDecryptInput}
                    placeholder="请输入要解密的密文..."
                    minHeight="400px"
                    maxHeight="600px"
                  />
                </Card>

                {/* 输出区 */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">明文输出</h3>
                    <div className="flex gap-2">
                      <span className="text-sm text-muted-foreground">
                        {decryptOutput.length} 字符
                      </span>
                      {decryptOutput && <CopyButton text={decryptOutput} />}
                    </div>
                  </div>
                  <CodeEditor
                    value={decryptOutput}
                    onChange={setDecryptOutput}
                    placeholder="解密结果将显示在这里..."
                    readOnly
                    minHeight="400px"
                    maxHeight="600px"
                  />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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

          {/* 密钥输入 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">密钥</h3>
            <Input
              value={hmacKey}
              onChange={(e) => setHmacKey(e.target.value)}
              placeholder="请输入密钥..."
              className="font-mono"
            />
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