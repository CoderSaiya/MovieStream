from pydantic import BaseModel
from typing import List

class Recommendation(BaseModel):
    user_id: str
    movies: List[str]
