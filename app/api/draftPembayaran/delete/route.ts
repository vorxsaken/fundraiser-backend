import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(req: Request) {
    const { id } = await req.json();

    try {
        const draftTagihan = await database.draftTagihan.delete({
            where: {
                id
            }
        }).catch(err => { throw new Error(err) });
        return NextResponse.json(draftTagihan, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }

}