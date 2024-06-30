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

        const o = pembayaran.map(val => ([...val.Tagihan.map(val => ([...val.Pembayaran]))])).flat().flat();
        const oo = pembayaran.map(val => ([...val.Tagihan])).flat();
        const res = []
        
        for (var i = 0; i < o.length; i++) {
            y.push({
                ...o[i],
                Tagihan: { ...oo[i] }
            })
        }

        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}