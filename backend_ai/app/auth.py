import os
import jwt
from fastapi import HTTPException, Security, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

JWT_SECRET       = os.getenv("JWT_SECRET", "")
JWT_ALGORITHM    = "HS256"
FRAMELENS_APP_KEY = os.getenv("FRAMELENS_APP_KEY", "framelens")

security = HTTPBearer()


async def verify_token(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    """
    Verifikasi JWT token dari pilargroup secara lokal.
    Token sudah mengandung payload lengkap termasuk 'apps'.
    """
    token = credentials.credentials

    if not JWT_SECRET:
        raise HTTPException(
            status_code=500,
            detail="JWT_SECRET belum dikonfigurasi di .env",
        )

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
            options={"verify_aud": False},
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token sudah expired, silakan login ulang.")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Token tidak valid: {str(e)}")

    apps = payload.get("apps", [])
    if FRAMELENS_APP_KEY not in apps:
        raise HTTPException(
            status_code=403,
            detail="Akun kamu tidak punya akses ke Framelens.",
        )

    return payload