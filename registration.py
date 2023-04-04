from flask import Flask, render_template, url_for, request, redirect
from dotenv import load_dotenv
import bcrypt
import util
import re


app = Flask(__name__)
load_dotenv()

@app.route('/registration', methods=["GET", "POST"])
def registration():
    if request.method == 'GET':
        return render_template('registration.html')
    else:
        user_name = request.form['user_name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        regist_time = util.get_current_time()
        if password != confirm_password:
            return render_template('registration.html', error = 'Passwords do not match')
        else:
            password_hash = hash_password(password)

        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',email):
            return render_template('registration.html', error = 'Invalid email address')
        else:
            data_menager.add_user(user_name,email,password_hash,regist_time)
            return redirect('/')

def hash_password(password):
    hashed_bytes_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes_password.decode('utf-8')


def verify_password(password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed_bytes_password)