import { Mastra } from '@mastra/core';
import {
  snowflakeDataAgent,
  graphDataGenerator,
  snowflakeAnalysisAgent
} from './agents/snowflake';
import { snowflakeWorkflow } from './workflows/snowflakeWorkflow';
import { VercelDeployer } from '@mastra/deployer-vercel';


// Mastraインスタンスの作成とエージェントの登録
export const mastra = new Mastra({
  workflows: {
    snowflakeWorkflow,
  },
  agents: {
    snowflakeDataAgent,
    graphDataGenerator,
    snowflakeAnalysisAgent,
  },
  deployer: new VercelDeployer({
    teamSlug: 'synoharas-projects',
    projectName: 'mastra',
    token: '***REMOVED***'
  })
});
