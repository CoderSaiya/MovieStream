from fastapi import FastAPI, HTTPException
from .search_engine import search_movies
from .event_consumer import start_consumer
import threading

app = FastAPI()

@app.get("/search")
def search(query: str):
    results = search_movies(query)
    if not results:
        raise HTTPException(status_code=404, detail="No movies found")
    return results

threading.Thread(target=start_consumer, daemon=True).start()