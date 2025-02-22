import Phase from "./Phase";
import Pipeline from "./Pipeline";
import Scheduler from "./Scheduler";

export type SystemInfo<T extends unknown[]> = {
    readonly system: SystemFn<T>;
    readonly phase: Phase;
    readonly name: string;
    readonly logs: string[];
}


export interface Hooks {
    readonly Hooks: {
        readonly SystemAdd: "SystemAdd";
        readonly SystemRemove: "SystemRemove";
        readonly SystemReplace: "SystemReplace";
        readonly SystemError: "SystemError";

        readonly OuterSystemCall: "OuterSystemCall";
        readonly InnerSystemCall: "InnerSystemCall";
        readonly SystemCall: "SystemCall";

        readonly PhaseAdd: "PhaseAdd";
        readonly PhaseBegan: "PhaseBegan";
    }
    systemAdd: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, systemInfo: SystemInfo<T>) => void;
    systemRemove: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, systemInfo: SystemInfo<T>) => void;
    systemReplace: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, oldSystemInfo: SystemInfo<T>, newSystemInfo: SystemInfo<T>) => void;
    systemCall: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, hookName: "OuterSystemCall" | "InnerSystemCall" | "SystemCall", systemInfo: SystemInfo<T>, nextFn: () => void) => void;
    systemError: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, systemInfo: SystemInfo<T>, error: string) => void;
    phaseAdd: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, phase: Phase) => void;
    phaseBegan: <T extends unknown[] = unknown[]>(scheduler: Scheduler<T>, phase: Phase) => void;
}
type SystemAddHookArgs<T extends unknown[]> = {
    scheduler: Scheduler<T>,
    system: SystemInfo<T>
}
type SystemRemoveHookArgs<T extends unknown[]> = SystemAddHookArgs<T>;
type SystemReplaceHookArgs<T extends unknown[]> = {
    scheduler: Scheduler<T>,
    old: SystemInfo<T>,
    new: SystemInfo<T>
}
type SystemErrorHookArgs<T extends unknown[]> = SystemAddHookArgs<T> & { error: string };
type SystemCallHookArgs<T extends unknown[]> = {
    scheduler: undefined;
    system: SystemInfo<T>;
    nextFn: () => void;
}
type PhaseAddHookArgs<T extends unknown[]> = {
    scheduler: Scheduler<T>;
    phase: Phase;
}
type PhaseBeganHookArgs<T extends unknown[]> = PhaseAddHookArgs<T>;
type HookFunctionMap<T extends unknown[] = unknown[]> = {
    SystemAdd: SystemAddHookArgs<T>;
    SystemRemove: SystemRemoveHookArgs<T>;
    SystemReplace: SystemReplaceHookArgs<T>;
    SystemError: SystemErrorHookArgs<T>;
    OuterSystemCall: SystemCallHookArgs<T>;
    InnerSystemCall: SystemCallHookArgs<T>;
    SystemCall: SystemCallHookArgs<T>;
    PhaseAdd: PhaseAddHookArgs<T>;
    PhaseBegan: PhaseBeganHookArgs<T>;
}
// Utility type to get the correct function type based on the hook name
type HookFunctionArgs<K extends keyof HookFunctionMap, T extends unknown[]> = HookFunctionMap<T>[K];

export type SystemFn<T extends unknown[]> = ((...args: T) => unknown[]) | ((...args: T) => void);

export interface SystemTable<T extends unknown[]> {
    readonly system: SystemFn<T>;
    readonly phase?: Phase
    readonly [key: string]: unknown
}

export type System<T extends unknown[]> = SystemFn<T> | SystemTable<T>;

export interface EventLike {
    connect(callback: (...args: unknown[]) => void): void;
    Connect(callback: (...args: unknown[]) => void): void;
    on(callback: (...args: unknown[]) => void): void;
    On(callback: (...args: unknown[]) => void): void;
} 

export type EventInstance = Instance | EventLike | RBXScriptSignal;


export interface Utils {
    getSystem: <T extends unknown[]>(system: System<T>) => SystemFn<T> | undefined   
    getSystemName: <T extends unknown[]>(system: SystemFn<T>) => string
    isPhase: (phase: Phase) => Phase | undefined
    isPipeline: (pipeline: Pipeline) => Pipeline | undefined
    getEventIdentifier: (instance: EventInstance, event?: EventLike) => string
    isValidEvent: (instance: EventInstance, event?: EventLike) => boolean
}

export interface Plugin {
    build(schedular: Scheduler<unknown[]>): void
}





