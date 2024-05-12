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
        
        return NextResponse.json(pembayaran, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}