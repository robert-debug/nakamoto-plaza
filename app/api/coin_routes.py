from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Coin

coin_routes = Blueprint('coins', __name__)

@coin_routes.route('/', methods=['GET'])
def get_coins():
    coins = Coins.query.all()
    print('########################', coins)
    coins = [coin.to_dict() for coin in coins]
    coin_dict = {}
    i = 0
    while i < len(coins):
        key = coins[i]['id']
        coin_dict[key] = coins[i]
        i += 1
    return coin_dict

@coin_routes.route('/<int:id>', methods=['GET'])
def get_one_coin(id):
    coin = Coin.query.get(id)
    coin_dict = coin.to_dict
    return coin_dict

@coin_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_coin(id):
    coin = Coin.query.get(id)
    body = request.get_json()
    coin.lastaskpricedate = body.get('lastaskpricedate')
    coin.lastaskprice = body.get('lastaskprice')
    coin.circsupply = body.get('circsupply')
    db.session.commit()

