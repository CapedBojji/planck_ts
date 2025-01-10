declare class Phase {
    constructor(debugName?: string)
    static readonly PreStartup: Phase
    static readonly Startup: Phase
    static readonly PostStartup: Phase
    static readonly PreRender: Phase
    static readonly PreAnimation: Phase
    static readonly PreSimulation: Phase
    static readonly PostSimulation: Phase
    static readonly First: Phase
    static readonly PreUpdate: Phase
    static readonly Update: Phase
    static readonly PostUpdate: Phase
    static readonly Last: Phase
}

export = Phase;