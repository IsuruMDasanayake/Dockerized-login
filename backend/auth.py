from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas import Token, LoginRequest
from jwt_utils import create_access_token, verify_token
from datetime import timedelta

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

    # Create JWT token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user['email']}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/verify")
async def verify_user(token: str = Depends(oauth2_scheme)):
    """Verify the JWT token and return user info"""
    email = verify_token(token)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = FAKE_USERS_DB.get(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"email": user['email'], "full_name": user['full_name']}
