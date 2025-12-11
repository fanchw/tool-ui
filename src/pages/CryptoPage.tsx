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
import { MonacoEditor } from '@/components/common/MonacoEditor';
import { CopyButton } from '@/components/common/CopyButton';
import { KeyGenerator } from '@/components/crypto/KeyGenerator';
import { RsaKeyManager } from '@/components/crypto/RsaKeyManager';
import {
  Lock,
  Unlock,
  Hash,
  Key,
  RotateCcw,
  Wand2,
  Eye,
  EyeOff,
  ArrowLeftRight,
  Shield
} from 'lucide-react';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
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

  // RSA
  const [rsaPublicKey, setRsaPublicKey] = useState('');
  const [rsaPrivateKey, setRsaPrivateKey] = useState('');
  const [rsaPlaintext, setRsaPlaintext] = useState('');
  const [rsaCiphertext, setRsaCiphertext] = useState('');
  const [showRsaKeyManager, setShowRsaKeyManager] = useState(false);

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

  // RSA 加密
  const handleRsaEncrypt = () => {
    try {
      if (!rsaPlaintext.trim()) {
        toast.error('请输入要加密的内容');
        return;
      }
      if (!rsaPublicKey.trim()) {
        toast.error('请先生成或导入公钥');
        return;
      }

      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(rsaPublicKey);
      const encrypted = encrypt.encrypt(rsaPlaintext);

      if (!encrypted) {
        toast.error('加密失败，请检查公钥是否正确');
        return;
      }

      setRsaCiphertext(encrypted);
      toast.success('加密成功');
    } catch (error) {
      toast.error('加密失败');
      console.error('RSA encrypt error:', error);
    }
  };

  // RSA 解密
  const handleRsaDecrypt = () => {
    try {
      if (!rsaCiphertext.trim()) {
        toast.error('请输入要解密的内容');
        return;
      }
      if (!rsaPrivateKey.trim()) {
        toast.error('请先生成或导入私钥');
        return;
      }

      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(rsaPrivateKey);
      const decrypted = decrypt.decrypt(rsaCiphertext);

      if (!decrypted) {
        toast.error('解密失败，请检查私钥是否正确');
        return;
      }

      setRsaPlaintext(decrypted);
      toast.success('解密成功');
    } catch (error) {
      toast.error('解密失败');
      console.error('RSA decrypt error:', error);
    }
  };

  // 清空 RSA
  const handleClearRsa = () => {
    setRsaPlaintext('');
    setRsaCiphertext('');
  };

  // RSA 示例
  const handleRsaExample = () => {
    setRsaPlaintext('Hello, 这是一个RSA加密示例！');
  };

  return (
    <div className="space-y-4">
      {/* 页面标题 - 紧凑版 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Lock className="h-6 w-6" />
            加密解密工具
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            支持 AES、RSA、MD5、SHA 等多种加密算法
          </p>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="aes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="aes" className="gap-2">
            <Lock className="h-4 w-4" />
            AES 加密
          </TabsTrigger>
          <TabsTrigger value="rsa" className="gap-2">
            <Shield className="h-4 w-4" />
            RSA 加密
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
        <TabsContent value="aes" className="space-y-3">
          {/* 工具栏 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAesKeyGenerator(!showAesKeyGenerator)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                >
                  <Key className="h-3.5 w-3.5" />
                  生成密钥
                </Button>
                <Button onClick={handleClearAes} variant="ghost" size="sm" className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" />
                  清空
                </Button>
                <Button onClick={handleAesExample} variant="ghost" size="sm" className="gap-1.5">
                  <Wand2 className="h-3.5 w-3.5" />
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

          {/* 密钥输入 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm">密钥</h3>
              <span className="text-xs text-muted-foreground">请妥善保管密钥</span>
            </div>
            <div className="flex gap-2">
              <Input
                value={aesKey}
                onChange={(e) => setAesKey(e.target.value)}
                placeholder="请输入密钥..."
                className="font-mono flex-1 h-9"
                type={showAesKey ? 'text' : 'password'}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAesKey(!showAesKey)}
                title={showAesKey ? '隐藏密钥' : '显示密钥'}
                className="h-9 w-9 p-0"
              >
                {showAesKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <CopyButton text={aesKey} />
            </div>
          </Card>

          {/* 输入输出区域 - 优化空间 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-start">
            {/* 左侧：加密 */}
            <Card className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">明文输入</h3>
                  <span className="text-xs text-muted-foreground">{aesInput.length} 字符</span>
                </div>
                <Button onClick={handleAesEncrypt} size="sm" className="gap-1.5 h-8">
                  <Lock className="h-3.5 w-3.5" />
                  加密
                </Button>
              </div>
              <MonacoEditor
                value={aesInput}
                onChange={setAesInput}
                placeholder="请输入要加密的内容..."
                minHeight="500px"
                maxHeight="70vh"
              />
            </Card>

            {/* 中间箭头（仅视觉指示） */}
            <div className="flex items-center justify-center lg:pt-[40px]">
              <div className="h-8 w-8 flex items-center justify-center text-muted-foreground">
                <ArrowLeftRight className="h-4 w-4" />
              </div>
            </div>

            {/* 右侧：解密 */}
            <Card className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">密文输出</h3>
                  <span className="text-xs text-muted-foreground">{aesOutput.length} 字符</span>
                </div>
                <div className="flex items-center gap-1">
                  {aesOutput && <CopyButton text={aesOutput} />}
                  <Button onClick={handleAesDecrypt} size="sm" variant="secondary" className="gap-1.5 h-8">
                    <Unlock className="h-3.5 w-3.5" />
                    解密
                  </Button>
                </div>
              </div>
              <MonacoEditor
                value={aesOutput}
                onChange={setAesOutput}
                placeholder="处理结果将显示在这里..."
                minHeight="500px"
                maxHeight="70vh"
              />
            </Card>
          </div>
        </TabsContent>

        {/* RSA 加密解密 */}
        <TabsContent value="rsa" className="space-y-3">
          {/* 工具栏 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setShowRsaKeyManager(!showRsaKeyManager)}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Key className="h-3.5 w-3.5" />
                密钥管理
              </Button>
              <Button onClick={handleClearRsa} variant="ghost" size="sm" className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                清空
              </Button>
              <Button onClick={handleRsaExample} variant="ghost" size="sm" className="gap-1.5">
                <Wand2 className="h-3.5 w-3.5" />
                示例
              </Button>
            </div>
          </Card>

          {/* RSA密钥管理器 Dialog */}
          <Dialog open={showRsaKeyManager} onOpenChange={setShowRsaKeyManager}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>RSA 密钥管理</DialogTitle>
                <DialogDescription>
                  生成、导入或导出 RSA 公钥和私钥
                </DialogDescription>
              </DialogHeader>
              <RsaKeyManager
                onPublicKeyChange={setRsaPublicKey}
                onPrivateKeyChange={setRsaPrivateKey}
              />
            </DialogContent>
          </Dialog>

          {/* 密钥状态提示 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm items-center">
                <span className="text-sm font-semibold">密钥状态:</span>
                <span className={rsaPublicKey ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                  公钥: {rsaPublicKey ? '✓ 已加载' : '✗ 未加载'}
                </span>
                <span className={rsaPrivateKey ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}>
                  私钥: {rsaPrivateKey ? '✓ 已加载' : '✗ 未加载'}
                </span>
              </div>
              <Button
                onClick={() => setShowRsaKeyManager(true)}
                variant="outline"
                size="sm"
                className="gap-1.5 h-8"
              >
                <Key className="h-3.5 w-3.5" />
                管理密钥
              </Button>
            </div>
          </Card>

          {/* 输入输出区域 - 优化空间 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-start">
            {/* 左侧：加密 */}
            <Card className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">明文输入</h3>
                  <span className="text-xs text-muted-foreground">{rsaPlaintext.length} 字符</span>
                </div>
                <Button
                  onClick={handleRsaEncrypt}
                  size="sm"
                  className="gap-1.5 h-8"
                  disabled={!rsaPublicKey}
                >
                  <Lock className="h-3.5 w-3.5" />
                  加密
                </Button>
              </div>
              <MonacoEditor
                value={rsaPlaintext}
                onChange={setRsaPlaintext}
                placeholder="请输入要加密的内容..."
                minHeight="500px"
                maxHeight="70vh"
              />
              {!rsaPublicKey && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  ⚠️ 请先在密钥管理中生成或导入公钥
                </p>
              )}
            </Card>

            {/* 中间箭头 */}
            <div className="flex items-center justify-center lg:pt-[40px]">
              <div className="h-8 w-8 flex items-center justify-center text-muted-foreground">
                <ArrowLeftRight className="h-4 w-4" />
              </div>
            </div>

            {/* 右侧：解密 */}
            <Card className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">密文输出</h3>
                  <span className="text-xs text-muted-foreground">{rsaCiphertext.length} 字符</span>
                </div>
                <div className="flex items-center gap-1">
                  {rsaCiphertext && <CopyButton text={rsaCiphertext} />}
                  <Button
                    onClick={handleRsaDecrypt}
                    size="sm"
                    variant="secondary"
                    className="gap-1.5 h-8"
                    disabled={!rsaPrivateKey}
                  >
                    <Unlock className="h-3.5 w-3.5" />
                    解密
                  </Button>
                </div>
              </div>
              <MonacoEditor
                value={rsaCiphertext}
                onChange={setRsaCiphertext}
                placeholder="处理结果将显示在这里..."
                minHeight="500px"
                maxHeight="70vh"
              />
              {!rsaPrivateKey && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  ⚠️ 请先在密钥管理中生成或导入私钥
                </p>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* 哈希计算 */}
        <TabsContent value="hash" className="space-y-3">
          {/* 工具栏 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCalculateHash} size="sm" className="gap-1.5">
                <Hash className="h-3.5 w-3.5" />
                计算哈希
              </Button>
              <Button onClick={handleClearHash} variant="ghost" size="sm" className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                清空
              </Button>
              <Button onClick={handleHashExample} variant="ghost" size="sm" className="gap-1.5">
                <Wand2 className="h-3.5 w-3.5" />
                示例
              </Button>
            </div>
          </Card>

          {/* 输入区 - 更大空间 */}
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm">输入内容</h3>
              <span className="text-xs text-muted-foreground">{hashInput.length} 字符</span>
            </div>
            <MonacoEditor
              value={hashInput}
              onChange={setHashInput}
              placeholder="请输入要计算哈希的内容..."
              minHeight="400px"
              maxHeight="60vh"
            />
          </Card>

          {/* 哈希结果 - 紧凑版 */}
          {Object.keys(hashResults).length > 0 && (
            <Card className="p-3">
              <h3 className="font-semibold text-sm mb-3">哈希结果</h3>
              <div className="space-y-2">
                {Object.entries(hashResults).map(([algorithm, hash]) => (
                  <div key={algorithm} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{algorithm}</div>
                      <CopyButton text={hash} />
                    </div>
                    <div className="p-2.5 bg-muted/30 rounded-lg font-mono text-xs break-all">
                      {hash}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* HMAC */}
        <TabsContent value="hmac" className="space-y-3">
          {/* 工具栏 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCalculateHmac} size="sm" className="gap-1.5">
                <Key className="h-3.5 w-3.5" />
                计算 HMAC
              </Button>
              <Button
                onClick={() => setShowHmacKeyGenerator(!showHmacKeyGenerator)}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Key className="h-3.5 w-3.5" />
                生成密钥
              </Button>
              <Button onClick={handleClearHmac} variant="ghost" size="sm" className="gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                清空
              </Button>
              <Button onClick={handleHmacExample} variant="ghost" size="sm" className="gap-1.5">
                <Wand2 className="h-3.5 w-3.5" />
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

          {/* 密钥输入 - 紧凑版 */}
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm">密钥</h3>
            </div>
            <div className="flex gap-2">
              <Input
                value={hmacKey}
                onChange={(e) => setHmacKey(e.target.value)}
                placeholder="请输入密钥..."
                className="font-mono flex-1 h-9"
              />
              <CopyButton text={hmacKey} />
            </div>
          </Card>

          {/* 输入区 - 更大空间 */}
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-sm">输入内容</h3>
              <span className="text-xs text-muted-foreground">{hmacInput.length} 字符</span>
            </div>
            <MonacoEditor
              value={hmacInput}
              onChange={setHmacInput}
              placeholder="请输入要计算 HMAC 的内容..."
              minHeight="400px"
              maxHeight="60vh"
            />
          </Card>

          {/* HMAC 结果 - 紧凑版 */}
          {Object.keys(hmacResults).length > 0 && (
            <Card className="p-3">
              <h3 className="font-semibold text-sm mb-3">HMAC 结果</h3>
              <div className="space-y-2">
                {Object.entries(hmacResults).map(([algorithm, hmac]) => (
                  <div key={algorithm} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{algorithm}</div>
                      <CopyButton text={hmac} />
                    </div>
                    <div className="p-2.5 bg-muted/30 rounded-lg font-mono text-xs break-all">
                      {hmac}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* 使用说明 - 可折叠或更紧凑 */}
      <details className="group">
        <summary className="cursor-pointer list-none">
          <Card className="p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">使用说明</h3>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </div>
          </Card>
        </summary>
        <Card className="p-4 mt-2">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">AES 加密</p>
              <p>• 对称加密算法，加解密使用相同密钥</p>
              <p>• 支持实时转换功能</p>
              <p>• 请妥善保管密钥</p>
            </div>
            
            <div>
              <p className="font-semibold text-foreground mb-2">RSA 加密</p>
              <p>• 非对称加密，公钥加密、私钥解密</p>
              <p>• 推荐 2048 位或更高密钥长度</p>
              <p>• 适合加密少量数据</p>
            </div>
            
            <div>
              <p className="font-semibold text-foreground mb-2">哈希计算</p>
              <p>• 单向加密，无法解密</p>
              <p>• 用于密码存储、文件校验</p>
              <p>• 建议使用 SHA-256 或更高级别</p>
            </div>
            
            <div>
              <p className="font-semibold text-foreground mb-2">HMAC</p>
              <p>• 基于哈希的消息认证码</p>
              <p>• 验证消息完整性和真实性</p>
              <p>• 需要密钥进行计算</p>
            </div>
            
            <div className="md:col-span-2 text-amber-600 dark:text-amber-400">
              <p className="font-semibold mb-2">⚠️ 安全提示</p>
              <p>• 所有加密操作在本地浏览器完成，不会上传服务器</p>
              <p>• 请勿在生产环境使用简单密钥或低位数 RSA 密钥</p>
              <p>• RSA 私钥务必妥善保管，不要泄露</p>
            </div>
          </div>
        </Card>
      </details>
    </div>
  );
}