import { NextResponse } from "next/server";
import { database } from "../../base";

export async function POST(request: Request) {
    const { id } = await request.json()

    try {
        const user = await database.user.findUnique({ where: { id } }).catch((err) => {
            throw new Error(err);
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
