from .db import db


class Fiat(db.Model):
    __tablename__ = 'fiats'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    symbol = db.Column(db.String(3), nullable = False)

    transactions = db.relationship(
        "Transaction",
        back_populates="fiats"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "symbol": self.symbol
        }

