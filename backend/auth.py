from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import Token, LoginRequest

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

FAKE_USERS_DB = {
    "name@company.com": {
        "username": "name@company.com",
        "full_name": "Test User",
        "email": "name@company.com",
        "hashed_password": "password123",
        "disabled": False,
    }
}

@router.post("/login", response_model=Token)
async def login(form_data: LoginRequest):
    user = FAKE_USERS_DB.get(form_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    if form_data.password != user['hashed_password']:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user['email'], "token_type": "bearer"}
