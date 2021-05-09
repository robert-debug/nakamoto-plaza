from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Transaction, VaultCoin, Vault
import datetime

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_transactions(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    transactions = [transaction.to_dict() for transaction in transactions]
    transaction_dict = {}
    i = 0
    while i < len(transactions):
        key = transactions[i]['id']
        transaction_dict[key] = transactions[i]
        i += 1
    return transaction_dict

@transaction_routes.route('/<int:user_id>/coins/<int:coin_id>', methods=['GET'])
@login_required
def get_one_coin(user_id, coin_id):
    transactions = Transaction.query.filter_by(user_id=user_id).filter_by(coin_id=coin_id).all()
    transactions = [transaction.to_dict() for transaction in transactions]
    transaction_dict = {}
    i = 0
    while i < len(transactions):
        key = transactions[i]['id']
        transaction_dict[key] = transactions[i]
        i += 1
    return transaction_dict


@transaction_routes.route('/', methods=['POST'])
@login_required
def transactions():
    body = request.get_json()
    user_id = body.get('user_id')
    fiat_id = body.get('fiat_id')
    coin_id = body.get('coin_id')
    coinamt = body.get('coinamt')
    fiatprice = body.get('fiatprice')
    purchase = body.get('purchase')
    date = datetime.datetime()
    vault = Vault.query.filter_by(user_id=user_id).first()
    vault = vault.to_dict
    coin = VaultCoin.query.filter_by(vault_id=vault['id']).filter_by(coin_id=coin_id).first()
    if purchase == True:
        coin.amount = coin.amount + coinamt
    else:
        coin.amount = newcoin.amount - coinamt
    new_transfer = Transaction(
        user_id=user_id,
        fiat_id=fiat_id,
        coin_id=coin_id,
        coinamt=coinamt,
        fiatprice=fiatprice,
        purchase=purchase,
        date=date
    )
    db.session.add(new_transfer)
    db.session.commit()
    return new_transfer.to_dict()