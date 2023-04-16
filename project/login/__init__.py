from flask import Blueprint

login_bp = Blueprint(
    "login_bp",
    __name__,
    static_folder="static",
    static_url_path="/login/static",
    template_folder="templates",
    url_prefix="/login/",
)

from login import views