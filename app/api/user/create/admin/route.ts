import { database } from "../../../base";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    
    const {
        nama,
        alamat,
        no_telp,
        email,
        password,
    } = await req.json();

    if (
        !nama ||
        !alamat ||
        !no_telp ||
        !email ||
        !password
    ) {
        return NextResponse.json(
            { message: "semua field harus dilengkapi" },
            { status: 400 }
        );
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET as string
    ).toString();

    try {
        const user = await database.user
            .create({
                data: {
                    nama,
                    alamat,
                    no_telp,
                    email,
                    password: encryptedPassword,
                },
            })
            .catch((err) => {
                throw new Error(err);
            });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
