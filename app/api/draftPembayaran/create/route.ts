import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request) {

    const {
        id_tagihan: tagihanId,
        nominal,
        metode_pembayaran,
        principal,
    } = await req.json();

    try {
        const body = {
            "payment_type": "bank_transfer",
            "transaction_details": {
                "order_id": tagihanId,
                "gross_amount": parseInt(nominal)
            },
            "bank_transfer": {
                "bank": principal
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

        const createDraftTagihan = await database.draftTagihan.create({
            data: {
                id_tagihan: parseInt(tagihanId),
                nominal: parseInt(nominal),
                metode_pembayaran,
                principal
            }
        }).catch(err => { throw err });

        return NextResponse.json(createDraftTagihan, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 })
    }
}