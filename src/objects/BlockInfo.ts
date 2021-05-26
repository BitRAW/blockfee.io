export class BlockInfo {
    ts: string
    block_nr: number
    total_fee: number
    avg_fee: number
    min_fee: number
    perc_25: number
    median_fee: number
    perc_75: number
    max_fee: number

    constructor(obj: any) {
      this.ts=obj.ts;
      this.block_nr=obj.block_nr;
      this.avg_fee=obj.avg_fee;
      this.total_fee=obj.total_fee;
      this.min_fee=obj.min_fee;
      this.perc_25=obj.perc_25;
      this.median_fee=obj.median_fee;
      this.perc_75=obj.perc_75;
      this.max_fee=obj.max_fee;
    }
}
