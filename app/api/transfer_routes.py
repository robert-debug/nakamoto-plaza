from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Transfer, VaultCoin, Vault, User, db
import datetime

transfer_routes = Blueprint('transfers', __name__)

@transfer_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_tranfers(user_id):
    transfers = Transfer.query.filter_by(sender_id=user_id).all()
    transfered = Transfer.query.filter_by(receiver_id=user_id).all()
    senders_coins = [transfer.to_dict() for transfer in transfers]
    receivers_coins = [transfer.to_dict() for transfer in transfered]
    senders_coins.extend(receivers_coins)
    for coin in senders_coins:
        user = User.query.get(coin['sender_id'])
        user2 = User.query.get(coin['receiver_id'])
        user = user.to_dict()
        user2= user2.to_dict()
        coin['sender'] = user
        coin['receiver'] = user2
    for coin in receivers_coins:
        user = User.query.get(coin['receiver_id'])
        user = user.to_dict()
    senders_coins.extend(receivers_coins)
    transfer_dict = {}
    i = 0
    while i < len(senders_coins):
        key = senders_coins[i]['id']
        transfer_dict[key] = senders_coins[i]
        i += 1

    return transfer_dict

@transfer_routes.route('/<int:user_id>/coins/<int:coin_id>', methods=['GET'])
@login_required
def get_one_coin(user_id, coin_id):
    transfers = Transfer.query.filter_by(sender_id=user_id).filter_by(coin_id=coin_id).all()
    transfered = Transfer.query.filter_by(receiver_id=user_id).filter_by(coin_id=coin_id).all()
    senders_coins = [transfers.to_dict() for transfer in transfers]
    receivers_coins = [transfer.to_dict() for transfer in transfered]
    transfer_dict = {}
    i = 0
    while i < len(transfers):
        key = transfers[i]['id']
        transfer_dict[key] = senders_coins[i]
        i += 1
    while i < len(transfered):
        key = transfered[i]['id']
        transfer_dict[key] = receivers_coins[i]
        i += 1
    print()
    return transfer_dict


@transfer_routes.route('/', methods=['POST'])
@login_required
def transfer():
    body = request.get_json()
    sender_id = body.get('sender_id')
    coin_id = body.get('coin_id')
    coinamt = body.get('coinamt')
    coinamt = float(coinamt)
    receiver_email = body.get('receiver_identification')
    receiver = User.query.filter_by(email=receiver_email).first()
    print('#############################', receiver)
    if receiver == None:
        return {'errors': ['No such user']}
    # return {'errors': 'No such user'}
    receiver = receiver.to_dict()
    receiver_id = receiver['id']
    vault = Vault.query.filter_by(user_id=sender_id).first()
    vault = vault.to_dict()
    coin = VaultCoin.query.filter_by(vault_id=vault['id']).filter_by(coin_id=coin_id).first()
    coinAmount = coin.to_dict()
    if coinamt <= coinAmount['amount']:
        new_vault = Vault.query.filter_by(user_id=receiver_id).first()
        new_vault = new_vault.to_dict()
        newcoin = VaultCoin.query.filter_by(vault_id=new_vault['id']).filter_by(coin_id=coin_id).first()
        coin.amount = coin.amount - coinamt
        newcoin.amount = newcoin.amount + coinamt
        new_transfer = Transfer(
            sender_id=sender_id,
            receiver_id=receiver_id,
            coin_id= coin_id,
            coinamt= coinamt,
            date= datetime.datetime.now()
        )
        db.session.add(new_transfer)
        db.session.commit()
        new_transfer = new_transfer.to_dict()
        user = User.query.get(new_transfer['sender_id'])
        user2 = User.query.get(new_transfer['receiver_id'])
        user = user.to_dict()
        user2= user2.to_dict()
        new_transfer['sender'] = user
        new_transfer['receiver'] = user2
        return new_transfer
    return {'errors':['Insufficient tokens']}


