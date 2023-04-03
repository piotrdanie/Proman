from flask import Flask, render_template, url_for
from dotenv import load_dotenv
from util.util import json_response
import mimetypes
from data_manager import queries
import os
import user
import board


mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()

# register the blueprints
app.register_blueprint(user.user_bp)
app.register_blueprint(board.board_bp)



@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


def main():
    
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
