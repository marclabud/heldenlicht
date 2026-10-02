export interface paths {
  "/agent/run": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            [key: string]: any;
          };
        };
      };
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["ExampleAIResponse"];
          };
        };
      };
    };
  };

}

export interface webhooks {}

export interface components {
  schemas: {
    ExampleAIResponse: {
      /** @description A concise summary of the generated output. */
      summary: string;
      /** @description Key insights or bullets extracted by the AI. */
      insights: string[];
      /** @description The model's confidence rating between 0.0 and 1.0. */
      confidence_score: number;
    };

  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export interface $defs {}

export interface operations {}
