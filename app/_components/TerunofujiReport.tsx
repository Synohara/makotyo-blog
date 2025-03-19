'use client';
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const TerunofujiReport = () => {
  // ランク推移データ
  const rankProgression = [
    { "basho": "2013.09", "rank": "J11w", "rankValue": 0 },
    { "basho": "2013.11", "rank": "J3e", "rankValue": 0 },
    { "basho": "2014.01", "rank": "J1w", "rankValue": 0 },
    { "basho": "2014.03", "rank": "M10w", "rankValue": 1 },
    { "basho": "2014.05", "rank": "M9e", "rankValue": 1 },
    { "basho": "2014.07", "rank": "M6e", "rankValue": 1 },
    { "basho": "2014.09", "rank": "M1e", "rankValue": 1 },
    { "basho": "2014.11", "rank": "M3w", "rankValue": 1 },
    { "basho": "2015.01", "rank": "M2e", "rankValue": 1 },
    { "basho": "2015.03", "rank": "S1e", "rankValue": 3 },
    { "basho": "2015.05", "rank": "S1e", "rankValue": 3 },
    { "basho": "2015.07", "rank": "O2w", "rankValue": 4 },
    { "basho": "2015.09", "rank": "O1e", "rankValue": 4 },
    { "basho": "2015.11", "rank": "O1e", "rankValue": 4 },
    { "basho": "2016.01", "rank": "O1w", "rankValue": 4 },
    { "basho": "2016.03", "rank": "O2w", "rankValue": 4 },
    { "basho": "2016.05", "rank": "O2w", "rankValue": 4 },
    { "basho": "2016.07", "rank": "O2w", "rankValue": 4 },
    { "basho": "2016.09", "rank": "O1w", "rankValue": 4 },
    { "basho": "2016.11", "rank": "O2w", "rankValue": 4 },
    { "basho": "2017.01", "rank": "O2e", "rankValue": 4 },
    { "basho": "2017.03", "rank": "O1w", "rankValue": 4 },
    { "basho": "2017.05", "rank": "O1e", "rankValue": 4 },
    { "basho": "2017.07", "rank": "O1e", "rankValue": 4 },
    { "basho": "2017.09", "rank": "O2e", "rankValue": 4 },
    { "basho": "2017.11", "rank": "S2e", "rankValue": 3 },
    { "basho": "2018.01", "rank": "M10e", "rankValue": 1 },
    { "basho": "2018.03", "rank": "J5w", "rankValue": 0 },
    { "basho": "2018.05", "rank": "J8e", "rankValue": 0 },
    { "basho": "2018.07", "rank": "Ms6e", "rankValue": -1 },
    { "basho": "2018.09", "rank": "Ms47e", "rankValue": -1 },
    { "basho": "2018.11", "rank": "Sd27w", "rankValue": -2 },
    { "basho": "2019.01", "rank": "Sd88w", "rankValue": -2 },
    { "basho": "2019.03", "rank": "Jd48w", "rankValue": -3 },
    { "basho": "2019.05", "rank": "Sd49e", "rankValue": -2 },
    { "basho": "2019.07", "rank": "Ms59e", "rankValue": -1 },
    { "basho": "2019.09", "rank": "Ms27e", "rankValue": -1 },
    { "basho": "2019.11", "rank": "Ms10w", "rankValue": -1 },
    { "basho": "2020.01", "rank": "J13w", "rankValue": 0 },
    { "basho": "2020.03", "rank": "J3e", "rankValue": 0 },
    { "basho": "2020.07", "rank": "M17e", "rankValue": 1 },
    { "basho": "2020.09", "rank": "M1e", "rankValue": 1 },
    { "basho": "2020.11", "rank": "K1e", "rankValue": 2 },
    { "basho": "2021.01", "rank": "S1e", "rankValue": 3 },
    { "basho": "2021.03", "rank": "S1e", "rankValue": 3 },
    { "basho": "2021.05", "rank": "O2w", "rankValue": 4 },
    { "basho": "2021.07", "rank": "O1e", "rankValue": 4 },
    { "basho": "2021.09", "rank": "Y1w", "rankValue": 5 },
    { "basho": "2021.11", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.01", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.03", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.05", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.07", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.09", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2022.11", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2023.01", "rank": "Y1eYO", "rankValue": 5 },
    { "basho": "2023.03", "rank": "Y1eYO", "rankValue": 5 },
    { "basho": "2023.05", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2023.07", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2023.09", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2023.11", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2024.01", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2024.03", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2024.05", "rank": "Y1e", "rankValue": 5 },
    { "basho": "2024.07", "rank": "Y1e", "rankValue": 5 }
  ];

  // ミルストーン（主要な出来事）
  const milestones = [
    { "basho": "2015.07", "event": "大関に昇進" },
    { "basho": "2017.11", "event": "怪我により大関から陥落" },
    { "basho": "2019.03", "event": "最下位の序二段まで降下" },
    { "basho": "2020.07", "event": "幕内に復帰" },
    { "basho": "2021.05", "event": "再度大関に昇進" },
    { "basho": "2021.09", "event": "横綱に昇進" }
  ];

  // 年間平均勝率
  const yearlyWinRates = [
    { "year": 2013, "avgWinRate": "82.8" },
    { "year": 2014, "avgWinRate": "57.8" },
    { "year": 2015, "avgWinRate": "71.1" },
    { "year": 2016, "avgWinRate": "42.8" },
    { "year": 2017, "avgWinRate": "46.7" },
    { "year": 2018, "avgWinRate": "10.0" },
    { "year": 2019, "avgWinRate": "89.3" },
    { "year": 2020, "avgWinRate": "80.3" },
    { "year": 2021, "avgWinRate": "83.3" },
    { "year": 2022, "avgWinRate": "71.1" },
    { "year": 2023, "avgWinRate": "59.1" },
    { "year": 2024, "avgWinRate": "38.4" }
  ];

  // 優秀な成績の場所（勝率70%以上）
  const excellentPerformances = [
    { "basho": "2013.09", "winRate": "85.7", "wins": 6, "losses": 1 },
    { "basho": "2013.11", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2014.03", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2015.05", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2015.07", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2015.09", "winRate": "73.3", "wins": 11, "losses": 4 },
    { "basho": "2015.11", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2017.05", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2017.07", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2019.05", "winRate": "100.0", "wins": 7, "losses": 0 },
    { "basho": "2019.07", "winRate": "85.7", "wins": 6, "losses": 1 },
    { "basho": "2019.09", "winRate": "85.7", "wins": 6, "losses": 1 },
    { "basho": "2019.11", "winRate": "85.7", "wins": 6, "losses": 1 },
    { "basho": "2020.01", "winRate": "100.0", "wins": 7, "losses": 0 },
    { "basho": "2020.03", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2020.09", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2021.01", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2021.03", "winRate": "73.3", "wins": 11, "losses": 4 },
    { "basho": "2021.05", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2021.07", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2021.09", "winRate": "93.3", "wins": 14, "losses": 1 },
    { "basho": "2021.11", "winRate": "86.7", "wins": 13, "losses": 2 },
    { "basho": "2022.01", "winRate": "100.0", "wins": 15, "losses": 0 },
    { "basho": "2022.03", "winRate": "73.3", "wins": 11, "losses": 4 },
    { "basho": "2022.07", "winRate": "80.0", "wins": 12, "losses": 3 },
    { "basho": "2022.09", "winRate": "73.3", "wins": 11, "losses": 4 },
    { "basho": "2023.07", "winRate": "93.3", "wins": 14, "losses": 1 },
    { "basho": "2024.03", "winRate": "86.7", "wins": 13, "losses": 2 }
  ];

  // 各階級での場所数
  const rankCounts = [
    { "rank": "Y", "count": 18, "name": "横綱" },
    { "rank": "O", "count": 16, "name": "大関" },
    { "rank": "S", "count": 8, "name": "関脇" },
    { "rank": "K", "count": 1, "name": "小結" },
    { "rank": "M", "count": 14, "name": "前頭" },
    { "rank": "J", "count": 8, "name": "十両" }
  ];

  // 欠場した場所
  const absences = [
    "2018.09", "2018.11", "2019.01", "2019.03",
    "2023.01", "2023.03", "2023.05", "2023.11", "2024.01"
  ];

  // ランクごとの色
  const rankColors = {
    "Y": "#7B68EE", // 横綱 - 藤色（紫）
    "O": "#CD5C5C", // 大関 - 赤
    "S": "#4682B4", // 関脇 - 青
    "K": "#2E8B57", // 小結 - 深緑
    "M": "#DAA520", // 前頭 - 黄金
    "J": "#808080", // 十両 - 灰色
    "Ms": "#A9A9A9", // 幕下 - 薄灰色
    "Sd": "#D3D3D3", // 三段目 - より薄い灰色
    "Jd": "#F0F0F0"  // 序二段 - 最も薄い灰色
  };

  // 階級ごとの場所数のためのPIEチャートカラー
  const COLORS = ['#7B68EE', '#CD5C5C', '#4682B4', '#2E8B57', '#DAA520', '#808080'];

  return (
    <div className="w-full p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">照ノ富士（Terunofuji）キャリア分析レポート</h1>

      <div className="w-full mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">基本情報</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-medium">誕生日: 1991年11月29日</p>
            <p className="font-medium">キャリア: 65場所</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="font-medium">出身: モンゴル（ハラホリン）</p>
            <p className="font-medium">所属部屋: 伊勢ヶ濱部屋</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <p className="text-lg">
            照ノ富士 勇輝（てるのふじ ゆうき）は、史上3人目の序二段からの横綱に昇進した力士であり、
            大きな怪我を乗り越えた稀有なカムバック物語を持つ現役横綱である。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ランク推移</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rankProgression}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="basho" tickFormatter={(value) => value.split('.')[0]} />
                <YAxis
                  domain={[-3, 5]}
                  ticks={[-3, -2, -1, 0, 1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {
                    const labels = {
                      "-3": "Jd", "-2": "Sd", "-1": "Ms", "0": "J",
                      "1": "M", "2": "K", "3": "S", "4": "O", "5": "Y"
                    };
                    return labels[value];
                  }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const rankLabels = {
                      "-3": "序二段", "-2": "三段目", "-1": "幕下", "0": "十両",
                      "1": "前頭", "2": "小結", "3": "関脇", "4": "大関", "5": "横綱"
                    };
                    return [rankLabels[String(value)], "階級"];
                  }}
                  labelFormatter={(label) => `場所: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rankValue"
                  name="階級"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                />
                {/* マイルストーンを表示する縦線 */}
                {milestones.map((milestone, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={(data) => data.basho === milestone.basho ? data.rankValue : null}
                    stroke="red"
                    strokeWidth={2}
                    name={milestone.event}
                    dot={{ r: 6, fill: "red" }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <h3 className="font-medium text-lg">主要なマイルストーン:</h3>
            <ul className="list-disc pl-6 mt-2">
              {milestones.map((milestone, index) => (
                <li key={index} className="mb-1">
                  <span className="font-semibold">{milestone.basho}:</span> {milestone.event}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">年間平均勝率</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearlyWinRates}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "勝率"]} />
                <Legend />
                <Bar
                  dataKey="avgWinRate"
                  name="年間平均勝率"
                  fill="#8884d8"
                  radius={[5, 5, 0, 0]}
                >
                  {yearlyWinRates.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={parseFloat(entry.avgWinRate) >= 70 ? "#4CAF50" :
                        parseFloat(entry.avgWinRate) >= 50 ? "#2196F3" : "#F44336"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>
              <span className="font-semibold">注目ポイント:</span> 2018年の勝率が極端に低いのは怪我の影響。
              2019-2021年は回復期の高勝率を記録し、史上3人目となる序二段からの横綱昇進を果たした。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">階級別場所数</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rankCounts}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {rankCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}場所`, '場所数']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="font-semibold">階級別キャリア:</p>
            <p>照ノ富士のキャリアの約3分の1は横綱として過ごしており、キャリアの途中で大きく階級を下げた後、再び上位に返り咲いた珍しい例である。</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">優秀な成績（勝率70%以上）</h2>
          <div className="h-72 overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border">場所</th>
                  <th className="py-2 px-4 border">勝率</th>
                  <th className="py-2 px-4 border">成績</th>
                </tr>
              </thead>
              <tbody>
                {excellentPerformances.map((perf, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-2 px-4 border">{perf.basho}</td>
                    <td className="py-2 px-4 border">{perf.winRate}%</td>
                    <td className="py-2 px-4 border">{perf.wins}勝{perf.losses}敗</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p>
              <span className="font-semibold">注目:</span> 照ノ富士は通算で{excellentPerformances.length}回の優秀な成績を収めており、
              特に2022年1月場所の完全優勝（15-0）が最高記録。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">怪我と復帰の物語</h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">欠場した場所</h3>
            <ul className="list-disc pl-6">
              {absences.map((basho, index) => (
                <li key={index}>{basho}</li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-500">
              <p>2018年〜2019年初頭にかけての長期欠場は両膝の大怪我によるもので、本来であれば引退を検討する程の深刻な状況だった。</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">復活のストーリー</h3>
            <p className="mb-2">照ノ富士は2019年3月、序二段（相撲の最下位に近い階級）まで転落。しかし、わずか1年半後の2020年9月には再び上位に返り咲き、2021年9月には横綱に昇進した。</p>
            <p className="mb-2">この序二段から横綱への昇進は、相撲史上でも3人目という極めて珍しい例である。</p>
            <p>怪我を乗り越えての復活は、相撲界だけでなく、日本のスポーツ史に残る偉業として評価されている。</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">照ノ富士の相撲キャリア総括</h2>
        <div className="mb-4">
          <h3 className="font-medium text-lg">強さの特徴</h3>
          <p>
            照ノ富士は身長192cm、体重177kgの巨体を活かした押し相撲を得意とするが、
            四股名の「照」は元横綱・照國に由来し、「富士」は四股名の由来となったモンゴルの聖なる山にちなんでいる。
            寄り切りや押し出しなどの前に出る相撲を基本としながらも、技術的にも高い水準を持ち、多彩な決まり手を駆使する。
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-medium text-lg">キャリアの特筆点</h3>
          <ul className="list-disc pl-6">
            <li>2015年7月：史上3人目となるモンゴル出身大関に昇進</li>
            <li>2017年11月：膝の怪我により大関陥落</li>
            <li>2019年3月：序二段まで降下し、引退の危機</li>
            <li>2020年7月：再び幕内に復帰</li>
            <li>2021年5月：再び大関に昇進（史上初めての大関再昇進）</li>
            <li>2021年9月：横綱に昇進（史上3人目の序二段からの横綱昇進）</li>
            <li>2022年1月：初の全勝優勝（15勝0敗）達成</li>
          </ul>
        </div>
        <div className="p-4 bg-indigo-50 rounded">
          <p className="text-lg">
            照ノ富士の相撲人生は、怪我による挫折と奇跡的な復活のドラマを象徴している。
            序二段から横綱という史上稀なキャリアパスは、彼の不屈の精神と卓越した相撲技術を示すものである。
            キャリア初期から現在まで、その勝率の変動からは怪我との闘いや復活の道のりが明確に読み取れる。
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerunofujiReport;
