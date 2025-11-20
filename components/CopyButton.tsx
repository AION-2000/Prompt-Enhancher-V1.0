import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, className = "", label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
        copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
      } ${className}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {label && <span>{label}</span>}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};