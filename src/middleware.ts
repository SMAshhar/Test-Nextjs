import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("middleware: ");
//   const jwt = cookies().get("token")?.value;
    let jwt = request.cookies.get("token")?.value  // since request always send cookies as well, this function will replace the above one.

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
    // Now we have to send the decrypted email to get the user data
    const header = new Headers(request.headers)
    header.set("user" , JSON.stringify(payload.email))


    console.log(payload, protectedHeader);

    // We will forward the header data, i.e. email to the GET request. Check the GET function
    return NextResponse.next({
        request: {
            headers: header,
        }
    })
    // return NextResponse.json(payload);

    // NOw we can use the email to get data from the database
  }
}

// See "Matching Paths" below to learn more. Beware of spellings of middleware and config
export const config = {
  matcher: "/api/getuser", // setting middleware to run only on /abou/ pages. Remove it to make it run on every page
};
