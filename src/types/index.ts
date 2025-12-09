// 工具类型定义
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: ToolCategory;
}

export type ToolCategory =
  | 'crypto'
  | 'text'
  | 'converter'
  | 'generator'
  | 'other';

// 主题类型
export type Theme = 'light' | 'dark';

// 历史记录类型
export interface HistoryItem {
  id: string;
  toolId: string;
  input: string;
  output: string;
  timestamp: number;
}

// 加密工具类型
export interface CryptoConfig {
  algorithm: 'AES' | 'DES' | '3DES' | 'RSA';
  mode?: 'CBC' | 'ECB' | 'CTR' | 'CFB' | 'OFB';
  padding?: 'Pkcs7' | 'Iso97971' | 'AnsiX923' | 'Iso10126' | 'ZeroPadding' | 'NoPadding';
  key: string;
  iv?: string;
}

export interface HashConfig {
  algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'HMAC';
  key?: string;
}

// JSON 工具类型
export interface JsonFormatOptions {
  indent: number;
  sortKeys: boolean;
}

// 时间戳工具类型
export type TimestampUnit = 'seconds' | 'milliseconds' | 'microseconds';

export interface TimestampConfig {
  unit: TimestampUnit;
  timezone?: string;
}

// 颜色类型
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl';