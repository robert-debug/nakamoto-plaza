from .db import db
from app.models.coin import datetime_to_string


class Transfer(db.Model):
    __tablename__ = 'transfers'

    id = db.Column(db.Integer, primary_key = True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    coin_id = db.Column(db.Integer, db.ForeignKey('coins.id'), nullable = False)
    coinamt = db.Column(db.Numeric(precision = 8, asdecimal = False) nullable = False)
    date = db.Column(db.DateTime, nullable = False)

    users = db.relationship(
        "User",
        back_populates="transfers"
    )

    coins = db.relationship(
        "Coin",
        back_populates="transfers"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'coin_id': self.coin_id,
            'coinamt': self.coinamt,
            'date': datetime_to_string(self.date)
        }

