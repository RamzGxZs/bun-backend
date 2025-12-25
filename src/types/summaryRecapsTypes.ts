export type RecapRange = "daily" | "monthly" | "yearly";

export type RecapScope = "current" | "all";

export interface RecapSummaryMetrics {
  totalTransactions: number;
  totalSales: number;
  totalPay: number;
  totalReturn: number;
  averageTicket: number;
  netSales: number;
}

export interface RecapBucket extends RecapSummaryMetrics {
  bucket: string;
  bucketDate: string;
}

export interface RecapAvailableRange {
  start: string | null;
  end: string | null;
}

export interface RecapComparison {
  overall: RecapSummaryMetrics;
  shareOfTransactions: number | null;
  shareOfTotalSales: number | null;
}

export interface RecapSummaryResponse {
  range: RecapRange;
  scope: RecapScope;
  timeframe: RecapAvailableRange;
  summary: RecapSummaryMetrics;
  data: RecapBucket[];
  availableRange: RecapAvailableRange | null;
  comparison: RecapComparison | null;
}
