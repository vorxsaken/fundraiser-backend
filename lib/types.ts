export type midtransResponse = {
    currency: string,
    expiry_time: string,
    fraud_status: string,
    gross_amount: string,
    merchant_id: string,
    order_id: string,
    payment_type: string,
    status_code: string,
    status_message: string,
    transaction_id: string,
    transaction_status: string,
    transaction_time: string,
    va_numbers: {
        bank: string,
        va_number: string
    }[]
}

export type midtransNotifType = {
    va_numbers: {
        va_number: string,
        bank: string
    }[],
    transaction_time: string,
    transaction_status: string,
    transaction_id: string,
    status_message: string,
    status_code: string,
    signature_key: string,
    settlement_time: string,
    payment_type: string,
    payment_amounts: string,
    order_id: string,
    merchant_id: string,
    gross_amount: string,
    fraud_status: string,
    currency: string,
    metadata: {
        id_user: number
        draft_tagihan_id: number
    }
}