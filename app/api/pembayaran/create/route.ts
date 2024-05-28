import { NextResponse } from "next/server";
import { database } from "../../base";
import type { midtransNotifType } from "@/lib/types";

export async function POST(req: Request) {
    const {
        currency,
        fraud_status,
        gross_amount,
        merchant_id,
        metadata,
        order_id,
        payment_amounts,
        payment_type,
        status_code,
        status_message,
        transaction_id,
        transaction_status,
        transaction_time,
        va_numbers
    } = await req.json() as midtransNotifType


    if (transaction_status === "pending") return NextResponse.json({"message": "status is pending, not resolved"}, { status: 201 });
    if (payment_type === "gopay") return NextResponse.json({"message": "success for midtrans test notifications"}, { status: 200 });

    const tagihanId = parseInt(order_id.split('-')[0])

    try {
        console.log('virtual number : ', va_numbers[0].va_number)
        console.log('metadata draft tagihan : ', metadata.draft_tagihan_id)
        
        if(transaction_status != 'expire') {
            await database.pembayaran.create({
                data: {
                    metode_bayar: payment_type,
                    nominal: parseInt(gross_amount),
                    bank: va_numbers[0].bank,
                    currency,
                    fraud_status,
                    gross_amount,
                    merchant_id,
                    order_id,
                    tagihanId,
                    userId: metadata.id_user,
                    payment_type,
                    status_code,
                    status_message,
                    transaction_status,
                    transaction_id,
                    transaction_time,
                    va_number: va_numbers[0].va_number,
                }
            }).catch(err => { throw err })
    
            const draftTagihan = await database.draftTagihan.update({
                where: {
                    id: metadata.draft_tagihan_id
                },
                data: {
                    status: 1
                }
            }).catch(err => { throw err })
    
            const tagihan = await database.tagihan.findUnique({
                where: {
                    id: tagihanId
                },
                select: {
                    sisa_tagihan: true
                }
            }).catch(err => { throw err }) as any
    
            const calcSisaTagihan = tagihan.sisa_tagihan - parseInt(gross_amount)
    
            const updateTagihan = await database.tagihan.update({
                where: {
                    id: tagihanId
                },
                data: {
                    sisa_tagihan: calcSisaTagihan
                }
            }).catch(err => { throw err }) as any
    
            if (updateTagihan.sisa_tagihan <= 0) {
                await database.tagihan.update({
                    where: {
                        id: tagihanId
                    },
                    data: {
                        status: 'LUNAS'
                    }
                }).catch(err => { throw err })
            }
            
            return NextResponse.json(draftTagihan, { status: 200 })
        }

        await database.draftTagihan.delete({
            where: {
                id: metadata.draft_tagihan_id
            }
        })

        return NextResponse.json({message: 'draft tagihan deleted'}, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}
