export class BlockInfo {
    ts: number
    block_nr: number
    total_fee: number
    avg_fee: number
    min_fee: number
    perc_10: number
    perc_25: number
    median_fee: number
    perc_75: number
    perc_90: number
    max_fee: number

    constructor(ts: number,
        block_nr?: number,
        total_fee?: number,
        avg_fee?: number,
        min_fee?: number,
        perc_10?: number,
        perc_25?: number,
        median_fee?: number,
        perc_75?: number,
        perc_90?: number,
        max_fee?: number,
    ) {
        this.ts = ts;
        this.block_nr = block_nr;
        this.total_fee = total_fee;
        this.avg_fee = avg_fee;
        this.min_fee = min_fee;
        this.perc_10 = perc_10;
        this.perc_25 = perc_25;
        this.median_fee = median_fee;
        this.perc_75 = perc_75;
        this.perc_90 = perc_90;
        this.max_fee = max_fee;
    }

}