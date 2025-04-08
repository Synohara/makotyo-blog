/*
 * Snowflake Data Intelligence Workflow
 * 
 * このファイルはMCP経由でSnowflakeに接続し、
 * データを取得して高度な分析レポートを生成するワークフローを定義します。
 */
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPConfiguration } from "@mastra/mcp";

// 環境変数からSnowflake接続情報を取得
const SNOWFLAKE_ACCOUNT = process.env.SNOWFLAKE_ACCOUNT || "EHJDYCR-KP59909";
const SNOWFLAKE_WAREHOUSE = process.env.SNOWFLAKE_WAREHOUSE || "COMPUTE_WH";
const SNOWFLAKE_USER = process.env.SNOWFLAKE_USER || "MAKOTYO";
const SNOWFLAKE_PASSWORD = process.env.SNOWFLAKE_PASSWORD;
const SNOWFLAKE_ROLE = process.env.SNOWFLAKE_ROLE || "SYSADMIN";
const SNOWFLAKE_DATABASE = process.env.SNOWFLAKE_DATABASE || "SUMO";
const SNOWFLAKE_SCHEMA = process.env.SNOWFLAKE_SCHEMA || "CHANCO";

// パスワードが設定されていない場合はエラーを表示
if (!SNOWFLAKE_PASSWORD) {
  console.error("環境変数SNOWFLAKE_PASSWORDが設定されていません。");
}

// MCPサーバーの設定
const mcp = new MCPConfiguration({
  id: "snowflake-mcp",
  servers: {
    "mcp-snowflake": {
      "command": "npx",
      "args": [
        "-y",
        "@makotyo/mcp-snowflake"
      ],
      "env": {
        "SNOWFLAKE_ACCOUNT": SNOWFLAKE_ACCOUNT,
        "SNOWFLAKE_USER": SNOWFLAKE_USER,
        "SNOWFLAKE_PASSWORD": SNOWFLAKE_PASSWORD,
        "SNOWFLAKE_WAREHOUSE": SNOWFLAKE_WAREHOUSE,
        "SNOWFLAKE_DATABASE": SNOWFLAKE_DATABASE,
        "SNOWFLAKE_SCHEMA": SNOWFLAKE_SCHEMA,
      }
    }
  },
});

export const snowflakeDataAgent = new Agent({
  name: "Graph Data Generator",
  instructions: `
        あなたは大相撲データの生成に特化したエージェントです。
        基本的には必ずreadQueryを使用してデータを取得し、
        取得したデータを省略せずに伝えてください。

        またクエリできるデータの情報は以下です。
               利用可能なデータベース: SUMO
        利用可能なスキーマ: CHANCO

        利用可能なテーブル:
        - BANZUKE: 力士の番付情報

        【BANZUKEテーブル】
        力士の番付情報（1983年1月から2024年7月までのデータを収録）

        - ID: 力士の固有ID
        - RIKISHI: 力士名
        - RANK: 番付の頭文字（階級と位置）
          * Y = 横綱（最高位）
          * O = 大関
          * S = 関脇
          * K = 小結
          * M = 前頭
          * J = 十両
          * Sd = 幕下
          * 数字は順位を表す（例：Y1e = 横綱東1枚目）
          * e = 東, w = 西
          * HD = 怪我などによる休場
          * YO = 横綱審議委員会からの注意
        - HEYA: 部屋名（所属する相撲部屋）
        - SHUSSHIN: 出身地
        - BIRTH_DATE: 生年月日
        - HEIGHT: 身長（cm）
        - WEIGHT: 体重（kg）
        - BASHO: 場所（年月形式、例：2023.01）
        - PREV: 前場所の番付
        - PREV_W: 前場所の勝ち数、つまりBASHOが2023.01の場合、PREV_Wは2022年11月場所の勝ち数であることに注意
        - PREV_L: 前場所の負け数、つまりBASHOが2023.01の場合、PREV_Lは2022年11月場所の負け数であることに注意

        日付型のデータはJSON形式に変換できないので、日付型のデータを取得する際は、
        TO_VARCHAR関数を使用して文字列型に変換してください。例：
        TO_VARCHAR(BIRTH_DATE, 'YYYY-MM-DD') as BIRTH_DATE
        勝率を計算する場合、力士の休場などで試合数が0になる場合があるので、
        CASE文を使用して分母が0にならないようにしてください。
        RANKを元にデータをフィルタリングする場合、示しているのはRANKの頭文字のみであることに注意してください。
        `,
  model: openai("gpt-4o-mini"),
  tools: {
    ...(await mcp.getTools()),
  },
});

export const graphDataGenerator = new Agent({
  name: "Graph Data Generator",
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
  `,
  model: openai("gpt-4o-mini"),
});

export const snowflakeAnalysisAgent = new Agent({
    name: "Snowflake Data Analyst",
    instructions: `
        あなたはデータ分析のスペシャリストです。
        与えられたデータを深く分析し、重要なインサイトを提供してください。

        テキストには以下を含めてください：
        - データの概要
        - 主要な傾向や特徴
        - インサイトの詳細な解説
        - 画像は表示できないため、テキストでの説明に留めてください。
      `,
    model: openai("gpt-4o-mini"),
  });
