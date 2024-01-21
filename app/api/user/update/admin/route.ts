import { NextResponse } from "next/server";
import { database } from "../../../base";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {

    const {
        id,
        nama,
        alamat,
        no_telp,
        email,
        password,
        foto
    } = await req.json();

    try {
        const encryptedPassword = CryptoJS.AES.encrypt(
            password,
            process.env.SECRET as string
        ).toString();

        const updatedUser = await database.user
            .update({
                where: {
                    id,
                },
                data: {
                    alamat,
                    no_telp,
                    email,
                    password: encryptedPassword,
                    foto,
                    nama,        
                },
            })
            .catch((err) => {
                throw new Error(err);
            });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
