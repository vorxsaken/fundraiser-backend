import { NextResponse } from "next/server";
import { database } from "../../../base";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {

    const {
        id,
        nis,
        kelas,
        tingkat,
        angkatan,
        alamat,
        no_telp,
        email,
        password,
        foto,
        nama
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
                    nis,
                    kelas,
                    tingkat,
                    angkatan,
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
        console.log('id', id)
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}
