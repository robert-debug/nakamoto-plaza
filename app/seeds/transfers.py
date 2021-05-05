from app.models import db, Transfer
import datetime

def seed_transfers():
    transfer_one = Transfer(
        sender_id = 1,
        receiver_id = 2,
        coin_id = 1,
        coinamt = .5,
        date = datetime.datetime.now()
    )

    db.session.add(transfer_one)

    transfer_two = Transfer(
        sender_id = 1,
        receiver_id = 3,
        coin_id = 1,
        coinamt = .5,
        date = datetime.datetime.now()
    )

    db.session.add(transfer_two)

    transfer_three = Transfer(
        sender_id = 4,
        receiver_id = 1,
        coin_id = 1,
        coinamt = .5,
        date = datetime.datetime.now()
    )

    db.session.add(transfer_three)
    db.session.commit()

def undo_transfers():
    db.session.execute('TRUNCATE transfers RESTART IDENTITY CASCADE;')
    db.session.commit()
