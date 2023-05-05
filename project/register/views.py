from flask import Flask, render_template, request, redirect, url_for, flash, session
from register import register_bp
from login import views
from util import util, queries


@register_bp.route('/registration', methods=["GET", "POST"])
def registration():
    if util.is_logged():
        flash('You are already logged in')
        return redirect(url_for('app.index'))
    if request.method == 'GET':
        return render_template('register/registration.html')
    else:
        user_name = request.form.get('user_name')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        registration_time = util.get_current_time()

        if util.password_check(password, confirm_password):
            password_hash = util.hash_password(password)
        else:
            return render_template('register/registration.html')
        
        if util.email_check(email):
            queries.add_user(user_name, email, password_hash,registration_time)
            views.login()
            return redirect(url_for('app.index'))
        else:
            return render_template('register/registration.html')


            