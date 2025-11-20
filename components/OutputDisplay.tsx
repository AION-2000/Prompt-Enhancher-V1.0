import React, { useState } from 'react';
import { EnhancedResult } from '../types';
import { CopyButton } from './CopyButton';
import { Terminal, FileJson, FileText, Code, List } from 'lucide-react';

interface OutputDisplayProps {
  result: EnhancedResult;
}

type Tab = 'enhanced' | 'minimal' | 'json' | 'api' | 'markdown';

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<Tab>('enhanced');

  // Helper to construct the OpenAI API payload
  const openAiPayload = {
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: result.enhancedPrompt
      }
    ]
  };

  // Helper to construct Markdown format
  const markdownFormat = `
# Enhanced Prompt

${result.enhancedPrompt}

---

## Structured Analysis
**Role:** ${result.structuredAnalysis.role}
**Task:** ${result.structuredAnalysis.task}

### Instructions
${result.structuredAnalysis.instructions.map(i => `- ${i}`).join('\n')}

### Constraints
${result.structuredAnalysis.constraints.map(c => `- ${c}`).join('\n')}
`.trim();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'enhanced', label: 'Main', icon: <FileText size={16} /> },
    { id: 'minimal', label: 'Minimal', icon: <List size={16} /> },
    { id: 'json', label: 'JSON', icon: <FileJson size={16} /> },
    { id: 'api', label: 'OpenAI API', icon: <Code size={16} /> },
    { id: 'markdown', label: 'Markdown', icon: <Terminal size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'enhanced':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-accent-500 rounded-full inline-block"></span>
                Enhanced Prompt
              </h3>
              <CopyButton text={result.enhancedPrompt} />
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm shadow-inner">
              {result.enhancedPrompt}
            </div>
            
            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Role</span>
                <p className="text-accent-400 font-medium mt-1">{result.structuredAnalysis.role}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Task Type</span>
                <p className="text-accent-400 font-medium mt-1">{result.structuredAnalysis.task}</p>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full inline-block"></span>
                Minimal Version
              </h3>
              <CopyButton text={result.minimalVersion} />
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
              {result.minimalVersion}
            </div>
          </div>
        );

      case 'json':
        const jsonString = JSON.stringify(result, null, 2);
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span>
                Prompt Data JSON
              </h3>
              <CopyButton text={jsonString} />
            </div>
            <pre className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-yellow-100/80 font-mono text-xs overflow-x-auto custom-scrollbar">
              {jsonString}
            </pre>
          </div>
        );

      case 'api':
        const apiString = JSON.stringify(openAiPayload, null, 2);
        return (
          <div className="space-y-4">
             <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
                OpenAI API Payload
              </h3>
              <CopyButton text={apiString} />
            </div>
            <pre className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-purple-200/80 font-mono text-xs overflow-x-auto custom-scrollbar">
              {apiString}
            </pre>
          </div>
        );
      
      case 'markdown':
        return (
           <div className="space-y-4">
             <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-pink-500 rounded-full inline-block"></span>
                Markdown Format
              </h3>
              <CopyButton text={markdownFormat} />
            </div>
            <pre className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-pink-200/80 font-mono text-xs overflow-x-auto custom-scrollbar whitespace-pre-wrap">
              {markdownFormat}
            </pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gray-850 border border-gray-800 rounded-xl shadow-xl overflow-hidden animate-fade-in mt-8">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-accent-500 text-accent-400 bg-gray-800/30'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
};