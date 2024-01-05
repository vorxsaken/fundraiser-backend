import { database } from "../../base";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    
    const {
        nama,
        nis,
        kelas,
        tingkat,
        angkatan,
        alamat,
        no_telp,
        email,
        password,
        role
    } = await req.json();

    if (
        !nama ||
        !nis ||
        !tingkat ||
        !angkatan ||
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
                    nis,
                    kelas,
                    tingkat,
                    angkatan,
                    alamat,
                    no_telp,
                    email,
                    role,        
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
