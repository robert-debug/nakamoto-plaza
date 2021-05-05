from app.models import db, VaultCoin
import random

def seed_vault_coins():
    i = 1

    two = VaultCoin (
        vault_id= 1,
        coin_id= 2,
        amount= 0.5
    )
    db.session.add(two)

    while i < 14:
        coin_select_one= random.randint(2, 3)
        coin_select_two= random.randint(4, 9)
        coin_select_three= random.randint(10, 12)
        

        bitcoin= VaultCoin (
            vault_id= i,
            coin_id= coin_select_one,
            amount= 0.5
        )

        db.session.add(bitcoin)

        vault_coin1= VaultCoin (
            vault_id= i,
            coin_id= coin_select_one,
            amount= float(random.randint(1, 9))
        )

        db.session.add(vault_coin1)

        vault_coin2= VaultCoin (
            vault_id= i,
            coin_id= coin_select_two,
            amount= float(random.randint(1, 9))
        )
        db.session.add(vault_coin2)
        vault_coin3= VaultCoin (
            vault_id= i,
            coin_id= coin_select_three,
            amount= float(random.randint(1, 9))
        )
        db.session.add(vault_coin3)

        i += 1

        db.session.commit()


def undo_vault_coins():
    db.session.execute('TRUNCATE vault_coins RESTART IDENTITY CASCADE;')
    db.session.commit()