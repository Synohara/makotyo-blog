"use client";

import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { sendMessage } from "../lib/mastra/actions";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { SendIcon, BarChart3Icon, LightbulbIcon, SearchIcon, LoaderIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Chart.jsの登録
Chart.register(...registerables);

type ChartData = {
  type: "chart";
  chartType: string;
  title: string;
  labels: string[];
  datasets: any[];
};

type TableData = {
  type: "table";
  title: string;
  columns: string[];
  rows: any[][];
};

type VisualizationData = ChartData | TableData;

// サンプル分析クエリ
const SAMPLE_QUERIES = [
  {
    title: "小結の戦績",
    query: "2024年1〜5月場所の小結の戦績を教えて"
  },
  {
    title: "力士の勝率ランキング",
    query: "2024年1月場所の力士の勝率ランキングを教えて"
  },
  {
    title: "体重と勝率の関係",
    query: "力士の体重と勝率の関係を分析して"
  },
  {
    title: "出身地の分布",
    query: "力士の出身地の分布を教えて"
  },
  {
    title: "横綱の成績推移",
    query: "過去5年間の横綱の成績推移を分析して"
  },
  {
    title: "新入幕力士の成績",
    query: "2023年に新入幕した力士の成績を分析して"
  }
];

export default function SnowflakeAnalytics() {
  const [input, setInput] = useState("2024年1〜5月場所の小結の戦績を教えて");
  const [isLoading, setIsLoading] = useState(false);
  const [visualizationData, setVisualizationData] = useState<VisualizationData | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [analysisText, setAnalysisText] = useState<string>("");
  const [loadingDots, setLoadingDots] = useState<number>(0);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // ローディングアニメーション
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingDots(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // チャートの描画
  useEffect(() => {
    if (visualizationData && visualizationData.type === "chart" && chartRef.current) {
      // 既存のチャートがあれば破棄
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: visualizationData.chartType as any,
          data: {
            labels: visualizationData.labels,
            datasets: visualizationData.datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: visualizationData.title || "データ視覚化"
              },
              legend: {
                position: "top",
              }
            }
          }
        });
      }
    }
  }, [visualizationData]);

  // 分析実行処理
  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setAnalysisText("");
    setVisualizationData(null);
    setInsights([]);

    try {
      // エージェントにリクエスト
      const response = await sendMessage(input);
      console.log("エージェントからの応答:", response);

      // 分析テキストを設定
      setAnalysisText(response.text);

      // データの視覚化（もしあれば）
      if (response.data) {
        setVisualizationData(response.data);
      }

    } catch (error) {
      console.error("エラー:", error);
      setAnalysisText("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  // Enterキーで分析実行（日本語入力を考慮）
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  // サンプルクエリを選択
  const selectSampleQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <Card className="border shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="analysis-input" className="text-m font-medium">
              分析したい内容を入力してください
            </label>
            <div className="flex gap-2">
              <Textarea
                id="analysis-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="例: 力士の勝率ランキングを教えて"
                className="min-h-[80px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="self-end h-10"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                    <span>分析中</span>
                  </div>
                ) : (
                  <>
                    <SearchIcon className="h-4 w-4 mr-2" />
                    分析
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">サンプル分析</h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUERIES.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => selectSampleQuery(sample.query)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {sample.title}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="border shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="cat-animation-container">
                <div className="cat-running">
                  <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat">
                    {/* Cat body - rounder */}
                    <ellipse cx="40" cy="50" rx="22" ry="16" fill="#555" />

                    {/* Cat head - bigger and rounder */}
                    <circle cx="65" cy="45" r="15" fill="#555" />

                    {/* Cat ears - cuter */}
                    <polygon points="55,33 60,22 65,33" fill="#555" />
                    <polygon points="65,33 70,22 75,33" fill="#555" />

                    {/* Inner ears */}
                    <polygon points="56,33 60,23 64,33" fill="#ffb6c1" />
                    <polygon points="66,33 70,23 74,33" fill="#ffb6c1" />

                    {/* Cat legs */}
                    <rect x="30" y="60" width="5" height="20" rx="2.5" fill="#555" className="cat-leg cat-leg-1" />
                    <rect x="40" y="60" width="5" height="20" rx="2.5" fill="#555" className="cat-leg cat-leg-2" />
                    <rect x="50" y="60" width="5" height="20" rx="2.5" fill="#555" className="cat-leg cat-leg-3" />
                    <rect x="60" y="60" width="5" height="20" rx="2.5" fill="#555" className="cat-leg cat-leg-4" />

                    {/* Cat tail - curvier */}
                    <path d="M18,50 Q12,42 18,35" stroke="#555" strokeWidth="5" strokeLinecap="round" fill="none" />

                    {/* Cat eyes - bigger and cuter */}
                    <circle cx="69" cy="43" r="3.5" fill="white" />
                    <circle cx="61" cy="43" r="3.5" fill="white" />

                    {/* Cat pupils */}
                    <circle cx="69" cy="43" r="2" fill="black" />
                    <circle cx="61" cy="43" r="2" fill="black" />

                    {/* Cat nose */}
                    <path d="M65,48 L65,50 Q65,52 67,52 Q69,52 69,50 L69,48 Z" fill="#ffb6c1" />

                    {/* Cat mouth */}
                    <path d="M63,53 Q65,55 67,53" stroke="#333" strokeWidth="1" fill="none" />

                    {/* Cat whiskers */}
                    <line x1="73" y1="48" x2="85" y2="46" stroke="#333" strokeWidth="1" />
                    <line x1="73" y1="50" x2="85" y2="50" stroke="#333" strokeWidth="1" />
                    <line x1="73" y1="52" x2="84" y2="54" stroke="#333" strokeWidth="1" />

                    <line x1="57" y1="48" x2="45" y2="46" stroke="#333" strokeWidth="1" />
                    <line x1="57" y1="50" x2="45" y2="50" stroke="#333" strokeWidth="1" />
                    <line x1="57" y1="52" x2="46" y2="54" stroke="#333" strokeWidth="1" />

                    {/* Cute blush marks */}
                    <circle cx="57" cy="49" r="2" fill="#ffb6c1" opacity="0.6" />
                    <circle cx="73" cy="49" r="2" fill="#ffb6c1" opacity="0.6" />

                    {/* Optional: Sumo belt for the theme */}
                    <rect x="36" y="45" width="18" height="4" rx="1" fill="#8B4513" />
                    <line x1="40" y1="45" x2="40" y2="49" stroke="#F5DEB3" strokeWidth="1" />
                    <line x1="45" y1="45" x2="45" y2="49" stroke="#F5DEB3" strokeWidth="1" />
                    <line x1="50" y1="45" x2="50" y2="49" stroke="#F5DEB3" strokeWidth="1" />
                  </svg>
                </div>
                <div className="cat-path"></div>
              </div>
              <p className="text-lg font-medium">データを分析しています{'.'.repeat(loadingDots)}</p>
              <p className="text-sm text-muted-foreground">Snowflakeからデータを取得し、AIが分析中です</p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisText && !isLoading && (
        <Card className="border shadow-lg">
          <CardHeader className="bg-muted/50 flex flex-row items-center">
            <SearchIcon className="h-5 w-5 mr-2" />
            <CardTitle className="text-2xl font-extrabold text-green-600">分析結果</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>
                {analysisText}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      {visualizationData && !isLoading && (
        <Card className="border shadow-lg">
          <CardHeader className="bg-muted/50 flex flex-row items-center">
            <BarChart3Icon className="h-5 w-5 mr-2" />
            <CardTitle className="text-2xl font-extrabold text-red-600">データ視覚化</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] mb-6">
              <canvas ref={chartRef}></canvas>
            </div>
            {visualizationData && visualizationData.type === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      {visualizationData.columns.map((column, index) => (
                        <th key={index} className="p-3 text-left font-medium border-b">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visualizationData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-muted/50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="p-3 border-b">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
