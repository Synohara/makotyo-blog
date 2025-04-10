import { z } from "zod";
import { Tool } from "@mastra/core";

const visualizeDataSchema = z.object({
  data: z.array(z.record(z.string(), z.any())).describe("視覚化するデータの配列"),
  visualizationType: z.enum(["bar", "line", "pie", "table"]).describe("視覚化の種類"),
  title: z.string().optional().describe("視覚化のタイトル"),
  xAxis: z.string().optional().describe("X軸に使用するカラム名"),
  yAxis: z.string().optional().describe("Y軸に使用するカラム名"),
});

const visualizeDataOutputSchema = z.object({
  data: z.array(z.record(z.string(), z.any())).describe("視覚化するデータの配列"),
  visualizationType: z.enum(["bar", "line", "pie", "table"]).describe("視覚化の種類"),
  title: z.string().describe("視覚化のタイトル"),
  xAxis: z.string().optional().describe("X軸に使用するカラム名"),
  yAxis: z.string().optional().describe("Y軸に使用するカラム名"),
});

function generateColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137) % 360; // 黄金角を使用して色相を分散
    colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
  }
  return colors;
}

/**
 * データ視覚化ツール
 * 入力データと視覚化タイプに基づいて視覚化情報を生成します
 */
export const visualizeDataTool = new Tool({
  name: "visualizeData",
  description: "データを視覚化するためのツール",
  schema: visualizeDataSchema,
  handler: async ({ data, visualizationType, title, xAxis, yAxis }) => {
    try {
      if (!data || data.length === 0) {
        throw new Error("視覚化するデータがありません");
      }

      const finalTitle = title || "データ視覚化";

      if (visualizationType === "table") {
        return {
          data,
          visualizationType,
          title: finalTitle,
        };
      }

      const finalXAxis = xAxis || Object.keys(data[0])[0];
      const finalYAxis = yAxis || Object.keys(data[0])[1];

      if (visualizationType === "pie") {
        const pieData = data.map((item) => ({
          ...item,
          backgroundColor: generateColors(data.length),
        }));

        return {
          data: pieData,
          visualizationType,
          title: finalTitle,
          xAxis: finalXAxis,
          yAxis: finalYAxis,
        };
      }

      return {
        data,
        visualizationType,
        title: finalTitle,
        xAxis: finalXAxis,
        yAxis: finalYAxis,
      };
    } catch (error: any) {
      console.error("データ視覚化エラー:", error);
      throw new Error(`データの視覚化中にエラーが発生しました: ${error.message || error}`);
    }
  },
  outputSchema: visualizeDataOutputSchema,
});
