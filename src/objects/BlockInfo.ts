export class BlockInfo {
    ts: string
    block: number
    total_fee: number
    avg_fee: number
    min_fee: number
    perc_10: number
    perc_25: number
    median_fee: number
    perc_75: number
    perc_90: number
    max_fee: number

    constructor(obj: any) {
      this.ts=obj.ts;
      this.block=obj.block;
      this.avg_fee=obj.avgFee;
      this.total_fee=obj.totalFee;
      this.min_fee=obj.minFee;
      this.perc_10=obj.perc10;
      this.perc_25=obj.perc25;
      this.median_fee=obj.medianFee;
      this.perc_75=obj.perc75;
      this.perc_90=obj.perc90;
      this.max_fee=obj.maxFee;
    }
}
