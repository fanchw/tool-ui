import CodeEditorComponent from '@uiw/react-textarea-code-editor';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  wrap?: boolean; // 是否自动换行
}

export function CodeEditor({
  value,
  onChange,
  placeholder = '请输入内容...',
  className,
  language = 'text',
  readOnly = false,
  minHeight = '200px',
  maxHeight = '600px',
  wrap = false, // 默认不换行
}: CodeEditorProps) {
  const { theme } = useThemeStore();

  // 主题配色 - 使用 VS Code 风格
  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#24292e',
      borderColor: 'hsl(240 5.9% 90%)',
    },
    dark: {
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      borderColor: 'hsl(240 3.7% 15.9%)',
    },
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div className={cn('relative', className)}>
      <CodeEditorComponent
        value={value}
        language={language}
        placeholder={placeholder}
        onChange={(evn) => onChange(evn.target.value)}
        readOnly={readOnly}
        data-color-mode={theme}
        padding={15}
        style={{
          minHeight,
          maxHeight,
          fontSize: 14,
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
          fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
          overflow: 'auto',
          borderRadius: '0.375rem',
          border: '1px solid',
          borderColor: currentTheme.borderColor,
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          wordBreak: wrap ? 'break-all' : 'normal',
        }}
        className={cn(
          'scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
          readOnly && 'cursor-default'
        )}
      />
    </div>
  );
}