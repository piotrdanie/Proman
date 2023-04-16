from flask import Flask, render_template, request, redirect, url_for, session, flash
from util import util, queries, data_manager
from login import login_bp
import os


@login_bp.route("/", methods=["GET", "POST"])
def login():
    """
    """
    if util.is_logged():
        flash('You are already logged in')
        return redirect(url_for('app.index'))

    if request.method == 'POST':
        email = request.form.get('email')
        user_data = queries.user_data(email)
        if queries.user_data(email) and \
        util.verify_password(request.form['password'], user_data['password']):
            session['email'] = email
            session['user_id'] = user_data['id']
            session['user_name'] = user_data['user_name']
            return redirect(url_for('app.index'))
        else:
            flash('Wrong email or password.')
            return render_template('login/login.html')
    else:
        return render_template('login/login.html')

@login_bp.route('/logout')
def logout():
    session.pop('email', None)
    session.pop('user_id', None)
    session.pop('user_name',None)

    return redirect(url_for('app.index'))


