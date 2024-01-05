import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request) {

    const {
        userId,
        judulTagihan,
        totalTagihan,
        tenggatWaktu,
    } = await req.json();

    const dateTime = new Date(tenggatWaktu).toISOString();

    try {
        const createTagihan = await database.tagihan.create({
            data: {
                userId,
                judul_tagihan: judulTagihan,
                total_tagihan: totalTagihan,
                tenggat_waktu: dateTime
            }
        }).catch(err => { throw err });

        return NextResponse.json(createTagihan, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 })
    }
}