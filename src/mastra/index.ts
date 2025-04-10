import { Mastra } from '@mastra/core';
import {
  snowflakeDataAgent,
  graphDataGenerator,
  snowflakeAnalysisAgent
} from './agents/snowflake';
import {
  duckdbDataAgent,
  duckdbGraphDataGenerator,
  duckdbAnalysisAgent
} from './agents/duckdb';
import { snowflakeWorkflow } from './workflows/snowflakeWorkflow';
import { duckdbWorkflow } from './workflows/duckdbWorkflow';
import { VercelDeployer } from '@mastra/deployer-vercel';


// Mastraインスタンスの作成とエージェントの登録
export const mastra = new Mastra({
  workflows: {
    snowflakeWorkflow,
    duckdbWorkflow,
  },
  agents: {
    snowflakeDataAgent,
    graphDataGenerator,
    snowflakeAnalysisAgent,
    duckdbDataAgent,
    duckdbGraphDataGenerator,
    duckdbAnalysisAgent,
  },
  deployer: new VercelDeployer({
    teamSlug: 'synoharas-projects',
    projectName: 'mastra',
    token: process.env.VERCEL_TOKEN,
  })
});
