import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // URLからファイル名を取得
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    // ファイル名が指定されていない場合はエラー
    if (!filename) {
      return NextResponse.json(
        { error: 'ファイル名が指定されていません' },
        { status: 400 }
      );
    }

    // ファイルパスを構築（componentsディレクトリ内のJSONファイルを読み込む）
    const filePath = path.join(process.cwd(), 'app', 'components', `${filename}.json`);

    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `ファイルが見つかりません: ${filename}.json` },
        { status: 404 }
      );
    }

    // ファイルを読み込む
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // 成功レスポンスを返す
    return NextResponse.json(data);
  } catch (error) {
    console.error('チャットデータの読み込みエラー:', error);
    return NextResponse.json(
      { error: 'チャットデータの読み込み中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
