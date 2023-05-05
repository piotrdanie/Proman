from flask import Flask, url_for, render_template
from dotenv import load_dotenv
import mimetypes
import os
import login, api_board, register, app as main_app
from util import insert_data


mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = os.urandom(24)
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()



# register the blueprints
app.register_blueprint(main_app.app)
app.register_blueprint(login.login_bp)
app.register_blueprint(register.register_bp)
app.register_blueprint(api_board.api_board_bp)
insert_data.add_10_users()


def main():
    app.run(debug=True)  

    # Serving the favicon
    with app.app_context():
        #app.add_url_rule('/favicon.ico', redirect_to=url_for('app.static', filename='favicon/favicon.ico'))
        return

if __name__ == '__main__':
    main()