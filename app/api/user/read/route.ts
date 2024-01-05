import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(request: Request) {

    try {
        const user = await database.user.findMany({}).catch((err) => {
            throw new Error(err);
        });
        
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
