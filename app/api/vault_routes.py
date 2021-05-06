from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Vault

vault_routes = Blueprint('vaults', __name__)

@vault_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_vault(id):
    vault = vault.query.get(id)
    vault_dict = coin.to_dict
    return vault_dict

