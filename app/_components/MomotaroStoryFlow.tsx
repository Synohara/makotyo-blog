import React from 'react';

const StoryNode = ({ title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Arrow = () => (
  <div className="flex items-center justify-center my-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L12 20" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 13L12 20L5 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const MomotaroStoryFlow = () => {
  const storyNodes = [
    {
      title: "誕生",
      description: "おばあさんが川で見つけた大きな桃から、元気な男の子が生まれる"
    },
    {
      title: "成長",
      description: "桃太郎は、すくすくと育ち、たくましい若者になる"
    },
    {
      title: "出発",
      description: "鬼ヶ島の鬼退治を決意し、キビ団子を持って旅立つ"
    },
    {
      title: "仲間との出会い",
      description: "道中でイヌ、サル、キジと出会い、キビ団子を分け与えて仲間にする"
    },
    {
      title: "戦い",
      description: "鬼ヶ島で鬼たちと激しい戦いを繰り広げる"
    },
    {
      title: "勝利",
      description: "鬼の首領を降参させ、村人たちの財宝を取り戻す"
    }
  ];

  return (
    <div className="max-w-md mx-auto my-8 p-4">
      <div className="flex flex-col items-center gap-2">
        {storyNodes.map((node, index) => (
          <React.Fragment key={node.title}>
            <StoryNode {...node} />
            {index < storyNodes.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MomotaroStoryFlow;