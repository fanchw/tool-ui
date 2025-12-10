import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CopyButton } from '@/components/common/CopyButton';
import { 
  Palette, 
  RotateCcw,
  Wand2,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

export default function ColorPage() {
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbInput, setRgbInput] = useState('59, 130, 246');
  const [hslInput, setHslInput] = useState('217, 91%, 60%');
  const [currentColor, setCurrentColor] = useState('#3b82f6');

  // HEX 转 RGB
  const hexToRgb = (hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // RGB 转 HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // RGB 转 HSL
  const rgbToHsl = (r: number, g: number, b: number): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // HSL 转 RGB
  const hslToRgb = (h: number, s: number, l: number): RGB => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // 从 HEX 更新所有格式
  const updateFromHex = (hex: string) => {
    try {
      // 验证 HEX 格式
      if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error('无效的 HEX 格式');
      }

      const normalizedHex = hex.startsWith('#') ? hex : `#${hex}`;
      const rgb = hexToRgb(normalizedHex);
      
      if (!rgb) {
        throw new Error('HEX 转换失败');
      }

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

      setHexInput(normalizedHex);
      setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
      setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
      setCurrentColor(normalizedHex);
      toast.success('转换成功');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '转换失败');
    }
  };

  // 从 RGB 更新所有格式
  const updateFromRgb = (rgbStr: string) => {
    try {
      const parts = rgbStr.split(',').map(s => s.trim());
      if (parts.length !== 3) {
        throw new Error('RGB 格式应为: r, g, b');
      }

      const r = parseInt(parts[0]);
      const g = parseInt(parts[1]);
      const b = parseInt(parts[2]);

      if ([r, g, b].some(v => isNaN(v) || v < 0 || v > 255)) {
        throw new Error('RGB 值应在 0-255 之间');
      }

      const hex = rgbToHex(r, g, b);
      const hsl = rgbToHsl(r, g, b);

      setHexInput(hex);
      setRgbInput(`${r}, ${g}, ${b}`);
      setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
      setCurrentColor(hex);
      toast.success('转换成功');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '转换失败');
    }
  };

  // 从 HSL 更新所有格式
  const updateFromHsl = (hslStr: string) => {
    try {
      const parts = hslStr.replace(/%/g, '').split(',').map(s => s.trim());
      if (parts.length !== 3) {
        throw new Error('HSL 格式应为: h, s%, l%');
      }

      const h = parseInt(parts[0]);
      const s = parseInt(parts[1]);
      const l = parseInt(parts[2]);

      if (isNaN(h) || h < 0 || h > 360) {
        throw new Error('H 值应在 0-360 之间');
      }
      if ([s, l].some(v => isNaN(v) || v < 0 || v > 100)) {
        throw new Error('S 和 L 值应在 0-100 之间');
      }

      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      setHexInput(hex);
      setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
      setHslInput(`${h}, ${s}%, ${l}%`);
      setCurrentColor(hex);
      toast.success('转换成功');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '转换失败');
    }
  };

  // 清空
  const handleClear = () => {
    setHexInput('');
    setRgbInput('');
    setHslInput('');
    setCurrentColor('#ffffff');
  };

  // 随机颜色
  const handleRandom = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    updateFromHex(randomHex);
  };

  // 常用颜色预设
  const presetColors = [
    { name: '红色', hex: '#ef4444' },
    { name: '橙色', hex: '#f97316' },
    { name: '黄色', hex: '#eab308' },
    { name: '绿色', hex: '#22c55e' },
    { name: '青色', hex: '#06b6d4' },
    { name: '蓝色', hex: '#3b82f6' },
    { name: '紫色', hex: '#a855f7' },
    { name: '粉色', hex: '#ec4899' },
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Palette className="h-8 w-8" />
          颜色转换
        </h1>
        <p className="text-muted-foreground mt-2">
          HEX、RGB、HSL 颜色格式互转工具
        </p>
      </div>

      {/* 颜色预览 */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-full h-32 rounded-lg border-2 border-border shadow-lg transition-colors duration-200"
            style={{ backgroundColor: currentColor }}
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">当前颜色</p>
            <p className="text-2xl font-mono font-bold mt-1">{currentColor}</p>
          </div>
        </div>
      </Card>

      {/* 工具栏 */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleRandom} className="gap-2">
            <Wand2 className="h-4 w-4" />
            随机颜色
          </Button>
          <Button onClick={handleClear} variant="ghost" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            清空
          </Button>
        </div>
      </Card>

      {/* 颜色格式转换 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HEX */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">HEX</h3>
              {hexInput && <CopyButton text={hexInput} />}
            </div>
            <Input
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder="#3b82f6"
              className="font-mono"
            />
            <Button 
              onClick={() => updateFromHex(hexInput)}
              variant="outline" 
              className="w-full gap-2"
              size="sm"
            >
              <ArrowRight className="h-4 w-4" />
              转换
            </Button>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>格式: #RRGGBB</p>
              <p>示例: #3b82f6</p>
            </div>
          </div>
        </Card>

        {/* RGB */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">RGB</h3>
              {rgbInput && <CopyButton text={`rgb(${rgbInput})`} />}
            </div>
            <Input
              value={rgbInput}
              onChange={(e) => setRgbInput(e.target.value)}
              placeholder="59, 130, 246"
              className="font-mono"
            />
            <Button 
              onClick={() => updateFromRgb(rgbInput)}
              variant="outline" 
              className="w-full gap-2"
              size="sm"
            >
              <ArrowRight className="h-4 w-4" />
              转换
            </Button>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>格式: R, G, B</p>
              <p>范围: 0-255</p>
              <p>示例: 59, 130, 246</p>
            </div>
          </div>
        </Card>

        {/* HSL */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">HSL</h3>
              {hslInput && <CopyButton text={`hsl(${hslInput})`} />}
            </div>
            <Input
              value={hslInput}
              onChange={(e) => setHslInput(e.target.value)}
              placeholder="217, 91%, 60%"
              className="font-mono"
            />
            <Button 
              onClick={() => updateFromHsl(hslInput)}
              variant="outline" 
              className="w-full gap-2"
              size="sm"
            >
              <ArrowRight className="h-4 w-4" />
              转换
            </Button>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>格式: H, S%, L%</p>
              <p>H: 0-360, S/L: 0-100</p>
              <p>示例: 217, 91%, 60%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 常用颜色 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">常用颜色</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {presetColors.map((color) => (
            <button
              key={color.hex}
              onClick={() => updateFromHex(color.hex)}
              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
              title={color.name}
            >
              <div
                className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs text-muted-foreground">{color.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* 使用说明 */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">使用说明</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>HEX</strong>: 十六进制颜色格式，常用于 CSS 和设计工具</p>
          <p>• <strong>RGB</strong>: 红绿蓝三原色模式，每个值范围 0-255</p>
          <p>• <strong>HSL</strong>: 色相、饱和度、亮度模式，更符合人类对颜色的感知</p>
          <p>• 在任意输入框中输入颜色值，点击"转换"按钮即可转换为其他格式</p>
          <p>• 点击"随机颜色"可以生成随机颜色进行测试</p>
          <p>• 点击常用颜色可以快速选择预设颜色</p>
        </div>
      </Card>
    </div>
  );
}