import { database } from "@/app/api/base";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const { id } = await req.json();

    try {
        const deleteTagihan = await database.tagihan.delete({
            where: {
                id: parseInt(id)
            }
        }).catch(err => { throw new Error(err) });

        return NextResponse.json(deleteTagihan, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }

} 