"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, User, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const ClaudeChat = () => {
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        console.log('チャットデータの取得を開始します...');
        // APIエンドポイントからデータを取得
        // デフォルトでconversation_6ebb58d5.jsonを読み込む
        const filename = 'conversation_6ebb58d5';
        const url = `/api/chat?filename=${filename}`;
        console.log('APIリクエストURL:', url);

        const response = await fetch(url);
        console.log('APIレスポンスステータス:', response.status);

        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }

        const data = await response.json();
        console.log('取得したデータ:', data);

        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error('有効なチャットデータが取得できませんでした');
        }

        // タイムスタンプでメッセージをソート
        const sortedData = { ...data[0] };
        sortedData.chat_messages = [...data[0].chat_messages].sort((a, b) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });

        setChatData(sortedData);
        setLoading(false);

        // 初期状態ですべてのメッセージを展開
        const initialExpandState = {};
        sortedData.chat_messages.forEach(msg => {
          initialExpandState[msg.uuid] = true;
        });
        setExpandedMessages(initialExpandState);
        console.log('チャットデータの取得が完了しました');
      } catch (error) {
        console.error('チャットデータの読み込みエラー:', error);
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  const toggleMessageExpand = (messageId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  // メッセージ内容の種類に基づいて表示するためのコンポーネント
  // コードブロックを検出して表示するためのヘルパー
  const formatTextWithCodeBlocks = (text) => {
    if (!text) return null;

    // コードブロックを検出するための正規表現
    const codeBlockRegex = /```(.*?)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let index = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // コードブロックの前のテキストを追加
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
          id: `text-${index++}`
        });
      }

      // コードブロックを追加
      const language = match[1].trim();
      const codeContent = match[2].trim();
      parts.push({
        type: 'code',
        content: codeContent,
        language: language,
        id: `code-${index++}`
      });

      lastIndex = match.index + match[0].length;
    }

    // 最後のコードブロック以降のテキストを追加
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex),
        id: `text-${index++}`
      });
    }

    return parts.length ? parts : [{ type: 'text', content: text, id: 'text-0' }];
  };

  const MessageContent = ({ content }) => {
    if (!content || content.length === 0) return null;

    return (
      <div className="space-y-4">
        {content.map((item, index) => {
          if (item.type === 'text') {
            const textParts = formatTextWithCodeBlocks(item.text);

            return (
              <div key={index} className="whitespace-pre-wrap">
                {textParts.map((part, i) => {
                  if (part.type === 'text') {
                    return <span key={part.id}>{part.content}</span>;
                  } else if (part.type === 'code') {
                    return (
                      <div key={part.id} className="relative my-4 group">
                        <div className="absolute right-2 top-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-gray-700 text-white text-xs py-1 px-2 rounded hover:bg-gray-600">
                            Copy
                          </button>
                        </div>
                        {part.language && (
                          <div className="bg-gray-800 text-gray-300 text-xs px-4 py-1 rounded-t font-mono">
                            {part.language}
                          </div>
                        )}
                        <div className={`font-mono text-sm ${part.language ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'} p-4 ${part.language ? 'rounded-b' : 'rounded'} overflow-auto`}>
                          <pre className="whitespace-pre">{part.content}</pre>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            );
          } else if (item.type === 'tool_use') {
            return (
              <div key={index} className="my-4 rounded-md overflow-hidden border border-gray-200">
                <div className="flex items-center bg-blue-700 px-4 py-2 text-sm font-bold text-white">
                  <ArrowUpRight size={16} className="mr-2" />
                  ツール実行: {item.name}
                </div>
                <div className="border-t border-gray-200">
                  <div className="text-sm font-mono p-4 overflow-auto max-h-96">
                    <pre className="text-white-800">{item.input && JSON.stringify(item.input, null, 2)}</pre>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === 'tool_result') {
            return (
              <div key={index} className="my-4 rounded-md overflow-hidden border border-gray-200">
                <div className="flex items-center bg-green-700 px-4 py-2 text-sm font-bold text-white">
                  <ArrowUpRight size={16} className="mr-2" />
                  ツール結果: {item.name}
                </div>
                <div className="bg-gray-50 border-t border-gray-200">
                  <div className="text-sm font-mono p-4 overflow-auto max-h-96">
                    {item.content && item.content.map((contentItem, cidx) => (
                      <div key={cidx} className="mb-2">
                        <pre className="text-white-800 whitespace-pre-wrap">{contentItem.text}</pre>
                      </div>
                    ))}
                  </div>
                </div>
                {item.is_error && (
                  <div className="px-4 py-2 bg-red-600 border-t border-red-700 text-sm text-white font-bold">
                    エラーが発生しました
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  // 個別のメッセージコンポーネント
  const Message = ({ message }) => {
    const isHuman = message.sender === 'human';
    const isExpanded = expandedMessages[message.uuid];

    return (
      <div className={`py-6 px-4 border-b ${isHuman ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="flex items-start gap-4 max-w-6xl mx-auto">
          <div className={`rounded-full p-2 flex-shrink-0 ${isHuman ? 'bg-gray-200' : 'bg-purple-100'}`}>
            {isHuman ? (
              <User size={20} className="text-gray-700" />
            ) : (
              <MessageCircle size={20} className="text-purple-600" />
            )}
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-center mb-3">
              <div className="font-medium text-gray-800">
                {isHuman ? 'Human' : 'Claude'}
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <button
                  onClick={() => toggleMessageExpand(message.uuid)}
                  className="p-1 hover:bg-gray-100 rounded transition duration-150"
                  aria-label={isExpanded ? "折りたたむ" : "展開する"}
                  title={isExpanded ? "折りたたむ" : "展開する"}
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>

            {isExpanded ? (
              <div className="text-sm leading-relaxed text-gray-800">
                <MessageContent content={message.content} />
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">
                {message.text ? (
                  message.text.length > 150 ? message.text.substring(0, 150) + '...' : message.text
                ) : '内容が折りたたまれています'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!chatData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-xl font-medium text-red-500 mb-2">エラー</div>
        <div className="text-gray-600">チャットデータを読み込めませんでした</div>
      </div>
    );
  }

  // すべてのメッセージを展開/折りたたむ
  const toggleAllMessages = (expand) => {
    const newState = {};
    chatData.chat_messages.forEach(msg => {
      newState[msg.uuid] = expand;
    });
    setExpandedMessages(newState);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <MessageCircle size={20} className="text-purple-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                {chatData.name}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAllMessages(true)}
                  className="px-3 py-1.5 text-sm bg-white border rounded shadow-sm hover:bg-gray-50 transition-colors"
                >
                  すべて展開
                </button>
                <button
                  onClick={() => toggleAllMessages(false)}
                  className="px-3 py-1.5 text-sm bg-white border rounded shadow-sm hover:bg-gray-50 transition-colors"
                >
                  すべて折りたたむ
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto bg-white shadow-sm">
          {chatData.chat_messages.map((message, index) => (
            <Message
              key={message.uuid}
              message={message}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClaudeChat;
