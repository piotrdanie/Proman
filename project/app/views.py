from flask import Flask, render_template, request, redirect, url_for, session
from util import util
from app import app
import os


@app.route("/", methods=["GET"])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    if util.is_logged():
        user_name = session['user_name']
        user_email = session['email']
        user_id = session['user_id']
    else:
        user_name = None
        user_email = None
        user_id = None
    return render_template('app/index.html', user_name = user_name, user_id = user_id)

@app.route("/design/")
def design():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('app/design.html')