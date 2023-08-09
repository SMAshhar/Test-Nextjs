import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const GET = async (request:NextRequest) => {

  const headers = JSON.parse(request.headers.get("user") as string)
  // access cookies and get token
  // validate token
  // decrypt email
  // fetch user data from database via email.
  // we can transfer this whole to middlwware. CHeck it there.

  const jwt = cookies().get("token")?.value;
  console.log("token", jwt);

  const secret = new TextEncoder().encode(process.env.SECRET_KEY_TEXT);

  // we will decode using the same key which we stored in the env file.

  if (!jwt) {
    return NextResponse.redirect("/login");
  } else {

    // copied from repo. this will varify if the token is correct.
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
      issuer: "admin",
      audience: "admin",
    });

    console.log(payload, protectedHeader)
    return NextResponse.json(payload);

    // NOw we can use the email to get data from the database
  }

};
