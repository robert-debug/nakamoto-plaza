from .db import db


class Coin(db.Model):
    __tablename__ = 'coins'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    symbol = db.Column(db.String(5), nullable = False)
    lastaskprice = db.Column(db.Numeric, precision = 4, asdecimal = False, nullable = False)
    lastaskpricedate = db.Column(db.DateTime, nullable = False)
    maxsupply = db.Column(db.Integer, nullable = False)
    circsupply = db.Column(db.Integer, nullable = False)

    transfers = db.relationship(
        "Transfer",
        back_populates="coins"
    )

    vault_coins = db.relationship(
        "VaultCoin",
        back_populates="coins"
    )

    transactions = db.relationship(
        "Transaction",
        back_populates="coins"
    )


    def to_dict(self):
       return {
         "id": self.id,
         "name": self.name,
         "symbol": self.symbol,
         "lastaskprice": self.lastaskprice,
         "lastaskpricedate": datetime_to_string(self.lastaskpricedate),
         "maxsupply": self.maxsupply,
         "cicsupply": self.cicsupply
       }


def datetime_to_string(date):
    return date.__string__()

