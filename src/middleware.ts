import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const authToken = request.cookies.get("auth_access_token_os");

  if (!authToken?.value) {
    request.nextUrl.pathname = "/auth/login";
    return NextResponse.redirect(request.nextUrl);
  }

  const decodedToken = jwtDecode(authToken.value);

  if (decodedToken?.exp! < Date.now() / 1000) {
    request.cookies.delete("auth_access_token_os");
    request.nextUrl.pathname = "/auth/login";
    return NextResponse.redirect(request.nextUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/carta-notarial/:path*",
    "/apertura-libros/:path*",
    "/permiso-viajes/:path*",
    "/poder-fuera-registros/:path*",
    "/const-domiciliaria/:path*",
    "/escritura-publica/:path*",
    "/transferencia-vehicular/:path*",
    "/asuntos-no-contenciosos/:path*",
    "/administrar-cuentas/:path*",
    "/constitucion-empresa/:path*",
    "/dashboard/administrar-cuentas/mi-cuenta/:path*",
    "/dashboard/administrar-cuentas/todas-las-cuentas/:path*",
  ],
};
