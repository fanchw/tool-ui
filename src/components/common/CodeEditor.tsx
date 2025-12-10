import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
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
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // 自动调整高度
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const minHeightPx = parseInt(minHeight);
      const maxHeightPx = parseInt(maxHeight);
      
      let finalHeight: string;
      if (scrollHeight < minHeightPx) {
        finalHeight = minHeight;
      } else if (scrollHeight > maxHeightPx) {
        finalHeight = maxHeight;
      } else {
        finalHeight = `${scrollHeight}px`;
      }
      
      textarea.style.height = finalHeight;
      
      // 同步行号区域的最大可视高度
      if (lineNumbers) {
        lineNumbers.style.maxHeight = finalHeight;
      }
    }
  }, [value, minHeight, maxHeight]);

  // 同步滚动位置
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      // 直接同步 scrollTop，无延迟
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('relative', className)}>
      {/* 行号显示（可选功能） */}
      {value && (
        <div
          ref={lineNumbersRef}
          className="absolute left-0 top-0 w-12 bg-muted/30 border-r border-border pointer-events-none hidden md:block z-10 overflow-y-scroll scrollbar-hide"
        >
          <div className="px-2 py-2 text-xs text-muted-foreground font-mono leading-relaxed">
            {value.split('\n').map((_, index) => (
              <div key={index} className="text-right">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        className={cn(
          'w-full rounded-md border border-input bg-background py-2',
          'font-mono text-sm leading-relaxed',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-none overflow-auto',
          'scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
          readOnly && 'cursor-default',
          value ? 'md:pl-14 px-3' : 'px-3'
        )}
        style={{
          minHeight,
          maxHeight,
          tabSize: 2,
        }}
        data-language={language}
      />
    </div>
  );
}