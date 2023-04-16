from flask import Blueprint

api_board_bp = Blueprint(
    "api_board_bp",
    __name__,
    static_folder="static",
    static_url_path="/api_board/static",
    template_folder="templates",
    url_prefix="/api",
)

from api_board import views_boards, views_cards, views_columns