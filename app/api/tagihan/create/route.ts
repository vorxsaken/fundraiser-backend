import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request) {

    const {
        userId,
        judul_tagihan,
        total_tagihan,
        tenggat_waktu,
        status
    } = await req.json();

    try {
        const createTagihan = await database.tagihan.create({
            data: {
                userId: parseInt(userId),
                judul_tagihan,
                total_tagihan: parseInt(total_tagihan),
                tenggat_waktu,
                sisa_tagihan: parseInt(total_tagihan),
                status
            }
        }).catch(err => { throw err });

        return NextResponse.json(createTagihan, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 })
    }
}