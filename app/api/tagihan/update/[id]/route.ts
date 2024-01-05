import { NextResponse } from "next/server";
import { database } from "@/app/api/base";

export async function POST(req: Request) {
    const {
        id,
        judulTagihan,
        totalTagihan,
        status,
        tenggatWaktu,
    } = await req.json();

    try {
        const createTagihan = await database.tagihan.update({
            where: {
                id
            },
            data: {
                judul_tagihan: judulTagihan,
                total_tagihan: totalTagihan,
                status,
                tenggat_waktu: tenggatWaktu
            }
        }).catch(err => { throw new Error(err) });

        return NextResponse.json(createTagihan, { status: 200 });

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}