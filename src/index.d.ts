import phase from "./Phase";
import pipeline from "./Pipeline";
import schedular from "./Scheduler";

interface Planck {
    Phase: typeof phase;
    Pipeline: typeof pipeline; 
    Scheduler: typeof schedular;
}

declare const planck: Planck;
export = planck;