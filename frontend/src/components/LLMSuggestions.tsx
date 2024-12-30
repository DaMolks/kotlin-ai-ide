import React, { useState } from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';

interface Suggestion {
  type: 'completion' | 'fix' | 'explanation';
  content: string;
}

const LLMSuggestions = ({ code }: { code: string }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const requestSuggestion = async (type: Suggestion['type']) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, type })
      });
      const data = await response.json();
      setSuggestions([...suggestions, { type, content: data.suggestion }]);
    } catch (error) {
      console.error('Error getting suggestion:', error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => requestSuggestion('completion')}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            <Lightbulb size={18} />
          </button>
          <button
            onClick={() => requestSuggestion('explanation')}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {loading && (
          <div className="text-sm text-gray-400">Thinking...</div>
        )}
        {suggestions.map((suggestion, index) => (
          <div key={index} className="bg-gray-700 p-3 rounded-md">
            <div className="text-xs text-gray-400 mb-1">
              {suggestion.type === 'completion' ? 'Suggestion' : 'Explanation'}
            </div>
            <div className="text-sm">
              {suggestion.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LLMSuggestions;