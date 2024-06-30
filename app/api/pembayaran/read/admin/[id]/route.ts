import { database } from "@/app/api/base";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const pembayaran = await database.pembayaran.findMany({
            where: {
                tagihanId: parseInt(id)
            },
            include: {
                Tagihan: {
                    select: {
                        judul_tagihan: true
                    }
                }
            }
        })
        
        const res = pembayaran.map(val => ({...val, nominal: val.total, metode_bayar: val.bank}))
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}