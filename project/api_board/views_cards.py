from flask import Flask, render_template, request, redirect, url_for, jsonify, json, Request
from api_board import api_board_bp
from util.util import json_response
from util import queries


@api_board_bp.route("/boards/columns/cards/<int:card_id>/", methods=["GET"])
@json_response
def get_card(card_id: int):
    return queries.get_everything_by_id('cards','id',card_id)



@api_board_bp.route("/boards/<int:board_id>/columns/cards/", methods=["GET"])
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_everything_by_id('cards','board_id',board_id)

@api_board_bp.route("/boards/column/<int:column_id>/cards/", methods=["GET"])
@json_response
def get_cards_for_columns(column_id: int):
    """
    All cards that belongs to a column
    :param column_id: id of the parent column
    """
    return queries.get_everything_by_id('cards','column_id',column_id)


@api_board_bp.route("/boards/columns/cards/", methods=["POST"])
@json_response
def create_card():
    # data = request.get_json()
    column_id = request.get_json()["column_id"]
    card_title = request.get_json()["title"]
    card_order = len(queries.get_everything_by_id('cards','column_id',column_id)) + 1
    print(card_order)
    queries.add_card(column_id, card_title, card_order)
    # return data, 201
    return {"title": card_title, "http_code": 201}

@api_board_bp.route("/boards/columns/cards/<int:card_id>", methods=["DELETE"])
@json_response
def delete_card(card_id: int):
    return queries.delete(card_id)
    # return queries.delete('cards',card_id)
    