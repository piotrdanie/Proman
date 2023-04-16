from functools import wraps
from flask import jsonify, flash, render_template, session
import bcrypt
from datetime import datetime
import re
from util import util, queries



def json_response(func):
    """
    Converts the returned dictionary into a JSON response
    :param func:
    :return:
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        return jsonify(func(*args, **kwargs))

    return decorated_function

def get_current_time():
    return datetime.now().strftime("%Y-%m-%d %H:%M")

def hash_password(password):
    hashed_bytes_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes_password.decode('utf-8')


def verify_password(password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed_bytes_password)


def password_check(password, confirm_password):
    # SpecialSym =['$', '@', '#', '%']
    val = True
    
    if password != confirm_password:
        val = False
        flash("passwords do not match!")

    if len(password) < 4:
        flash('length should be at least 4')
        val = False
         
    if len(password) > 8:
        flash('length should be not be greater than 8')
        val = False
         
    if not any(char.isdigit() for char in password):
        flash('Password should have at least one numeral')
        val = False
         
    if not any(char.isupper() for char in password):
        flash('Password should have at least one uppercase letter')
        val = False
         
    if not any(char.islower() for char in password):
        flash('Password should have at least one lowercase letter')
        val = False
         
    # if not any(char in SpecialSym for char in password):
    #     flash('Password should have at least one of the symbols $@#')
    #     val = False
    
    if val is False:
        return False
    else:
        return True


def email_check(email):
    val = True
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',email):
        flash("Email is not corect!")
        val = False

    emails = [email['email'] for email in queries.users_emails() if email]
    if email in emails: 
        flash("Email is already registered!")
        val = False

    if val is False:
        return False
    else:
        return True


def is_logged():
    if 'email' in session:
        return True
    else:
        return False
