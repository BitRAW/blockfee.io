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
        let i = 0
        this.ts = arr[i++];
        this.block_nr = arr[i++];
        this.total_fee = arr[i++];
        this.avg_fee = arr[i++];
        this.min_fee = arr[i++];
        this.perc_10 = arr[i++];
        this.perc_25 = arr[i++];
        this.median_fee = arr[i++];
        this.perc_75 = arr[i++];
        this.perc_90 = arr[i++];
        this.max_fee = arr[i++];
    }



}