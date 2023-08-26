export interface MeterReadingErrorField {
  startDay: boolean;
  startTime: boolean;
  endDay: boolean;
  endTime: boolean;
}

export type MeterReadingErrorFieldKey = keyof MeterReadingErrorField;

type ExcludeType = Exclude<MeterReadingErrorFieldKey, "startDay" | "startTime">;

export type NoEndTime = Omit<MeterReadingErrorField, "endTime">;

type RecoredType = Record<
  MeterReadingErrorFieldKey,
  { id: number; isValid: boolean }
>;
