"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

const WebRTCVisualization = () => {
  const [expandedSections, setExpandedSections] = useState({
    webrtcFlow: true,
    audioFeatures: false,
    responseStreaming: false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // イベントフローのデータ定義
  const webRTCFeatures = {
    signaling: [
      { name: "オファー生成", description: "クライアントがSDPオファーを作成" },
      { name: "シグナリング交換", description: "オファー/アンサーの交換で接続を確立" },
      { name: "ICE候補交換", description: "NATトラバーサルのための接続候補を交換" }
    ],
    connection: [
      { name: "暗号化", description: "DTLS/SRTPによる通信の暗号化" },
      { name: "QoSモニタリング", description: "接続品質の継続的な監視と最適化" }
    ]
  };

  const SectionHeader = ({ title, section, count }) => (
    <div 
      className="flex items-center p-2 bg-gray-100 rounded-md cursor-pointer mb-2"
      onClick={() => toggleSection(section)}
    >
      {expandedSections[section] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      <h3 className="text-lg font-medium ml-1">{title} ({count})</h3>
    </div>
  );

  const ResponseDetailFlow = () => (
    <div className="mt-4 p-4 border rounded-md bg-gray-50">
      <h3 className="font-medium mb-3">リアルタイムオーディオの処理フロー</h3>
      <div className="relative">
        <div className="flex mb-3 relative">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-blue-100 rounded text-sm">音声キャプチャ</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">クライアント</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">ユーザーマイクから音声をキャプチャ</div>
          </div>
        </div>
        
        <div className="absolute left-1/3 top-10 w-px h-4 bg-gray-300"></div>
        
        <div className="flex mb-3 relative">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-blue-100 rounded text-sm">音声処理</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">クライアント</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">ノイズ除去とエコーキャンセリング</div>
          </div>
        </div>
        
        <div className="absolute left-1/3 top-24 w-px h-4 bg-gray-300"></div>
        
        <div className="flex mb-3 relative">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-blue-100 rounded text-sm">WebRTC転送</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">ネットワーク</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">P2P接続を通じてサーバーに送信</div>
          </div>
        </div>
        
        <div className="absolute left-1/3 top-38 w-px h-4 bg-gray-300"></div>
        
        <div className="flex mb-3 relative">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-green-100 rounded text-sm">音声分析</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">サーバー</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">音声認識と意図理解</div>
          </div>
        </div>
        
        <div className="absolute left-1/3 top-52 w-px h-4 bg-gray-300"></div>
        
        <div className="flex mb-3 relative">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-green-100 rounded text-sm">レスポンス生成</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">サーバー</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">テキストと音声の同時生成</div>
          </div>
        </div>
        
        <div className="absolute left-1/3 top-66 w-px h-4 bg-gray-300"></div>
        
        <div className="flex mb-3">
          <div className="w-1/3 pr-2">
            <div className="p-2 bg-blue-100 rounded text-sm">レスポンス再生</div>
          </div>
          <div className="w-1/6 text-center text-xs text-gray-500">
            <div className="p-2">クライアント</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="p-2 bg-gray-100 rounded text-sm">受信した音声をストリーミング再生</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">OpenAI Realtime API イベントフロー</h1>
      
      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <div className="w-5/12 p-2 bg-blue-100 rounded text-center font-medium">クライアント</div>
          <div className="w-5/12 p-2 bg-green-100 rounded text-center font-medium">サーバー</div>
        </div>
        
        <div className="mb-2 p-4 border rounded-md bg-gray-50">
          <p className="mb-2 font-medium">WebRTCセッション初期化フロー:</p>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-5/12 p-2 bg-purple-100 rounded text-center">
                <p className="font-medium">REST API呼び出し</p>
                <p className="text-xs mt-1">POST /v1/realtime/sessions</p>
              </div>
              <ArrowRight className="mx-4 text-gray-500" />
              <div className="w-5/12 p-2 bg-purple-100 rounded text-center">
                <p>セッションオブジェクト</p>
                <p className="text-xs mt-1">client_secret付き</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 ml-4 mb-3">↓ WebRTCで接続</p>
          </div>
          
          <div className="mt-4 p-3 border border-gray-200 rounded bg-yellow-50">
            <h4 className="text-sm font-medium mb-1">WebRTC接続パラメータ</h4>
            <ul className="text-xs text-gray-700 ml-2">
              <li><span className="font-medium">modalities</span>: ["audio", "text"] - 応答可能なモダリティ</li>
              <li><span className="font-medium">model</span>: 使用するRealtimeモデル</li>
              <li><span className="font-medium">instructions</span>: モデルへの指示（システムメッセージ）</li>
              <li><span className="font-medium">voice</span>: 音声タイプ（alloy, ash, ballad等）</li>
              <li><span className="font-medium">input_audio_format</span>: pcm16, g711_ulaw, g711_alaw</li>
              <li><span className="font-medium">output_audio_format</span>: pcm16, g711_ulaw, g711_alaw</li>
              <li><span className="font-medium">turn_detection</span>: 発話検出設定（server_vad等）</li>
            </ul>
          </div>
          
          <div className="mt-4 p-3 border border-blue-200 rounded bg-blue-50">
            <h4 className="text-sm font-medium mb-1">WebRTC特有の機能</h4>
            <ul className="text-xs text-gray-700 ml-2">
              <li>低遅延の双方向リアルタイム音声通信</li>
              <li>自動的な音声活動検出（VAD）</li>
              <li>ネットワーク状態に応じた適応型ビットレート調整</li>
              <li>エコーキャンセリングとノイズ抑制</li>
              <li>ブラウザ内でのネイティブメディア処理</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SectionHeader title="WebRTC接続フロー" section="webrtcFlow" count="6" />
        {expandedSections.webrtcFlow && (
          <div className="pl-4">
            <div className="mb-4 border-b pb-2">
              <h4 className="font-medium mb-2">シグナリングプロセス</h4>
              <div className="bg-gray-50 p-3 rounded border">
                <ol className="list-decimal ml-4 text-sm space-y-2">
                  <li>
                    <span className="font-medium">REST API認証</span>
                    <p className="text-xs ml-1">クライアントがREST APIを呼び出し、ephemeralトークンを取得</p>
                  </li>
                  <li>
                    <span className="font-medium">RTCPeerConnection作成</span>
                    <p className="text-xs ml-1">クライアント側でWebRTC接続オブジェクトを初期化</p>
                  </li>
                  <li>
                    <span className="font-medium">オファー生成と送信</span>
                    <p className="text-xs ml-1">クライアントがSDPオファーを作成し、サーバーに送信</p>
                  </li>
                  <li>
                    <span className="font-medium">アンサー受信と設定</span>
                    <p className="text-xs ml-1">サーバーからSDPアンサーを受信し、ローカル接続に適用</p>
                  </li>
                  <li>
                    <span className="font-medium">ICE候補交換</span>
                    <p className="text-xs ml-1">接続候補情報を交換し、最適な接続経路を確立</p>
                  </li>
                  <li>
                    <span className="font-medium">接続確立</span>
                    <p className="text-xs ml-1">接続状態が「connected」に変わり、メディア転送開始</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 border rounded-md bg-gray-50">
        <h3 className="font-medium mb-3">WebRTCシグナリングと通信フロー</h3>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center">
            <div className="w-5/12 p-2 bg-blue-100 rounded text-center">クライアント</div>
            <ArrowRight className="mx-4 text-gray-500" />
            <div className="w-5/12 p-2 bg-green-100 rounded text-center">サーバー</div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12 p-2 bg-gray-100 rounded text-center text-sm">セッション作成リクエスト</div>
            <ArrowRight className="mx-4 text-gray-500" />
            <div className="w-5/12"></div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12"></div>
            <ArrowLeft className="mx-4 text-gray-500" />
            <div className="w-5/12 p-2 bg-gray-100 rounded text-center text-sm">セッションとクライアントシークレット応答</div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12 p-2 bg-gray-100 rounded text-center text-sm">WebRTCシグナリング開始</div>
            <ArrowRight className="mx-4 text-gray-500" />
            <div className="w-5/12"></div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12"></div>
            <ArrowLeft className="mx-4 text-gray-500" />
            <div className="w-5/12 p-2 bg-gray-100 rounded text-center text-sm">ICE候補とSDP情報を交換</div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12 p-2 bg-blue-100 rounded text-center text-sm">音声ストリーム送信開始</div>
            <ArrowRight className="mx-4 text-gray-500" />
            <div className="w-5/12"></div>
          </div>
          
          <div className="flex items-center">
            <div className="w-5/12"></div>
            <ArrowLeft className="mx-4 text-gray-500" />
            <div className="w-5/12 p-2 bg-green-100 rounded text-center text-sm">音声/テキスト応答送信</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded border border-blue-100">
          <h3 className="font-medium mb-2 flex items-center">
            <ExternalLink size={16} className="mr-1" />
            WebRTC技術情報
          </h3>
          
          <p className="text-sm mt-3 mb-1">対応モデル:</p>
          <p className="text-xs ml-2">gpt-4o-realtime-preview-2024-12-17</p>
          <p className="text-xs ml-2">gpt-4o-mini-realtime-preview-2024-12-17</p>
        </div>
      </div>
    </div>
  );
};

export default WebRTCVisualization;