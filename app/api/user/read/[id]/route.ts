import { database } from "@/app/api/base";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await database.user.findUnique({
            where: {
                id: parseInt(id)
            }
        }).catch(err => { throw err });
        
        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}