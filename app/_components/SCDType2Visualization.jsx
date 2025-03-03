"use client";

import React, { useState } from 'react';

const SCDType2Visualization = () => {
  const [timePoint, setTimePoint] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animation, setAnimation] = useState('none');
  
  // 変更後のデータ
  const timelineData = [
    // 時点1: 初期データ
    [
      { 
        id: 1, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都新宿区", 
        phone: "03-1234-5678", 
        valid_from: "2023-01-01", 
        valid_to: "9999-12-31", 
        is_current: true 
      }
    ],
    // 時点2: 住所変更
    [
      { 
        id: 1, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都新宿区", 
        phone: "03-1234-5678", 
        valid_from: "2023-01-01", 
        valid_to: "2023-05-15", 
        is_current: false 
      },
      { 
        id: 2, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都渋谷区", 
        phone: "03-1234-5678", 
        valid_from: "2023-05-16", 
        valid_to: "9999-12-31", 
        is_current: true 
      }
    ],
    // 時点3: 電話番号変更
    [
      { 
        id: 1, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都新宿区", 
        phone: "03-1234-5678", 
        valid_from: "2023-01-01", 
        valid_to: "2023-05-15", 
        is_current: false 
      },
      { 
        id: 2, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都渋谷区", 
        phone: "03-1234-5678", 
        valid_from: "2023-05-16", 
        valid_to: "2023-08-20", 
        is_current: false 
      },
      { 
        id: 3, 
        customer_id: 101, 
        customer_name: "田中太郎", 
        address: "東京都渋谷区", 
        phone: "070-9876-5432", 
        valid_from: "2023-08-21", 
        valid_to: "9999-12-31", 
        is_current: true 
      }
    ]
  ];
  
  // アニメーションのためのuseEffect
  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (timePoint < 3) {
          // 次のタイムポイントに進む
          setAnimation('next');
          setTimeout(() => {
            setTimePoint(timePoint + 1);
            setAnimation('none');
          }, 1000);
        } else {
          // 最後まで来たら停止
          setIsPlaying(false);
        }
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timePoint]);
  
  // アニメーション再生コントロール
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // 特定のタイムポイントに直接ジャンプ
  const jumpToTimePoint = (point) => {
    setIsPlaying(false);
    setTimePoint(point);
  };
  
  // アニメーションをリセット
  const resetAnimation = () => {
    setIsPlaying(false);
    setTimePoint(1);
  };
  
  // 変更イベントの説明
  const events = [
    { date: "2023-01-01", event: "顧客データの初期登録" },
    { date: "2023-05-16", event: "顧客の住所が「新宿区」から「渋谷区」に変更" },
    { date: "2023-08-21", event: "顧客の電話番号が変更" }
  ];
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">SCD Type 2 データ変更の視覚化</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        
        {/* コントロールボタン */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                一時停止
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                再生
              </>
            )}
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg flex items-center"
            onClick={resetAnimation}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            リセット
          </button>
        </div>

        {/* タイムライン表示 */}
        <div className="relative pt-24 mb-24">
          {/* タイムラインのライン */}
          <div className="h-1 w-full bg-gray-200 absolute top-16"></div>
          
          {/* イベントのポイントとラベル */}
          <div className="relative">
            {events.map((evt, idx) => (
              <div 
                key={idx} 
                className="absolute top-0"
                style={{
                  left: `${idx * 45.33 + 5}%`,
                  width: '240px',
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-4 h-4 rounded-full cursor-pointer ${timePoint > idx ? 'bg-blue-500' : 'bg-gray-300'}`}
                    onClick={() => jumpToTimePoint(idx + 1)}
                  ></div>
                  <div className="text-sm font-medium mt-2">{evt.date}</div>
                  <div className={`text-sm text-center mt-1 ${timePoint === idx + 1 ? 'font-bold text-blue-600' : ''}`}>
                    {evt.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        
        {/* 現在のステップ表示 */}
        <div className="mb-4 text-center">
          <span className="inline-block px-4 py-2 bg-blue-100 rounded-full">
            ステップ {timePoint}/3: {
              timePoint === 1 ? "初期状態" : 
              timePoint === 2 ? "住所変更" : "電話番号変更"
            }
          </span>
        </div>
      
        {/* テーブル表示 */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <div className={`transition-all duration-500 ease-in-out ${animation === 'next' ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">ID</th>
                      <th className="border border-gray-300 p-2">顧客ID</th>
                      <th className="border border-gray-300 p-2">氏名</th>
                      <th className="border border-gray-300 p-2">住所</th>
                      <th className="border border-gray-300 p-2">電話番号</th>
                      <th className="border border-gray-300 p-2">有効開始日</th>
                      <th className="border border-gray-300 p-2">有効終了日</th>
                      <th className="border border-gray-300 p-2">現行フラグ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timelineData[timePoint - 1].map((row, index) => {
                      // 新しく追加されたレコードかどうかを判定
                      const isNewRow = (timePoint === 2 && row.id === 2) || (timePoint === 3 && row.id === 3);
                      // 更新されたレコードかどうかを判定
                      const isUpdatedRow = (timePoint === 2 && row.id === 1) || (timePoint === 3 && row.id === 2);
                      
                      return (
                        <tr 
                          key={index} 
                          className={`
                            ${row.is_current ? "bg-green-50" : ""}
                            ${isNewRow ? "animate-pulse bg-yellow-50" : ""}
                            ${isUpdatedRow ? "bg-red-50" : ""}
                          `}
                        >
                          <td className="border border-gray-300 p-2">{row.id}</td>
                          <td className="border border-gray-300 p-2">{row.customer_id}</td>
                          <td className="border border-gray-300 p-2">{row.customer_name}</td>
                          <td className={`border border-gray-300 p-2 ${timePoint >= 2 && row.id >= 2 ? "bg-yellow-100 transition-colors duration-500" : ""}`}>
                            {row.address}
                          </td>
                          <td className={`border border-gray-300 p-2 ${timePoint === 3 && row.id === 3 ? "bg-yellow-100 transition-colors duration-500" : ""}`}>
                            {row.phone}
                          </td>
                          <td className={`border border-gray-300 p-2 ${isNewRow ? "font-bold text-blue-600" : ""}`}>
                            {row.valid_from}
                          </td>
                          <td className={`border border-gray-300 p-2 ${isUpdatedRow ? "font-bold text-red-600" : ""}`}>
                            {row.valid_to}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {row.is_current ? 
                              <span className="text-green-600 font-bold">✓</span> : 
                              <span className="text-red-600">×</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent md:hidden"></div>
        </div>
        
        {/* 変更プロセスのフロー図 */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-4">変更プロセスの流れ：</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] py-4">
              <div className="flex flex-col items-center">
                {timePoint >= 2 && (
                  <div className={`flex items-center mb-6 transition-opacity duration-1000 ${timePoint === 2 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-blue-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">住所変更イベント</div>
                      <div className="text-sm text-gray-600">(2023-05-16)</div>
                    </div>
                    <div className="mx-4 text-2xl text-gray-400">→</div>
                    <div className="bg-red-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">レコード #1 の</div>
                      <div className="font-medium">有効終了日を更新</div>
                    </div>
                    <div className="mx-4 text-2xl text-gray-400">→</div>
                    <div className="bg-green-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">新しいレコード #2 を</div>
                      <div className="font-medium">現行フラグ=true で作成</div>
                    </div>
                  </div>
                )}
                
                {timePoint >= 3 && (
                  <div className={`flex items-center transition-opacity duration-1000 ${timePoint === 3 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-blue-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">電話番号変更イベント</div>
                      <div className="text-sm text-gray-600">(2023-08-21)</div>
                    </div>
                    <div className="mx-4 text-2xl text-gray-400">→</div>
                    <div className="bg-red-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">レコード #2 の</div>
                      <div className="font-medium">有効終了日を更新</div>
                    </div>
                    <div className="mx-4 text-2xl text-gray-400">→</div>
                    <div className="bg-green-100 p-4 rounded-lg text-center min-w-[180px]">
                      <div className="font-medium">新しいレコード #3 を</div>
                      <div className="font-medium">現行フラグ=true で作成</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 説明テキスト */}
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">説明：</h3>
          {timePoint === 1 && (
            <div className="mt-2 animate-fade-in">
              <p>初期状態では、顧客データが1つのレコードで管理されています。</p>
              <ul className="list-disc pl-6 mt-2">
                <li>有効開始日: 2023-01-01</li>
                <li>有効終了日: 9999-12-31 (無期限を表す特殊な日付)</li>
                <li>現行フラグ: true (このレコードが最新)</li>
              </ul>
            </div>
          )}
          
          {timePoint === 2 && (
            <div className="mt-2 animate-fade-in">
              <p>顧客が<span className="font-bold text-blue-600">住所を「新宿区」から「渋谷区」に変更</span>したとき：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>既存レコード(ID=1)の有効終了日を変更日の前日(2023-05-15)に設定</li>
                <li>既存レコードの現行フラグをfalseに変更</li>
                <li>新しいレコード(ID=2)を作成し、変更後の住所を設定</li>
                <li>新レコードの有効開始日を変更日(2023-05-16)に設定</li>
                <li>新レコードの有効終了日を9999-12-31に設定</li>
                <li>新レコードの現行フラグをtrueに設定</li>
              </ul>
            </div>
          )}
          
          {timePoint === 3 && (
            <div className="mt-2 animate-fade-in">
              <p>顧客が<span className="font-bold text-blue-600">電話番号を変更</span>したとき：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>現行レコード(ID=2)の有効終了日を変更日の前日(2023-08-20)に設定</li>
                <li>現行レコードの現行フラグをfalseに変更</li>
                <li>新しいレコード(ID=3)を作成し、変更後の電話番号を設定</li>
                <li>新レコードの有効開始日を変更日(2023-08-21)に設定</li>
                <li>新レコードの有効終了日を9999-12-31に設定</li>
                <li>新レコードの現行フラグをtrueに設定</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SCDType2Visualization;