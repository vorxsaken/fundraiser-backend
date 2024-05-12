import { database } from "@/app/api/base";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {

    const id = params.id ;

    try {
        let tagihan = await database.user.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                Tagihan: true
            }
        }).catch(err => { throw new Error(err) });
        
        return NextResponse.json(tagihan, { status: 200 });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}