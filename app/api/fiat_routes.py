from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Fiat


@fiat_routes.route('', methods=['GET'])
def get_coins():
    fiats = fiats.query.all()
    fiats = [fiat.to_dict() for fiat in fiats]
    fiat_dict = {}
    i = 0
    while i < len(fiats):
        key = fiats[i]['id']
        fiat_dict[key] = fiats[i]
        i += 1
    return fiat_dict

@fiat_routes.route('</int:id>', methods=['GET'])
def get_one_fiat(id):
    fiat = fiat.query.get(id)
    fiat_dict = fiat.to_dict
    return fiat_dict
