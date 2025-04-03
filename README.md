# makotyo-blog

個人ブログプロジェクト

## 概要

このプロジェクトは、Next.jsとNextraを使用した個人ブログです。Snowflakeデータベースと連携して、大相撲データの分析と視覚化を行う機能も含まれています。

## ローカル開発

### 必要条件

- Node.js 18以上
- npm または pnpm

### セットアップ

1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd makotyo-blog
```

2. 依存関係のインストール

```bash
npm install
# または
pnpm install
```

3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定します：

```
# Snowflake接続情報
SNOWFLAKE_ACCOUNT=<アカウント>
SNOWFLAKE_WAREHOUSE=<ウェアハウス>
SNOWFLAKE_USER=<ユーザー>
SNOWFLAKE_PASSWORD=<パスワード>
SNOWFLAKE_ROLE=<ロール>
SNOWFLAKE_DATABASE=<データベース>
SNOWFLAKE_SCHEMA=<スキーマ>

# MCPサーバーのパス
MCP_SNOWFLAKE_SERVER_PATH=<パス>
```

4. 開発サーバーの起動

```bash
npm run dev
# または
pnpm dev
```

## Vercelへのデプロイ

### 準備

1. Vercelアカウントを作成し、このリポジトリをインポートします。

2. 環境変数の設定

Vercelのダッシュボードで、以下の環境変数を設定します：

- `SNOWFLAKE_ACCOUNT`: Snowflakeアカウント
- `SNOWFLAKE_WAREHOUSE`: Snowflakeウェアハウス
- `SNOWFLAKE_USER`: Snowflakeユーザー
- `SNOWFLAKE_PASSWORD`: Snowflakeパスワード（機密情報）
- `SNOWFLAKE_ROLE`: Snowflakeロール
- `SNOWFLAKE_DATABASE`: Snowflakeデータベース
- `SNOWFLAKE_SCHEMA`: Snowflakeスキーマ
- `MCP_SNOWFLAKE_SERVER_PATH`: MCPサーバーのパス（Vercel環境では`/opt/mcp-snowflake-server`を推奨）

### デプロイ

Vercelダッシュボードから「Deploy」ボタンをクリックしてデプロイします。

## 注意点

- Snowflakeの認証情報は機密情報です。`.env.local`ファイルをGitにコミットしないように注意してください。
- Vercel環境では、`MCP_SNOWFLAKE_SERVER_PATH`の値は`/opt/mcp-snowflake-server`に設定されています。
- Vercelにデプロイする際は、`vercel.json`ファイルの設定に従ってビルドとインストールが行われます。
