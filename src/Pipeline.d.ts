import Phase from "./Phase";

declare class Pipeline {
    constructor(debugName?: string)
    insert(phase: Phase) : Pipeline
    insertAfter(phase: Phase, after: Phase): Pipeline
    static readonly Main: Pipeline
    static readonly Startup: Pipeline
}

export = Pipeline;