export class BlockInfo {
    ts: string
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

    constructor(arr: Array<any>) {
      [
        this.ts,
        this.block_nr,
        this.total_fee,
        this.avg_fee,
        this.min_fee,
        this.perc_10,
        this.perc_25,
        this.median_fee,
        this.perc_75,
        this.perc_90,
        this.max_fee,
      ] = arr;
    }
}
