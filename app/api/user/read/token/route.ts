import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    const tokenBody = verify(token, process.env.SECRET as string);

    return NextResponse.json(tokenBody, { status: 200 });

}