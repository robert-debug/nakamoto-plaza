from .db import db
from app.models.coin import datetime_to_string


class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key = True)
    fiat_id = db.Column(db.Integer, db.ForeignKey('fiats.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    coin_id = db.Column(db.Integer, db.ForeignKey('coins.id'), nullable = False)
    coinamt = db.Column(db.Numeric(precision = 14, scale=8,  asdecimal = False), nullable = False)
    fiatprice = db.Column(db.Numeric(precision = 14, scale=8, asdecimal = False), nullable = False)
    purchase = db.Column(db.Boolean, nullable = False)
    date = db.Column(db.DateTime, nullable = False)

    users = db.relationship(
        "User",
        back_populates="transactions"
    )

    coins = db.relationship(
        "Coin",
        back_populates="transactions"
    )

    fiats = db.relationship(
        "Fiat",
        back_populates="transactions"
    ) 

    def to_dict(self):{
        'id': self.id,
        'fiat_id': self.fiat_id,
        'user_id': self.user_id,
        'coin_id': self.coin_id,
        'coinamt': self.coinamt,
        'fiatprice': self.fiatprice,
        'purchase': self.purchase,
        'date': self.date
    }