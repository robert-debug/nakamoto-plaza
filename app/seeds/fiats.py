from app.models import db, Fiat

def seed_fiats():
    dollar = Fiat(
        name='United States Dollar',
        symbol='USD',
    )

    db.session.add(dollar)
    db.session.commit()

def undo_fiats():
    db.session.execute('TRUNCATE fiats RESTART IDENTITY CASCADE;')
    db.session.commit()