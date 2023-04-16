from flask import Blueprint

app = Blueprint(
    "app",
    __name__,
    static_folder="static",
    static_url_path="/app/static",
    template_folder="templates",
)

from app import views