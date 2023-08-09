import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import {cookies} from 'next/headers'

export const POST = async (request: NextRequest) => {
  console.log('post function run')
  const body = await request
    .json()
    .catch(() => NextResponse.json({ message: "Please give proper response" }));

    console.log(body.email, body.password)
  if (body.email === "admin" && body.password === "admin") {
    // JWT token job now. Using jose library
    // install by "yarn add bcryptjs jose"  and "yarn add @types/bcryptjs"
    const secret = new TextEncoder().encode(
        process.env.SECRET_KEY_TEXT,
      )
      const alg = 'HS256'
      
      const jwt = await new jose.SignJWT({ email: body.email })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(body.email)
        .setAudience(body.email)
        .setExpirationTime('2h')
        .sign(secret)
      
      console.log(jwt)
      
      // setting http only token in cookies
      cookies().set("token", jwt, {
        httpOnly: true,
      })

    //   return NextResponse.redirect('admin')
      return NextResponse.json({message:'You are authorized'})
  } else {
    console.log(body.email, body.password)
  }

  return NextResponse.json({ message: 'Authorization failed' });
};
