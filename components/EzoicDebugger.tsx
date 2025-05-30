import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EzoicDebugger: React.FC = () => {
  const router = useRouter();
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [showDebugButton, setShowDebugButton] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Check if debug mode is enabled via query parameter
    const debugParam = router.query.ez_js_debugger;
    setIsDebugMode(debugParam === '1');

    // Show debug button in development
    setShowDebugButton(isDevelopment || debugParam === '1');
  }, [router.query, isDevelopment]);

  const toggleDebugMode = () => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    
    if (isDebugMode) {
      delete currentQuery.ez_js_debugger;
    } else {
      currentQuery.ez_js_debugger = '1';
    }

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  if (!showDebugButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDebugMode}
        className={`px-4 py-2 rounded-lg font-medium text-sm shadow-lg transition-colors ${
          isDebugMode
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
        title={isDebugMode ? 'Disable Ezoic Debug Mode' : 'Enable Ezoic Debug Mode'}
      >
        {isDebugMode ? '🐛 Debug ON' : '🔍 Debug OFF'}
      </button>
      
      {isDebugMode && (
        <div className="mt-2 p-3 bg-white rounded-lg shadow-lg max-w-xs">
          <h3 className="font-bold text-sm mb-1">Ezoic Debugger Active</h3>
          <p className="text-xs text-gray-600">
            Look for the green modal at the bottom of the page for debugging info.
          </p>
          <ul className="text-xs mt-2 space-y-1">
            <li>✓ Script loading status</li>
            <li>✓ Consent management</li>
            <li>✓ Ad request details</li>
            <li>✓ Placeholder status</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EzoicDebugger;

// Helper hook to check debug status
export const useEzoicDebug = () => {
  const router = useRouter();
  return router.query.ez_js_debugger === '1';
};