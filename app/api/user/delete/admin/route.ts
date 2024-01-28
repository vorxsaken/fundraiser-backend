import { NextResponse } from "next/server";
import { database } from "../../../base";

export async function POST(req: Request) {

    const { id } = await req.json();

    try {
        const deleteSiswa = await database.user
            .delete({
                where: {
                    id: parseInt(id),
                    role: 'ADMIN'
                },
            })
            .catch((err) => {
                throw new Error(err);
            });

        return NextResponse.json(deleteSiswa, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
