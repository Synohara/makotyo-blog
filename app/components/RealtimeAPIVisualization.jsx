"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

const RealtimeAPIVisualization = () => {
  const [expandedSections, setExpandedSections] = useState({
    sessionEvents: true,
    audioEvents: false,
    conversationEvents: false,
    responseEvents: false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // イベントフローのデータ定義
  const eventFlows = {
    sessionEvents: [
      { client: 'session.update', server: 'session.updated', description: 'セッション設定の更新' }
    ],
    audioEvents: [
      { client: 'input_audio_buffer.append', server: '(no response)', description: 'オーディオバッファにデータを追加' },
      { client: 'input_audio_buffer.commit', server: 'input_audio_buffer.committed', description: 'オーディオバッファをコミット' },
      { client: 'input_audio_buffer.clear', server: 'input_audio_buffer.cleared', description: 'オーディオバッファをクリア' },
      { server: 'input_audio_buffer.speech_started', client: '(automatic in server VAD)', description: '音声検出開始（サーバーVADモード）' },
      { server: 'input_audio_buffer.speech_stopped', client: '(automatic in server VAD)', description: '音声検出終了（サーバーVADモード）' }
    ],
    conversationEvents: [
      { client: 'conversation.item.create', server: 'conversation.item.created', description: '会話アイテムの追加' },
      { client: 'conversation.item.truncate', server: 'conversation.item.truncated', description: 'アシスタントの音声メッセージを途中で切る' },
      { client: 'conversation.item.delete', server: 'conversation.item.deleted', description: '会話アイテムの削除' },
      { server: 'conversation.item.input_audio_transcription.completed', client: '(automatic)', description: '音声文字起こし完了' },
      { server: 'conversation.item.input_audio_transcription.failed', client: '(automatic)', description: '音声文字起こし失敗' }
    ],
    responseEvents: [
      { client: 'response.create', server: ['response.created', '(several events)', 'response.done'], description: 'レスポンス生成開始' },
      { client: 'response.cancel', server: 'response.cancelled', description: '進行中のレスポンスをキャンセル' }
    ]
  };

  // レスポンス詳細イベントのデータ
  const responseDetailEvents = [
    { event: 'response.created', type: 'Response', description: 'レスポンス作成開始' },
    { event: 'response.output_item.added', type: 'Item', description: '新しい出力アイテム追加' },
    { event: 'response.content_part.added', type: 'Content Part', description: '新しいコンテンツ部分追加' },
    { event: 'response.text.delta / response.audio.delta', type: 'Content', description: 'テキスト/オーディオの増分更新' },
    { event: 'response.text.done / response.audio.done', type: 'Content', description: 'テキスト/オーディオ生成完了' },
    { event: 'response.content_part.done', type: 'Content Part', description: 'コンテンツ部分完了' },
    { event: 'response.output_item.done', type: 'Item', description: '出力アイテム完了' },
    { event: 'response.done', type: 'Response', description: 'レスポンス全体完了' }
  ];

  const SectionHeader = ({ title, section, count }) => (
    <div 
      className="flex items-center p-2 bg-gray-100 rounded-md cursor-pointer mb-2"
      onClick={() => toggleSection(section)}
    >
      {expandedSections[section] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      <h3 className="text-lg font-medium ml-1">{title} ({count})</h3>
    </div>
  );

  const EventFlow = ({ client, server, description }) => {
    if (Array.isArray(server)) {
      return (
        <div className="mb-4 border-b pb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="w-5/12 p-2 bg-blue-100 rounded text-center">{client}</div>
            <ArrowRight className="text-gray-500" />
            <div className="w-5/12 p-2 bg-green-100 rounded text-center">{server[0]}</div>
          </div>
          <div className="ml-6 pl-6 border-l-2 border-dashed border-gray-300">
            <div className="text-center p-2 bg-gray-100 rounded mb-2">{server[1]}</div>
            <div className="flex justify-end">
              <div className="w-5/12 p-2 bg-green-100 rounded text-center">{server[2]}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      );
    }

    if (client.startsWith('(')) {
      return (
        <div className="mb-4 border-b pb-2">
          <div className="flex justify-between items-center">
            <div className="w-5/12 p-2 bg-gray-100 rounded text-center italic">{client}</div>
            <ArrowLeft className="text-gray-500" />
            <div className="w-5/12 p-2 bg-green-100 rounded text-center">{server}</div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      );
    }

    return (
      <div className="mb-4 border-b pb-2">
        <div className="flex justify-between items-center">
          <div className="w-5/12 p-2 bg-blue-100 rounded text-center">{client}</div>
          <ArrowRight className="text-gray-500" />
          <div className="w-5/12 p-2 bg-green-100 rounded text-center">{server}</div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    );
  };

  const ResponseDetailFlow = () => (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <h3 className="font-medium mb-3">レスポンス詳細イベントフロー</h3>
      <div className="relative">
        {responseDetailEvents.map((event, idx) => (
          <div key={idx} className="flex mb-3 relative">
            <div className="w-1/3 pr-2">
              <div className="p-2 bg-green-100 rounded text-sm">{event.event}</div>
            </div>
            <div className="w-1/6 text-center text-xs text-gray-500">
              <div className="p-2">{event.type}</div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="p-2 bg-gray-100 rounded text-sm">{event.description}</div>
            </div>
            {idx < responseDetailEvents.length - 1 && (
              <div className="absolute left-1/3 top-10 w-px h-4 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">OpenAI Realtime API イベントフロー</h1>
      
      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <div className="w-5/12 p-2 bg-blue-100 rounded text-center font-medium">クライアント</div>
          <div className="w-5/12 p-2 bg-green-100 rounded text-center font-medium">サーバー</div>
        </div>
        
        <div className="mb-2 p-4 border rounded-md bg-gray-50">
          <p className="mb-2">初期接続時の自動イベント:</p>
          <div className="flex justify-end mb-1">
            <div className="w-5/12 p-2 bg-green-100 rounded text-center">session.created</div>
          </div>
          <div className="flex justify-end mb-1">
            <div className="w-5/12 p-2 bg-green-100 rounded text-center">conversation.created</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SectionHeader title="セッション関連イベント" section="sessionEvents" count={eventFlows.sessionEvents.length} />
        {expandedSections.sessionEvents && (
          <div className="pl-4">
            {eventFlows.sessionEvents.map((flow, idx) => (
              <EventFlow key={idx} {...flow} />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <SectionHeader title="オーディオ関連イベント" section="audioEvents" count={eventFlows.audioEvents.length} />
        {expandedSections.audioEvents && (
          <div className="pl-4">
            {eventFlows.audioEvents.map((flow, idx) => (
              <EventFlow key={idx} {...flow} />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <SectionHeader title="会話アイテム関連イベント" section="conversationEvents" count={eventFlows.conversationEvents.length} />
        {expandedSections.conversationEvents && (
          <div className="pl-4">
            {eventFlows.conversationEvents.map((flow, idx) => (
              <EventFlow key={idx} {...flow} />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <SectionHeader title="レスポンス関連イベント" section="responseEvents" count={eventFlows.responseEvents.length} />
        {expandedSections.responseEvents && (
          <div className="pl-4">
            {eventFlows.responseEvents.map((flow, idx) => (
              <EventFlow key={idx} {...flow} />
            ))}
            <ResponseDetailFlow />
          </div>
        )}
      </div>

      <div className="mt-8 p-4 border rounded-md bg-gray-50">
        <h3 className="font-medium mb-2">その他の重要なイベント</h3>
        <div className="flex mb-2">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-red-100 rounded text-center">error</div>
          </div>
          <div className="w-2/3 pl-2">
            <div className="p-2 bg-gray-100 rounded">エラー発生時に送信される</div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-yellow-100 rounded text-center">rate_limits.updated</div>
          </div>
          <div className="w-2/3 pl-2">
            <div className="p-2 bg-gray-100 rounded">レート制限情報の更新</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeAPIVisualization;