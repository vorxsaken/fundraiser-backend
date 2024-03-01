import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request) {
    const { id_tagihan } = await req.json()

    try {
        const draftTagihan = await database.draftTagihan.findMany({
            where: {
                id_tagihan
            }
        }).catch(err => { throw new Error(err) });
        return NextResponse.json(draftTagihan[0], { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }

}