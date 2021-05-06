from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Transfer, VaultCoin

transfer_routes = Blueprint('transfers', __name__)

@transfer_routes.route('</int:user_id>', methods=['GET'])
@login_required
def get_tranfers(user_id):
    transfers = Transfers.query.filter_by(sender_id=user_id).all()
    transfered = Transfers.query.filter_by(receiver_id=user_id).all()
    senders_coins = [transfers.to_dict() for transfer in transfers]
    receivers_coins = [transfered.to_dict() for transfer in transfered]
    transfer_dict = {}
    i = 0
    while i < len(transfers):
        key = transfers[i]['id']
        transfer_dict[key] = transfers[i]
        i += 1
    while i < len(transfered):
        key = transfered[i]['id']
        transfer_dict[key] = transfered[i]
        i += 1
    return transfer_dict

@transfer_routes.route('</int:user_id>/coins/</int:coin_id', methods=['GET'])
@login_required
def get_one_coin(user_id, coin_id):
    transfers = Transfer.query.filter_by(sender_id=user_id).filter_by(coin_id=coin_id).all()
    transfered = Transfers.query.filter_by(receiver_id=user_id).filter_by(coin_id=coin_id).all()
    senders_coins = [transfers.to_dict() for transfer in transfers]
    receivers_coins = [transfered.to_dict() for transfer in transfered]
    transfer_dict = {}
    i = 0
    while i < len(transfers):
        key = transfers[i]['id']
        transfer_dict[key] = transfers[i]
        i += 1
    while i < len(transfered):
        key = transfered[i]['id']
        transfer_dict[key] = transfered[i]
        i += 1
    return transfer_dict


@transfer_routes.route('', methods=['POST'])
@login_required

