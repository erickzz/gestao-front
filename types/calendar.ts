import type { TransactionResponse } from './transaction';

export interface CalendarEvent {
  date: string;
  transaction: TransactionResponse;
}

export interface CalendarQueryParams {
  dateFrom: string;
  dateTo: string;
  type?: 'INCOME' | 'EXPENSE';
}
