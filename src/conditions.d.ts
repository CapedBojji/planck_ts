import { EventInstance, EventLike } from "./types";

type Condition = () => boolean;

declare const timePassed: (time: number) => Condition;

declare const exported: {
    timePassed: (time: number) => Condition;
    runOnce: () => Condition;
    onEvent: <T extends unknown[]>(instance: EventInstance | EventLike, event: string | EventLike) => LuaTuple<[Condition, IterableFunction<T>, () => void]>;
    isNot: (condition: Condition) => Condition;
    cleanupCondition: (condition: Condition) => void
}
export = exported