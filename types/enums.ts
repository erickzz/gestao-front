export type TransactionType = 'INCOME' | 'EXPENSE';

export type TransactionStatus = 'PAID' | 'PENDING';

export type Recurrence = 'NONE' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

export type PaymentMethod =
  | 'PIX'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'CASH'
  | 'BANK_TRANSFER'
  | 'BOLETO'
  | 'OTHER';

export type BudgetAlert = 'ok' | 'warning' | 'danger';
