import { database } from "@/app/api/base";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const user = await database.user.findMany({
            where: {
                role: "ADMIN"
            }
        }).catch(err => { throw err });
        
        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}