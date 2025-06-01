import React from 'react';

interface DebugContentProps {
  data: any;
  title?: string;
}

export default function DebugContent({ data, title = 'Debug Data' }: DebugContentProps) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg overflow-auto max-h-96 z-50">
      <h3 className="text-yellow-400 font-bold mb-2">{title}</h3>
      <pre className="text-xs overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button 
        onClick={() => console.log(data)}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
      >
        Log to Console
      </button>
    </div>
  );
}