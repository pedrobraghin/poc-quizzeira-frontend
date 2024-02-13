import { Routes } from "./routes";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import configEnvs from "./config";

export async function middleware(request: NextRequest) {
  try {
    const baseApiUrl = configEnvs.API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");

    if (!token) {
      return NextResponse.redirect(new URL(Routes.login, request.url));
    }

    await fetch(baseApiUrl.concat("/users/me"), {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return NextResponse.next();
  } catch (e) {
    if (e instanceof AxiosError && (e.status === 403 || e.status === 401)) {
      return NextResponse.redirect(new URL(Routes.login, request.url));
    }
    return NextResponse.redirect(new URL(Routes.error, request.url));
  }
}

export const config = {
  matcher: "/area-logada/(.*)",
};
