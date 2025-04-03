/*
 * Snowflakeツール
 * 
 * このファイルには、データ視覚化のためのツールが含まれています。
 * Snowflakeとの連携はエージェントレベルでMCP経由で行います。
 */
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// データ視覚化ツール
export const visualizeDataTool = createTool({
  id: "visualize-data",
  description: "データを視覚化するための情報を生成します",
  inputSchema: z.object({
    data: z.array(z.record(z.string(), z.any())).describe("視覚化するデータ"),
    visualizationType: z.enum(["bar", "line", "pie", "table"]).describe("視覚化の種類"),
    title: z.string().optional().describe("視覚化のタイトル"),
    xAxis: z.string().optional().describe("X軸に使用するカラム名"),
    yAxis: z.string().optional().describe("Y軸に使用するカラム名"),
  }),
  outputSchema: z.object({
    type: z.enum(["chart", "table"] as const).describe("視覚化の種類"),
    chartType: z.string().optional().describe("チャートの種類（bar、line、pieなど）"),
    title: z.string().optional().describe("視覚化のタイトル"),
    labels: z.array(z.string()).optional().describe("ラベルの配列"),
    datasets: z.array(z.any()).optional().describe("データセットの配列"),
    columns: z.array(z.string()).optional().describe("テーブルのカラム名"),
    rows: z.array(z.array(z.any())).optional().describe("テーブルの行データ"),
  }),
  execute: async ({ context }) => {
    try {
      const { data, visualizationType, title, xAxis, yAxis } = context;
      
      // データが空の場合
      if (!data || data.length === 0) {
        throw new Error("視覚化するデータがありません");
      }
      
      // テーブル形式の視覚化
      if (visualizationType === "table") {
        const columns = Object.keys(data[0]);
        const rows = data.map(item => columns.map(col => item[col]));
        
        return {
          type: "table" as const,
          title: title || "データテーブル",
          columns,
          rows,
        };
      }
      
      // チャート形式の視覚化
      const x = xAxis || Object.keys(data[0])[0];
      const y = yAxis || Object.keys(data[0])[1];
      
      const labels = data.map(item => String(item[x]));
      
      let datasets = [];
      
      if (visualizationType === "pie") {
        datasets = [
          {
            data: data.map(item => Number(item[y])),
            backgroundColor: generateColors(data.length),
          },
        ];
      } else {
        datasets = [
          {
            label: y,
            data: data.map(item => Number(item[y])),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
          },
        ];
      }
      
      return {
        type: "chart" as const,
        chartType: visualizationType,
        title: title || `${y} by ${x}`,
        labels,
        datasets,
      };
    } catch (error: any) {
      console.error("データ視覚化エラー:", error);
      throw new Error(`データの視覚化中にエラーが発生しました: ${error.message || error}`);
    }
  },
});

// ランダムな色を生成する関数
function generateColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137) % 360; // 黄金角を使用して色相を分散
    colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
  }
  return colors;
}

// 利用可能なツールをエクスポート
export const snowflakeTools = {
  visualizeDataTool,
};
