import React, { useState } from 'react';
import { Wand2, Sparkles } from 'lucide-react';
import { EnhancementStyle } from '../types';

interface PromptInputProps {
  onGenerate: (prompt: string, style: EnhancementStyle) => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isGenerating }) => {
  const [rawPrompt, setRawPrompt] = useState('');
  const [style, setStyle] = useState<EnhancementStyle>(EnhancementStyle.PROFESSIONAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rawPrompt.trim()) {
      onGenerate(rawPrompt, style);
    }
  };

  return (
    <div className="w-full bg-gray-850 border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
        {/* Subtle background gradient glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rawPrompt" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
            Input Raw Prompt
          </label>
          <textarea
            id="rawPrompt"
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            placeholder="e.g., I need code for a website about cats..."
            className="w-full h-32 bg-gray-950 text-gray-200 p-4 rounded-lg border border-gray-700 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none transition-all resize-none placeholder-gray-600 font-mono text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label htmlFor="style" className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              Enhancement Style
            </label>
            <div className="relative">
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value as EnhancementStyle)}
                className="w-full bg-gray-950 text-gray-200 p-3 rounded-lg border border-gray-700 focus:border-accent-500 outline-none appearance-none cursor-pointer transition-colors"
              >
                {Object.values(EnhancementStyle).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !rawPrompt.trim()}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-95 ${
              isGenerating
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25'
            }`}
          >
            {isGenerating ? (
              <>
                <Sparkles className="animate-spin" size={18} />
                <span>Enhancing...</span>
              </>
            ) : (
              <>
                <Wand2 size={18} />
                <span>Enhance Prompt</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};