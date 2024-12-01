import pika
import json
from .models import Movie

def process_movie_created_event(ch, method, properties, body):
    event_data = json.loads(body)
    new_movie = Movie(**event_data)
    print(f"New movie added: {new_movie.title}")

def start_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="rabbitmq"))
    channel = connection.channel()

    channel.queue_declare(queue="movie_created")
    channel.basic_consume(queue="movie_created", on_message_callback=process_movie_created_event, auto_ack=True)

    print("Listening for events on queue 'movie_created'...")
    channel.start_consuming()