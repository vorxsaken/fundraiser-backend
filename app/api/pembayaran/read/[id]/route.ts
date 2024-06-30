import { database } from "@/app/api/base";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const pembayaran = await database.user.findMany({
            where: {
                id: parseInt(id)
            },
            include: {
                Tagihan: {
                    include: {
                        Pembayaran: true
                    }
                }
            }
        })

        const y = pembayaran.map(val => {
            const { Tagihan, ...user } = val
            const flat = Tagihan.map(val1 => {
                const { Pembayaran, ...tagihan } = val1
                return Pembayaran.map(val2 => ({ ...val2, Tagihan: { ...tagihan } }))
            })

            return flat
        })

        const res = y.map(val => ({ ...val, nominal: val.total }))
        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}