from typing import List
from .models import Movie

MOVIES = [
    Movie(id=1, title="Inception", description="Sci-fi thriller", quality="high", is_vip_only=False, file_url="aws-url-1"),
    Movie(id=2, title="The Matrix", description="Cyberpunk action", quality="high", is_vip_only=True, file_url="aws-url-2"),
]

def search_movies(query: str) -> List[Movie]:
    query_lower = query.lower()
    return [movie for movie in MOVIES if query_lower in movie.title.lower() or query_lower in movie.description.lower()]
