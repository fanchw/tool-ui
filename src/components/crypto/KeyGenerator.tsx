import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/common/CopyButton';
import { Key, RefreshCw, Info, Eye, EyeOff } from 'lucide-react';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

interface KeyGeneratorProps {
  onKeyGenerated?: (key: string) => void;
  defaultKeyLength?: number;
}

export function KeyGenerator({ onKeyGenerated, defaultKeyLength = 128 }: KeyGeneratorProps) {
  const [generatedKey, setGeneratedKey] = useState('');
  const [keyLength, setKeyLength] = useState(defaultKeyLength);
  const [showKey, setShowKey] = useState(false);
  const [keyFormat, setKeyFormat] = useState<'hex' | 'base64'>('hex');

  // 密钥长度选项（bit）
  const keyLengthOptions = [
    { bits: 64, label: '64-bit', desc: '8字节 - 弱' },
    { bits: 128, label: '128-bit', desc: '16字节 - 标准' },
    { bits: 192, label: '192-bit', desc: '24字节 - 强' },
    { bits: 256, label: '256-bit', desc: '32字节 - 很强' },
    { bits: 512, label: '512-bit', desc: '64字节 - 极强' },
    { bits: 1024, label: '1024-bit', desc: '128字节' },
    { bits: 2048, label: '2048-bit', desc: '256字节' },
    { bits: 4096, label: '4096-bit', desc: '512字节' },
  ];

  // 生成密钥
  const handleGenerateKey = () => {
    try {
      const bytes = keyLength / 8;
      const wordArray = CryptoJS.lib.WordArray.random(bytes);
      
      let key: string;
      if (keyFormat === 'hex') {
        key = wordArray.toString(CryptoJS.enc.Hex);
      } else {
        key = wordArray.toString(CryptoJS.enc.Base64);
      }
      
      setGeneratedKey(key);
      setShowKey(true);
      
      // 自动复制到剪贴板
      navigator.clipboard.writeText(key).then(() => {
        toast.success(`已生成 ${keyLength}-bit ${keyFormat.toUpperCase()} 格式密钥并复制到剪贴板`);
      }).catch(() => {
        toast.success(`已生成 ${keyLength}-bit ${keyFormat.toUpperCase()} 格式密钥`);
      });
      
      // 不自动调用回调，让用户手动点击"应用此密钥"按钮
    } catch (error) {
      toast.error('密钥生成失败');
      console.error('Key generation error:', error);
    }
  };

  // 复制密钥
  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      toast.success('密钥已复制到剪贴板');
    }
  };

  // 应用密钥
  const handleApplyKey = () => {
    if (generatedKey && onKeyGenerated) {
      onKeyGenerated(generatedKey);
      toast.success('密钥已应用');
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Key className="h-5 w-5" />
        <h3 className="text-lg font-semibold">密钥生成器</h3>
      </div>

      {/* 密钥长度选择 */}
      <div className="space-y-3">
        <label className="text-sm font-medium">选择密钥长度</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {keyLengthOptions.map((option) => (
            <Button
              key={option.bits}
              onClick={() => setKeyLength(option.bits)}
              variant={keyLength === option.bits ? 'default' : 'outline'}
              size="sm"
              className="flex flex-col h-auto py-2 px-3"
            >
              <span className="font-mono font-semibold">{option.label}</span>
              <span className="text-xs opacity-70">{option.desc}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 密钥格式选择 */}
      <div className="space-y-3">
        <label className="text-sm font-medium">输出格式</label>
        <div className="flex gap-2">
          <Button
            onClick={() => setKeyFormat('hex')}
            variant={keyFormat === 'hex' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
          >
            HEX (十六进制)
          </Button>
          <Button
            onClick={() => setKeyFormat('base64')}
            variant={keyFormat === 'base64' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
          >
            Base64
          </Button>
        </div>
      </div>

      {/* 生成按钮 */}
      <Button onClick={handleGenerateKey} className="w-full gap-2" size="lg">
        <RefreshCw className="h-4 w-4" />
        生成密钥
      </Button>

      {/* 生成的密钥 */}
      {generatedKey && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">生成的密钥</label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowKey(!showKey)}
                title={showKey ? '隐藏密钥' : '显示密钥'}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <CopyButton text={generatedKey} />
            </div>
          </div>
          
          <div className="relative">
            <Input
              value={generatedKey}
              readOnly
              type={showKey ? 'text' : 'password'}
              className="font-mono text-sm pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {generatedKey.length} 字符
            </div>
          </div>

          {onKeyGenerated && (
            <Button onClick={handleApplyKey} variant="secondary" className="w-full gap-2">
              <Key className="h-4 w-4" />
              应用此密钥
            </Button>
          )}
        </div>
      )}

      {/* 使用说明 */}
      <div className="p-4 bg-muted/30 rounded-lg space-y-2">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>密钥长度说明：</strong></p>
            <p>• 128-bit: AES标准密钥长度，适合大多数场景</p>
            <p>• 256-bit: 更高安全性，推荐用于敏感数据</p>
            <p>• 512-bit及以上: 超高安全性，适合极端安全需求</p>
            <p className="mt-2"><strong>格式说明：</strong></p>
            <p>• HEX: 十六进制格式，仅包含0-9和a-f字符</p>
            <p>• Base64: Base64编码格式，更短但包含特殊字符</p>
            <p className="mt-2 text-amber-600 dark:text-amber-400">
              <strong>⚠️ 安全提示：</strong>请妥善保管生成的密钥，丢失后将无法解密数据
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}