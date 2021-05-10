from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Vault, VaultCoin

vault_coin_routes = Blueprint('vault_coins', __name__)
@vault_coin_routes.route('<int:vault_id>', methods=['GET'])
@login_required
def get_coins(user_id):
    vault = Vault.query.filter_by(user_id=sender_id).first()
    vault = vault.to_dict()
    vault_coins = VaultCoin.query.filter_by(vault_id=vault['id']).all()
    vault_coins = [coin.to_dict() for coin in vault_coins]
    coin_dict = {}
    i = 0
    while i < len(coins):
        key = coins[i]['id']
        coin_dict[key] = coins[i]
        i += 1
    return coin_dict


@vault_coin_routes.route('/<int:vault_id>/coins/<int:coin_id>', methods=['GET'])
@login_required
def get_one_coin(user_id, coin_id):
    vault = Vault.query.filter_by(user_id=sender_id).first()
    vault = vault.to_dict()
    vault_coin = VaultCoin.query.filter_by(vault_id=vault['id']).filter_by(coin_id=coin_id).first()
    coin_dict = vault_coin.to_dict
    return coin_dict
