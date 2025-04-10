"use server";

import { MastraClient } from "@mastra/client-js";

export type MessageResponse = {
  text: string;
  data?: any;
};

type ContextType = {
  data: any[];
  visualizationType: string;
  title?: string;
  xAxis?: string;
  yAxis?: string;
};

const convertDataSchema = async ({ context }: { context: ContextType }) => {
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
};

// ランダムな色を生成する関数
function generateColors(count: number): string[] {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137) % 360; // 黄金角を使用して色相を分散
    colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
  }
  return colors;
}

/**
 * メッセージをSnowflakeエージェントに送信する
 * @param message ユーザーからのメッセージ
 * @returns エージェントからの応答
 */
export async function sendMessageToSnowflake(message: string): Promise<MessageResponse> {
  try {
    // ワークフローを実行
    const client = new MastraClient({
      baseUrl: "https://mastra-three.vercel.app", // Default Mastra development server port
    });

    const snowflakeWorkflow = client.getWorkflow("snowflakeWorkflow");
    const { runId } = await snowflakeWorkflow.createRun();

    console.log("Workflow runId:", runId);

    const result = await snowflakeWorkflow.startAsync({
      runId: runId,
      triggerData: { userQuery: message },
    })

    console.log("Workflow result:", result);
    console.log("userQuery", message);

    // 結果の構造を詳細にログ出力
    console.log("Workflow result structure:", JSON.stringify(result, null, 2));

    // TypeScriptエラーを回避するために型アサーションを使用
    const workflowResult = result as any;

    // フィードバックから判明した正しい構造に基づいて結果を取得
    const queryResult = workflowResult.results?.queryData?.output?.result;
    const analysisText = workflowResult.results?.analyzeData?.output?.analysisText;
    let graphData = workflowResult.results?.queryData?.output?.graphData;

    if (graphData) {
      graphData = await convertDataSchema({ context: graphData });
    }

    console.log("Query result:", queryResult);
    console.log("Analysis text:", analysisText);
    console.log("Graph data:", graphData);

    // クエリ結果はあるが分析結果がない場合
    if (queryResult && !analysisText) {
      return {
        text: queryResult,
        data: null,
      };
    }

    // 分析結果がある場合
    if (analysisText) {
      return {
        text: analysisText || "分析が完了しました。",
        data: graphData,
      };
    }

    // どちらもない場合
    return {
      text: "データの取得中にエラーが発生しました。",
      data: null,
    };

  } catch (error) {
    console.error("エージェント呼び出しエラー:", error);
    throw new Error("エージェントとの通信中にエラーが発生しました");
  }
}

/**
 * メッセージをデータベースに送信する
 * @param message ユーザーからのメッセージ
 * @param dbType データベースタイプ（"snowflake" または "duckdb"）
 * @returns エージェントからの応答
 */
export async function sendMessage(message: string, dbType: "snowflake" | "duckdb" = "snowflake"): Promise<MessageResponse> {
  if (dbType === "duckdb") {
    return sendMessageToDuckDB(message);
  } else {
    return sendMessageToSnowflake(message);
  }
}

/**
 * メッセージをDuckDBエージェントに送信する
 * @param message ユーザーからのメッセージ
 * @returns エージェントからの応答
 */
export async function sendMessageToDuckDB(message: string): Promise<MessageResponse> {
  try {
    // ワークフローを実行
    const client = new MastraClient({
      baseUrl: "https://mastra-three.vercel.app", // Default Mastra development server port
    });

    const duckdbWorkflow = client.getWorkflow("duckdbWorkflow");
    const { runId } = await duckdbWorkflow.createRun();

    console.log("DuckDB Workflow runId:", runId);

    const result = await duckdbWorkflow.startAsync({
      runId: runId,
      triggerData: { userQuery: message },
    })

    console.log("DuckDB Workflow result:", result);
    console.log("userQuery", message);

    // 結果の構造を詳細にログ出力
    console.log("DuckDB Workflow result structure:", JSON.stringify(result, null, 2));

    // TypeScriptエラーを回避するために型アサーションを使用
    const workflowResult = result as any;

    // フィードバックから判明した正しい構造に基づいて結果を取得
    const queryResult = workflowResult.results?.queryData?.output?.result;
    const analysisText = workflowResult.results?.analyzeData?.output?.analysisText;
    let graphData = workflowResult.results?.queryData?.output?.graphData;

    if (graphData) {
      graphData = await convertDataSchema({ context: graphData });
    }

    console.log("DuckDB Query result:", queryResult);
    console.log("DuckDB Analysis text:", analysisText);
    console.log("DuckDB Graph data:", graphData);

    // クエリ結果はあるが分析結果がない場合
    if (queryResult && !analysisText) {
      return {
        text: queryResult,
        data: null,
      };
    }

    // 分析結果がある場合
    if (analysisText) {
      return {
        text: analysisText || "分析が完了しました。",
        data: graphData,
      };
    }

    // どちらもない場合
    return {
      text: "データの取得中にエラーが発生しました。",
      data: null,
    };

  } catch (error) {
    console.error("DuckDBエージェント呼び出しエラー:", error);
    throw new Error("DuckDBエージェントとの通信中にエラーが発生しました");
  }
}
