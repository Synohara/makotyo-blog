import React from 'react';
import ClaudeChat from '../components/ClaudeChat';

export const metadata = {
  title: 'Claude Chat Viewer',
  description: 'Claudeとの会話を表示するビューア',
};

export default function ChatPage() {
  return (
    <div>
      <ClaudeChat />
    </div>
  );
}
