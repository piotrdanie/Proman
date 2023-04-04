from flask import Flask, render_template, url_for, request, redirect, flash
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import util
import bcrypt
import re
from os import urandom

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = urandom(24)
load_dotenv()

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')

@app.route('/registration', methods=["GET", "POST"])
def registration():
    if request.method == 'GET':
        return render_template('registration.html')
    else:
        user_name = request.form.get('user_name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        password_hash = util.hash_password(password)
        registration_time = util.get_current_time()
        if password != confirm_password:
            flash("Passwords do not match!")
            return render_template('registration.html', error = 'Passwords do not match')
        else:
            password_hash = util.hash_password(password)

        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',email):
            flash("Username already exists, please choose another one!")
            return render_template('registration.html', error = 'Invalid email address')
        else:
            queries.add_user(user_name, email, password_hash,registration_time)
            return redirect(url_for('index'))


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
