import { NextResponse } from "next/server";
import { database } from "../../base";
import type { midtransResponse } from "@/lib/types";

export async function POST(req: Request) {

    const {
        id_tagihan: tagihanId,
        id_user,
        nominal,
        metode_pembayaran,
        principal,
    } = await req.json();

    const order_id = `${tagihanId}-${Date.now()}`

    try {
        const createDraftTagihan = await database.draftTagihan.create({
            data: {
                id_tagihan: parseInt(tagihanId),
                nominal: parseInt(nominal),
                metode_pembayaran,
                virtual_number: "",
                principal,
                status: 0
            }
        }).catch(err => { throw err });

        const body = {
            "payment_type": "bank_transfer",
            "transaction_details": {
                "order_id": order_id,
                "gross_amount": parseInt(nominal)
            },
            "bank_transfer": {
                "bank": principal
            },
            "metadata": {
                "draft_tagihan_id": createDraftTagihan.id,
                "id_user": id_user
            }
        }

        const createMidtransPayment = await fetch('https://api.sandbox.midtrans.com/v2/charge', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic U0ItTWlkLXNlcnZlci1xTmh0WHE2dFdteXZlNEltSFAxaG1wYmE6"
            },
            body: JSON.stringify(body)
        })

        const payment = await createMidtransPayment.json() as midtransResponse

        const updateDraftTagihan = await database.draftTagihan.update({
            where: {
                id: createDraftTagihan.id
            },
            data: {
                virtual_number: payment.va_numbers[0].va_number
            }
        })

        console.log(updateDraftTagihan);
        return NextResponse.json(updateDraftTagihan, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 })
    }
}