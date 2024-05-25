import { NextResponse } from "next/server";
import { database } from "@/app/api/base";

export async function POST(req: Request) {
    const {
        id,
        judul_tagihan,
        total_tagihan,
        tenggat_waktu,
        status
    } = await req.json();

    try {
        const createTagihan = await database.tagihan.update({
            where: {
                id
            },
            data: {
                judul_tagihan,
                total_tagihan,
                status,
                tenggat_waktu
            }
        }).catch(err => { throw new Error(err) });

        return NextResponse.json(createTagihan, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })
    }
}
