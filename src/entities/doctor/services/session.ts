import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { DoctorEntity, SessionEntity, userToSession } from "../domain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(
  session: string | undefined = ""
): Promise<SessionEntity> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionEntity;
  } catch (error) {
    throw error;
  }
}

async function addSession(doctor: DoctorEntity) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionData = userToSession(doctor, expiresAt.toISOString());
  const session = await encrypt(sessionData);
  const cookiesStore = await cookies();

  cookiesStore.set("session", session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

const getSessionCookies = () => cookies().then((c) => c.get("session")?.value);
const verifySession = async (getCookies = getSessionCookies) => {
  try {
    const cookie = await getCookies();
    const session = await decrypt(cookie);
    if (!session.doctorName) {
      redirect("/sign-in");
    }
    return { isAuth: true, session: session };
  } catch (error: any) {
    redirect("/sign-in");
  }
};

export const sessionService = { addSession, deleteSession, verifySession };
