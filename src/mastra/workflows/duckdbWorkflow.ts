import { Workflow, Step } from "@mastra/core";
import { z } from "zod";
import { mastra } from "../index";


export const duckdbWorkflow = new Workflow({
    name: "DuckDB Analysis",
    triggerSchema: z.object({
        userQuery: z.string().describe("ユーザーからの質問"),
    }),
});


const queryDataStep = new Step({
    id: "queryData",
    inputSchema: z.object({
        userQuery: z.string().describe("ユーザーからの質問"),
    }),
    outputSchema: z.object({
        result: z.any().describe("クエリ結果"),
        graphData: z.any().describe("視覚化データ"),
    }),
    execute: async ({ context }) => {
        console.log(`context: ${JSON.stringify(context)}`);
        const userQuery = context.inputData.userQuery;
        console.log("Step 1: Received user query:", userQuery);

        const schema = z.object({
            data: z.array(z.record(z.string(), z.any())).describe("視覚化するデータ"),
            visualizationType: z.enum(["bar", "line", "pie", "table"]).describe("視覚化の種類"),
            title: z.string().optional().describe("視覚化のタイトル"),
            xAxis: z.string().optional().describe("X軸に使用するカラム名"),
            yAxis: z.string().optional().describe("Y軸に使用するカラム名"),
        });

        const agent = mastra.getAgent("duckdbDataAgent");
        const graphDataGenerator = mastra.getAgent("duckdbGraphDataGenerator");
        try {
            const response = await agent.generate(
                [
                    { role: "user", content: userQuery }
                ]
            );
            const result = response.text;
            console.log("Query tool result:", result);

            const graphDataResponse = await graphDataGenerator.generate(
                [
                    { role: "user", content: result }
                ],
                {
                    output: schema
                }
            );
            const graphData = graphDataResponse.object;
            console.log("Graph data tool result:", graphData);

            return {
                result: result,
                graphData: graphData
            };
        } catch (error) {
            console.error("Error executing query:", error);
            return {
                result: null
            };
        }
    }
});

const analyzeDataStep = new Step({
    id: "analyzeData",
    inputSchema: z.object({
        result: z.any().describe("クエリ結果"),
    }),
    outputSchema: z.object({
        analysisText: z.string().describe("分析テキスト"),
    }),
    execute: async ({ context }) => {
        console.log(`context: ${JSON.stringify(context)}`);
        const result = context.inputData.result as string;
        console.log("Step 2: Received query result:", result);

        if (!result) {
            console.log("No query result to analyze");
            return {
                analysisText: "分析するデータがありません。"
            };
        }

        const analysisPrompt = `以下のデータを分析してください:\n${result}`;

        const agent = mastra.getAgent("duckdbAnalysisAgent");
        try {
            console.log("Sending to analysis agent:", analysisPrompt);
            const response = await agent.generate(analysisPrompt);
            console.log("Analysis agent response:", response);


            const analysisText = response.text;

            return {
                analysisText
            };
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Error analyzing data:", error);
            return {
                analysisText: `データの分析中にエラーが発生しました: ${errorMessage}`
            };
        }
    }
});


duckdbWorkflow
    .step(queryDataStep, {
        variables: {
            userQuery: { step: "trigger", path: "userQuery" }
        }
    })
    .then(analyzeDataStep, {
        variables: {
            result: { step: queryDataStep, path: "result" }
        }
    })
    .commit();

export default duckdbWorkflow;
