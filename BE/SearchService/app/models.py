from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    description: str
    quality: str
    is_vip_only: bool
    file_url: str