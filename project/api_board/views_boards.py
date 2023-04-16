from flask import Flask, render_template, request, redirect, url_for, jsonify, json, Request
from api_board import api_board_bp
from util.util import json_response
from util import queries


@api_board_bp.route("/boards", methods=["GET"])
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_everything('boards')

@api_board_bp.route("/boards/<int:board_id>/", methods=["GET"])
@json_response
def get_board(board_id: int):
    return queries.get_everything_by_id('boards','id',board_id)

@api_board_bp.route("/boards/", methods=["POST"])
@json_response
def create_board():
    board_title = request.get_json()["title"]
    queries.add_board(board_title)
    return {"title": board_title, "http_code": 201}

@api_board_bp.route("/boards/<int:board_id>", methods=["DELETE"])
@json_response
def delete_board(board_id: int):
    return queries.delete_board(board_id)