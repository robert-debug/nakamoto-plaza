from .db import db


class VaultCoin(db.Model):
    __tablename__= 'vault_coins'

    id = db.Column(db.Integer, primary_key = True)
    vault_id = db.Column(db.Integer, db.ForeignKey('vaults.id'), nullable = False)
    coin_id = db.Column(db.Integer, db.ForeignKey('coins.id'), nullable = False)
    amount = db.Column(db.Float, nullable = False)

    coins = db.relationship(
        "Coin",
        back_populates="vault_coins"
    )

    vaults = db.relationship(
        "Vault",
        back_populates="vault_coins"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "vault_id": self.vault_id,
            "coin_id": self.coin_id
        }