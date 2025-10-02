export interface ExportPayload {
  format: 'csv' | 'json' | 'xlsx'
}

export interface ExportOrdersPayload extends ExportPayload {
  from: Date
  to: Date
}
