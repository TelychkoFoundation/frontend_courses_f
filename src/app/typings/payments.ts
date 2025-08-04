export interface ICreateLinkPayload {
  amount: number;
  ccy: 980;
  redirectUrl: string;
  webhookUrl: string;
  merchantPaymInfo: {
    reference: string;
    destination: string;
  };
}

export interface ICreateLinkPayloadResponseData {
  invoiceId: string;
  pageUrl: string;
}

export type MonobankInvoiceStatus =
  | "created"
  | "processing"
  | "success"
  | "failure"
  | "cancelled";

export interface MonobankWebhookBase {
  invoiceId: string;
  status: MonobankInvoiceStatus;
  amount: number;
  ccy: number; // ISO code: 980 = UAH
  createdDate: string; // ISO string
  modifiedDate: string; // ISO string
  reference: string; // формат: "{userId}_{lessonId}" або кастомний
  destination: string; // наприклад: "Оплата за урок #lessonId"
}

export interface MonobankWebhookCreatedOrProcessing
  extends MonobankWebhookBase {
  status: "created" | "processing";
  finalAmount?: number; // з'являється на "processing"
}

export interface MonobankWebhookSuccess extends MonobankWebhookBase {
  status: "success";
  finalAmount: number;
  payMethod: string;
  paymentInfo: {
    rrn: string;
    approvalCode: string;
    tranId: string;
    terminal: string;
    bank: string;
    paymentSystem: string;
    country: string;
    fee: number;
    paymentMethod: string;
    maskedPan: string;
  };
}

export type MonobankWebhookPayload =
  | MonobankWebhookCreatedOrProcessing
  | MonobankWebhookSuccess;
