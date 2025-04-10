/*
 * DuckDB Data Intelligence Workflow
 * 
 * このファイルはMCP経由でDuckDBに接続し、
 * 個人データを取得して分析レポートを生成するワークフローを定義します。
 */
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPConfiguration } from "@mastra/mcp";

const mcp = new MCPConfiguration({
  id: "duckdb-mcp",
  servers: {
    "mcp-duckdb": {
      "url": new URL(process.env.MCP_DUCKDB_SERVER_PATH || "http://localhost:8081"),
    }
  },
});

export const duckdbDataAgent = new Agent({
  name: "DuckDB Data Agent",
  instructions: `
        あなたは個人データの取得に特化したエージェントです。
        基本的には必ずqueryを使用してデータを取得し、
        取得したデータを省略せずに伝えてください。

        また、クエリできるデータの情報は個人に関するデータです。
        テーブル構造や利用可能なデータについては、まずSHOW TABLESを実行して
        利用可能なテーブルを確認し、次にDESCRIBE [テーブル名]を実行して
        テーブルの構造を確認してください。

        日付型のデータはJSON形式に変換できないので、日付型のデータを取得する際は、
        文字列型に変換してください。例：
        CAST(date_column AS VARCHAR) as date_column

        勝率などの計算を行う場合、分母が0になる可能性がある場合は、
        CASE文を使用して分母が0にならないようにしてください。
        `,
  model: openai("gpt-4o-mini"),
  tools: {
    ...(await mcp.getTools()),
  },
});

export const duckdbGraphDataGenerator = new Agent({
  name: "DuckDB Graph Data Generator",
  instructions: `
    与えられたデータを以下の形式に変換してください：
      data: [...], // 視覚化するデータの配列（必須）
      visualizationType: "bar", "line", "pie", "table"
      title: "タイトル", // オプション
      xAxis: "X軸のカラム名", // オプション
      yAxis: "Y軸のカラム名" // オプション

      データの特性に応じて適切な視覚化タイプを選択してください：
      - 比較データ → 棒グラフ（bar）
      - 時系列データ → 折れ線グラフ（line）
      - 構成比 → 円グラフ（pie）
      - 詳細データ → テーブル（table）
  `,
  model: openai("gpt-4o-mini"),
});

export const duckdbAnalysisAgent = new Agent({
    name: "DuckDB Data Analyst",
    instructions: `
        あなたは個人データ分析のスペシャリストです。
        与えられたデータを深く分析し、重要なインサイトを提供してください。

        テキストには以下を含めてください：
        - データの概要
        - 主要な傾向や特徴
        - インサイトの詳細な解説
        - 画像は表示できないため、テキストでの説明に留めてください。
      `,
    model: openai("gpt-4o-mini"),
  });
