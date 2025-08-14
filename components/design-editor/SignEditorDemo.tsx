import React from 'react';
import SignEditor from './SignEditor';

const SignEditorDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SignFlow Editor</h1>
              <p className="text-sm text-gray-600">Professional sign design with Konva.js</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Powered by Konva.js</span>
            </div>
          </div>
        </div>
      </div>
      
      <SignEditor />
    </div>
  );
};

export default SignEditorDemo;
