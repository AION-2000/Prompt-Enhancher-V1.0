import React, { useState } from 'react';
import { PromptInput } from './components/PromptInput';
import { OutputDisplay } from './components/OutputDisplay';
import { generateEnhancedPrompt } from './services/geminiService';
import { EnhancedResult, EnhancementStyle } from './types';
import { Cpu, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<EnhancedResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (rawPrompt: string, style: EnhancementStyle) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateEnhancedPrompt(rawPrompt, style);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while enhancing the prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 font-sans selection:bg-accent-500/30">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-accent-600/10 rounded-full ring-1 ring-accent-500/30 mb-4">
             <Cpu className="text-accent-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Prompt Enhancer <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-400">Engine v1.0</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform raw ideas into superior, structured AI prompts using the Gemini API.
            Select your style and get professional-grade results instantly.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <PromptInput onGenerate={handleGenerate} isGenerating={isLoading} />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
              <div>
                <h3 className="font-semibold text-red-400">Generation Failed</h3>
                <p className="text-sm mt-1 opacity-90">{error}</p>
              </div>
            </div>
          )}

          {result && <OutputDisplay result={result} />}

          {!result && !isLoading && !error && (
            <div className="text-center text-gray-600 py-12">
              <p className="text-sm uppercase tracking-widest opacity-50 font-mono">System Ready. Awaiting Input.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Prompt Enhancer Engine. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;