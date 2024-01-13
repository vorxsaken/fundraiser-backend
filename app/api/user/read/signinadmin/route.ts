import { NextResponse } from "next/server";
import { database } from "@/app/api/base";
import CryptoJS from "crypto-js";
import { sign } from 'jsonwebtoken';

const EXPIRE_TIME = 60 * 60 * 24 * 7 * 4;

function signJWT(payload: any) {
  return sign(payload, process.env.SECRET as string, { expiresIn: EXPIRE_TIME })
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const user = await database.user
      .findMany({
        where: {
          nama: username,
          role: 'ADMIN'
        },
      })

    if (!user.length) {
      return NextResponse.json({ message: 'username tidak ditemukan' }, { status: 401 });
    }

    const decrypt = CryptoJS.AES.decrypt(
      user[0].password,
      process.env.SECRET as string
    );
    const originalText = decrypt.toString(CryptoJS.enc.Utf8);
    const comparePassword = password === originalText;

    if (comparePassword) {
      const { id, role  } = user[0];
      const JWT = signJWT({ id, role });

      return new Response(JSON.stringify({ message: 'now authorized', JWT }), {
        status: 200
      });
    }

    return NextResponse.json({ message: 'password salah' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
