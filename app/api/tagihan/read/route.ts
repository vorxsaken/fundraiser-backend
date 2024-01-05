import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const { token } = await req.json();
    console.log(token);

    try {
        const tagihan = await database.tagihan.findMany({
            where: {
                userId: parseInt(id),
                status: "BELUM_LUNAS"
            }
        }).catch(err => { throw new Error(err) });
        return NextResponse.json(tagihan, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }

}