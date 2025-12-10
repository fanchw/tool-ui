import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/common/CopyButton';
import { 
  Clock, 
  Calendar,
  ArrowRightLeft,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { format, fromUnixTime, getUnixTime, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function TimestampPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timestampInput, setTimestampInput] = useState('');
  const [timestampUnit, setTimestampUnit] = useState<'s' | 'ms'>('s');
  const [dateTimeInput, setDateTimeInput] = useState('');
  const [convertedResult, setConvertedResult] = useState('');

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 获取当前时间戳（秒）
  const getCurrentTimestampSeconds = () => {
    return Math.floor(Date.now() / 1000);
  };

  // 获取当前时间戳（毫秒）
  const getCurrentTimestampMillis = () => {
    return Date.now();
  };

  // 时间戳转日期时间
  const handleTimestampToDate = () => {
    try {
      if (!timestampInput.trim()) {
        toast.error('请输入时间戳');
        return;
      }

      const timestamp = parseInt(timestampInput);
      if (isNaN(timestamp)) {
        toast.error('时间戳格式错误');
        return;
      }

      let date: Date;
      if (timestampUnit === 's') {
        // 秒级时间戳
        date = fromUnixTime(timestamp);
      } else {
        // 毫秒级时间戳
        date = new Date(timestamp);
      }

      const result = [
        `标准格式: ${format(date, 'yyyy-MM-dd HH:mm:ss')}`,
        `ISO 8601: ${date.toISOString()}`,
        `本地时间: ${date.toLocaleString('zh-CN')}`,
        `UTC 时间: ${date.toUTCString()}`,
        `相对时间: ${getRelativeTime(date)}`,
      ].join('\n');

      setConvertedResult(result);
      toast.success('转换成功');
    } catch (error) {
      toast.error('转换失败');
      console.error('Convert error:', error);
    }
  };

  // 日期时间转时间戳
  const handleDateToTimestamp = () => {
    try {
      if (!dateTimeInput.trim()) {
        toast.error('请输入日期时间');
        return;
      }

      let date: Date;
      
      // 尝试解析 ISO 格式
      if (dateTimeInput.includes('T') || dateTimeInput.includes('Z')) {
        date = parseISO(dateTimeInput);
      } else {
        // 尝试解析常见格式
        date = new Date(dateTimeInput);
      }

      if (isNaN(date.getTime())) {
        toast.error('日期时间格式错误');
        return;
      }

      const timestampSeconds = getUnixTime(date);
      const timestampMillis = date.getTime();

      const result = [
        `秒级时间戳: ${timestampSeconds}`,
        `毫秒级时间戳: ${timestampMillis}`,
        `微秒级时间戳: ${timestampMillis * 1000}`,
        `纳秒级时间戳: ${timestampMillis * 1000000}`,
      ].join('\n');

      setConvertedResult(result);
      toast.success('转换成功');
    } catch (error) {
      toast.error('转换失败');
      console.error('Convert error:', error);
    }
  };

  // 获取相对时间
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return `${diffSeconds} 秒前`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} 分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours} 小时前`;
    } else if (diffDays < 30) {
      return `${diffDays} 天前`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} 个月前`;
    } else {
      return `${Math.floor(diffDays / 365)} 年前`;
    }
  };

  // 使用当前时间
  const handleUseCurrentTime = () => {
    const now = new Date();
    setDateTimeInput(format(now, "yyyy-MM-dd'T'HH:mm:ss"));
  };

  // 清空
  const handleClear = () => {
    setTimestampInput('');
    setDateTimeInput('');
    setConvertedResult('');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock className="h-8 w-8" />
          时间戳转换
        </h1>
        <p className="text-muted-foreground mt-2">
          时间戳与日期时间互转工具
        </p>
      </div>

      {/* 当前时间 */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            当前时间
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">本地时间</div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-lg">
                {format(currentTime, 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })}
              </div>
              <CopyButton text={format(currentTime, 'yyyy-MM-dd HH:mm:ss')} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">秒级时间戳</div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-lg">{getCurrentTimestampSeconds()}</div>
              <CopyButton text={getCurrentTimestampSeconds().toString()} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">毫秒级时间戳</div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-lg">{getCurrentTimestampMillis()}</div>
              <CopyButton text={getCurrentTimestampMillis().toString()} />
            </div>
          </div>
        </div>
      </Card>

      {/* 转换工具 */}
      <Tabs defaultValue="timestamp" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timestamp" className="gap-2">
            <Clock className="h-4 w-4" />
            时间戳转日期
          </TabsTrigger>
          <TabsTrigger value="datetime" className="gap-2">
            <Calendar className="h-4 w-4" />
            日期转时间戳
          </TabsTrigger>
        </TabsList>

        {/* 时间戳转日期 */}
        <TabsContent value="timestamp" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">输入时间戳</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={timestampInput}
                  onChange={(e) => setTimestampInput(e.target.value)}
                  placeholder="请输入时间戳..."
                  className="font-mono flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    variant={timestampUnit === 's' ? 'default' : 'outline'}
                    onClick={() => setTimestampUnit('s')}
                  >
                    秒
                  </Button>
                  <Button
                    variant={timestampUnit === 'ms' ? 'default' : 'outline'}
                    onClick={() => setTimestampUnit('ms')}
                  >
                    毫秒
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleTimestampToDate} className="gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  转换
                </Button>
                <Button onClick={handleClear} variant="ghost" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  清空
                </Button>
              </div>
            </div>
          </Card>

          {convertedResult && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">转换结果</h3>
                <CopyButton text={convertedResult} />
              </div>
              <div className="space-y-2 font-mono text-sm">
                {convertedResult.split('\n').map((line, index) => (
                  <div key={index} className="p-2 bg-muted/30 rounded">
                    {line}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* 日期转时间戳 */}
        <TabsContent value="datetime" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">输入日期时间</h3>
            <div className="space-y-3">
              <Input
                type="datetime-local"
                value={dateTimeInput}
                onChange={(e) => setDateTimeInput(e.target.value)}
                className="font-mono"
              />
              <div className="text-xs text-muted-foreground">
                支持格式: 2024-01-01T12:00:00 或 2024-01-01 12:00:00
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDateToTimestamp} className="gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  转换
                </Button>
                <Button onClick={handleUseCurrentTime} variant="secondary" className="gap-2">
                  <Clock className="h-4 w-4" />
                  使用当前时间
                </Button>
                <Button onClick={handleClear} variant="ghost" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  清空
                </Button>
              </div>
            </div>
          </Card>

          {convertedResult && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">转换结果</h3>
                <CopyButton text={convertedResult} />
              </div>
              <div className="space-y-2 font-mono text-sm">
                {convertedResult.split('\n').map((line, index) => (
                  <div key={index} className="p-2 bg-muted/30 rounded">
                    {line}
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
          <p><strong>时间戳转日期：</strong></p>
          <p>• 支持秒级和毫秒级时间戳</p>
          <p>• 自动转换为多种日期格式</p>
          <p>• 显示相对时间（如"3小时前"）</p>
          
          <p className="mt-4"><strong>日期转时间戳：</strong></p>
          <p>• 支持多种日期时间格式输入</p>
          <p>• 可使用日期时间选择器</p>
          <p>• 输出多种精度的时间戳</p>
          
          <p className="mt-4"><strong>时间戳精度：</strong></p>
          <p>• 秒级: 10位数字（如 1704067200）</p>
          <p>• 毫秒级: 13位数字（如 1704067200000）</p>
          <p>• 微秒级: 16位数字</p>
          <p>• 纳秒级: 19位数字</p>
        </div>
      </Card>
    </div>
  );
}