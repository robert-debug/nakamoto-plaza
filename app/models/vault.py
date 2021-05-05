from .db import db


class Vault(db.Model):
    __tablename__ = 'vaults'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    users = db.relationship(
        "User",
        back_populates="vaults"
    )
    vault_coins = db.relationship(
        "VaultCoin",
        back_populates="vaults"
    )
    transactions = db.relationship(
        "Transaction",
        back_populates="vaults"
    )  


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id
        }