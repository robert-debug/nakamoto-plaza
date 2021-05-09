from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Fiat

fiat_routes = Blueprint('fiats', __name__)

@fiat_routes.route('/', methods=['GET'])
def get_coins():
    fiats = Fiat.query.all()
    fiats = [fiat.to_dict() for fiat in fiats]
    fiat_dict = {}
    i = 0
    while i < len(fiats):
        key = fiats[i]['id']
        fiat_dict[key] = fiats[i]
        i += 1
    return fiat_dict

@fiat_routes.route('/<int:id>', methods=['GET'])
def get_one_fiat(id):
    fiat = Fiat.query.get(id)
    fiat_dict = fiat.to_dict
    return fiat_dict
