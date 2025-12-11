import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/common/CopyButton';
import { CodeEditor } from '@/components/common/CodeEditor';
import {
  Key,
  Download,
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react';
import JSEncrypt from 'jsencrypt';
import toast from 'react-hot-toast';

interface RsaKeyManagerProps {
  onPublicKeyChange?: (key: string) => void;
  onPrivateKeyChange?: (key: string) => void;
}

export function RsaKeyManager({ onPublicKeyChange, onPrivateKeyChange }: RsaKeyManagerProps) {
  const [keySize, setKeySize] = useState<number>(2048);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const publicKeyFileRef = useRef<HTMLInputElement>(null);
  const privateKeyFileRef = useRef<HTMLInputElement>(null);

  // 生成RSA密钥对
  const handleGenerateKeys = () => {
    try {
      setIsGenerating(true);
      const crypt = new JSEncrypt({ default_key_size: keySize.toString() });
      
      // 生成密钥对
      const publicKeyGenerated = crypt.getPublicKey();
      const privateKeyGenerated = crypt.getPrivateKey();

      setPublicKey(publicKeyGenerated);
      setPrivateKey(privateKeyGenerated);

      // 通知父组件
      onPublicKeyChange?.(publicKeyGenerated);
      onPrivateKeyChange?.(privateKeyGenerated);

      toast.success(`成功生成 ${keySize} 位 RSA 密钥对`);
    } catch (error) {
      toast.error('密钥生成失败');
      console.error('Key generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 导出公钥到文件
  const handleExportPublicKey = () => {
    if (!publicKey) {
      toast.error('请先生成密钥对');
      return;
    }

    try {
      const blob = new Blob([publicKey], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rsa_public_key_${keySize}.pem`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('公钥已导出');
    } catch (error) {
      toast.error('导出失败');
      console.error('Export error:', error);
    }
  };

  // 导出私钥到文件
  const handleExportPrivateKey = () => {
    if (!privateKey) {
      toast.error('请先生成密钥对');
      return;
    }

    try {
      const blob = new Blob([privateKey], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rsa_private_key_${keySize}.pem`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('私钥已导出');
    } catch (error) {
      toast.error('导出失败');
      console.error('Export error:', error);
    }
  };

  // 从文件导入公钥
  const handleImportPublicKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setPublicKey(content);
      onPublicKeyChange?.(content);
      toast.success('公钥已导入');
    };
    reader.onerror = () => {
      toast.error('文件读取失败');
    };
    reader.readAsText(file);

    // 重置input，允许重复选择同一文件
    event.target.value = '';
  };

  // 从文件导入私钥
  const handleImportPrivateKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setPrivateKey(content);
      onPrivateKeyChange?.(content);
      toast.success('私钥已导入');
    };
    reader.onerror = () => {
      toast.error('文件读取失败');
    };
    reader.readAsText(file);

    // 重置input，允许重复选择同一文件
    event.target.value = '';
  };

  // 从文本导入公钥
  const handlePublicKeyTextChange = (value: string) => {
    setPublicKey(value);
    onPublicKeyChange?.(value);
  };

  // 从文本导入私钥
  const handlePrivateKeyTextChange = (value: string) => {
    setPrivateKey(value);
    onPrivateKeyChange?.(value);
  };

  return (
    <div className="space-y-4">
      {/* 密钥生成配置 */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">密钥生成</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-medium mb-2 block">密钥长度（位）</label>
            <select
              value={keySize}
              onChange={(e) => setKeySize(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value={1024}>1024 位（不推荐）</option>
              <option value={2048}>2048 位（推荐）</option>
              <option value={3072}>3072 位</option>
              <option value={4096}>4096 位（高安全）</option>
            </select>
          </div>
          <Button
            onClick={handleGenerateKeys}
            disabled={isGenerating}
            className="gap-2"
          >
            <Key className="h-4 w-4" />
            {isGenerating ? '生成中...' : '生成密钥对'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          提示：密钥长度越长，安全性越高，但加密解密速度会变慢
        </p>
      </Card>

      {/* 公钥管理 */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">公钥（Public Key）</h3>
          <div className="flex gap-2">
            <input
              ref={publicKeyFileRef}
              type="file"
              accept=".pem,.txt,.pub"
              onChange={handleImportPublicKey}
              className="hidden"
            />
            <Button
              onClick={() => publicKeyFileRef.current?.click()}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              导入
            </Button>
            <Button
              onClick={handleExportPublicKey}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!publicKey}
            >
              <Download className="h-4 w-4" />
              导出
            </Button>
            {publicKey && <CopyButton text={publicKey} />}
          </div>
        </div>
        <CodeEditor
          value={publicKey}
          onChange={handlePublicKeyTextChange}
          placeholder="在此粘贴公钥或点击导入按钮从文件加载..."
          minHeight="150px"
          maxHeight="300px"
        />
      </Card>

      {/* 私钥管理 */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">私钥（Private Key）</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              title={showPrivateKey ? '隐藏私钥' : '显示私钥'}
            >
              {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <input
              ref={privateKeyFileRef}
              type="file"
              accept=".pem,.txt,.key"
              onChange={handleImportPrivateKey}
              className="hidden"
            />
            <Button
              onClick={() => privateKeyFileRef.current?.click()}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              导入
            </Button>
            <Button
              onClick={handleExportPrivateKey}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!privateKey}
            >
              <Download className="h-4 w-4" />
              导出
            </Button>
            {privateKey && <CopyButton text={privateKey} />}
          </div>
        </div>
        {showPrivateKey ? (
          <CodeEditor
            value={privateKey}
            onChange={handlePrivateKeyTextChange}
            placeholder="在此粘贴私钥或点击导入按钮从文件加载..."
            minHeight="150px"
            maxHeight="300px"
          />
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg text-center text-muted-foreground">
            <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">私钥已隐藏，点击眼睛图标显示</p>
          </div>
        )}
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
          ⚠️ 警告：私钥非常重要，请妥善保管，不要泄露给他人
        </p>
      </Card>
    </div>
  );
}