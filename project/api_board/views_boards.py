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
    return queries.get_table_order_by_element("boards", "id")

@api_board_bp.route("/boards/<int:board_id>/", methods=["GET"])
@json_response
def get_board(board_id: int):
    return queries.get_everything_by_id('boards','id',board_id)

@api_board_bp.route("/boards/", methods=["POST"])
@json_response
def create_board():
    board_title = request.get_json()["title"]
    if (request.get_json()["status"] == 2):
        board_status = int(request.get_json()["status"])
        user_id = int(request.get_json()["user_id"])
    else:
        board_status = 1
        user_id = None
        
    board_id = queries.add_board(board_title, user_id, board_status)
    return {"title": board_title, "user_id": user_id, "type": board_status, "http_code": 201, "id": board_id[0]["id"]}

@api_board_bp.route("/boards/<int:board_id>", methods=["DELETE"])
@json_response
def delete_board(board_id: int):
    return queries.delete_board(board_id)

@api_board_bp.route("/boards/<int:board_id>/updata", methods=["PUT"])
@json_response
def updata_board(board_id: int):
    print(request.json)
    board_title = request.json["title"]
    queries.updata_board(board_id,board_title)
    return {"title": board_title, "http_code": 201}