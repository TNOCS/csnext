export class TimeRange {
    
    public start: number;
    public end: number;
    public aggregation: number;

    constructor() {
        this.start = Number.MAX_VALUE;
        this.end = Number.MIN_VALUE;
        this.aggregation = 86400;
    }

    addTime(time: number)
    {
        if (time > this.end) { this.end = time; }
        if (time < this.start) { this.start = time; }
    }

    public range(): number {
        if (this.start && this.end) { return this.end - this.start; }
        return 1;
    }
}