import { useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useThemeStore } from '@/store/useThemeStore';
import { cn } from '@/lib/utils';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

export function MonacoEditor({
  value,
  onChange,
  placeholder = '请输入内容...',
  className,
  language = 'plaintext',
  readOnly = false,
  minHeight = '200px',
  maxHeight = '600px',
}: MonacoEditorProps) {
  const { theme } = useThemeStore();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [contentLeft, setContentLeft] = useState(62); // 默认值

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
    
    // 配置编辑器选项
    editor.updateOptions({
      wordWrap: 'on', // 启用自动换行
      wrappingStrategy: 'advanced', // 使用高级换行策略
      minimap: { enabled: false }, // 禁用小地图
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      readOnly: readOnly,
      automaticLayout: true, // 自动调整布局
    });

    // 如果是只读模式，隐藏光标
    if (readOnly) {
      editor.updateOptions({
        cursorStyle: 'line-thin',
        renderLineHighlight: 'none',
      });
    }

    // 监听焦点事件
    editor.onDidFocusEditorText(() => {
      setIsFocused(true);
    });

    editor.onDidBlurEditorText(() => {
      setIsFocused(false);
    });

    // 获取行号区域的宽度
    const updateContentLeft = () => {
      const layoutInfo = editor.getLayoutInfo();
      // contentLeft 是内容区域的左边距（包括行号和边距）
      setContentLeft(layoutInfo.contentLeft);
    };

    // 初始化时获取一次
    updateContentLeft();

    // 监听布局变化
    editor.onDidLayoutChange(() => {
      updateContentLeft();
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div
      className={cn('relative rounded-md overflow-hidden', className)}
      style={{
        minHeight,
        maxHeight,
        height: minHeight,
      }}
    >
      <Editor
        height="100%"
        language={language}
        value={value || ''}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          readOnly: readOnly,
          automaticLayout: true,
          padding: { top: 10, bottom: 10 },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">加载编辑器...</div>
          </div>
        }
      />
      {!value && !isFocused && placeholder && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div
            className="pt-[10px] text-muted-foreground text-sm opacity-50"
            style={{ paddingLeft: `${contentLeft}px` }}
          >
            {placeholder}
          </div>
        </div>
      )}
    </div>
  );
}