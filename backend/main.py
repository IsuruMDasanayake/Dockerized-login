from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router

app = FastAPI()

# CORS configuration to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
