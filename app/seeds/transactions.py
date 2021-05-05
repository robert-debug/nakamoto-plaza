from app.models import db, Transaction
import datetime

def seed_transactions():   
    transaction1 = Transaction(
        fiat_id=1,
        user_id=1,
        coin_id=2,
        coinamt=0.5,
        fiatprice=1239.56,
        purchase=True,
        date=datetime.datetime.now()
    )

    db.session.add(transaction1)
 
    transaction2 = Transaction(
        fiat_id=1,
        user_id=1,
        coin_id=7,
        coinamt=0.5,
        fiatprice=121.56,
        purchase=False,
        date=datetime.datetime.now()
    )

    db.session.add(transaction2)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()