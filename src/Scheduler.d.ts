import Phase from "./Phase";
import Pipeline from "./Pipeline";
import { Hooks, EventInstance, EventLike, System, Plugin, HookFunctionMap, HookFunctionArgs } from "./types";

declare class Scheduler<T extends unknown[]> {
    /** @hidden */
    _orderedPhases: Phase[]
    Hooks: Hooks["Hooks"]
    insertAfter(phase: Phase, after: Phase | Pipeline): Scheduler<T>
    insertAfter(pipeline: Pipeline, after: Phase | Pipeline): Scheduler<T>
    insert(phase: Phase): Scheduler<T>
    insert(phase: Pipeline): Scheduler<T>
    getDeltaTime(): number
    insert(phase: Phase, instance: EventInstance | EventLike): Scheduler<T>
    insert(pipeline: Pipeline, instance: EventInstance | EventLike): Scheduler<T>
    runAll(): Scheduler<T>
    run(system: System<T>): Scheduler<T>
    run(phase: Phase): Scheduler<T>
    run(pipeline: Pipeline): Scheduler<T>
    setRunCondition(system: System<T>, fn: (...args: T) => boolean): Scheduler<T>
    setRunCondition(phase: Phase, fn: (...args: T) => boolean): Scheduler<T>
    setRunCondition(pipeline: Pipeline, fn: (...args: T) => boolean): Scheduler<T>
    removeSystem(system: System<T>): Scheduler<T>
    replaceSystem(oldSystem: System<T>, newSystem: System<T>): Scheduler<T>
    editSystem(system: System<T>, phase: Phase): Scheduler<T>
    addSystem(system: System<T>, phase?: Phase): Scheduler<T>
    addSystems(...systems: System<T>[]): Scheduler<T>
    addPlugin(plugin: Plugin): Scheduler<T>
    /** @hidden */
    _addHook<K extends keyof HookFunctionMap>(hook: K, fn: (info: HookFunctionArgs<K, T>) => void): void
    constructor(...args: T)
}

export = Scheduler;