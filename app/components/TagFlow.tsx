"use client"

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const GitTagVisualizer = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { title: "初期状態", description: "ローカルとリモートの両方で、タグv1.0が古いコミットAを指しています" },
    { title: "Step 1: ローカルタグの削除", description: "git tag -d v1.0 でローカルのタグを削除" },
    { title: "Step 2: 新しいローカルタグの作成", description: "git tag v1.0 <新コミットID> で新しいコミットBにタグを作成" },
    { title: "Step 3: リモートタグの削除", description: "git push origin :refs/tags/v1.0 でリモートのタグを削除" },
    { title: "Step 4: 新しいタグのプッシュ", description: "git push origin v1.0 で新しいタグをリモートにプッシュ" }
  ];

  const Repository = ({ name, hasTag, tagPointsTo }) => (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        <span className="font-semibold">{name}</span>
      </div>
      
      <div className="relative">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span>Commit A</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Commit B</span>
          </div>
        </div>
        
        {hasTag && (
          <div className={`absolute transition-all duration-500 ${
            tagPointsTo === 'A' ? 'top-0' : 'top-11'
          } left-full ml-2`}>
            <div className="flex items-center space-x-1">
              <div className="px-2 py-1 bg-yellow-100 border border-yellow-500 rounded text-sm flex items-center">
                <span className="inline-block w-2 h-px bg-yellow-500 mr-2"></span>
                v1.0
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const getRepositoryStates = (step) => {
    switch(step) {
      case 0:
        return { local: { hasTag: true, pointsTo: 'A' }, remote: { hasTag: true, pointsTo: 'A' } };
      case 1:
        return { local: { hasTag: false, pointsTo: null }, remote: { hasTag: true, pointsTo: 'A' } };
      case 2:
        return { local: { hasTag: true, pointsTo: 'B' }, remote: { hasTag: true, pointsTo: 'A' } };
      case 3:
        return { local: { hasTag: true, pointsTo: 'B' }, remote: { hasTag: false, pointsTo: null } };
      case 4:
        return { local: { hasTag: true, pointsTo: 'B' }, remote: { hasTag: true, pointsTo: 'B' } };
      default:
        return { local: { hasTag: true, pointsTo: 'A' }, remote: { hasTag: true, pointsTo: 'A' } };
    }
  };

  const state = getRepositoryStates(step);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{steps[step].title}</h2>
      </div>
      
      <div className="flex items-center justify-between space-x-8">
        <Repository 
          name="Local Repository" 
          hasTag={state.local.hasTag} 
          tagPointsTo={state.local.pointsTo}
        />
        <div className="text-2xl text-gray-400">→</div>
        <Repository 
          name="Remote Repository" 
          hasTag={state.remote.hasTag} 
          tagPointsTo={state.remote.pointsTo}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={step === 0}
        >
          前のステップ
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={step === steps.length - 1}
        >
          次のステップ
        </button>
      </div>

      <div className="mt-4">
        <SyntaxHighlighter language="bash" style={coy}>
          {steps[step].description}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default GitTagVisualizer;