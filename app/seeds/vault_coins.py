from app.models import db, VaultCoin
import random

def seed_vault_coins():
    i = 1

    while i < 14:
        coin_select_one= random.randint(2, 3)
        coin_select_two= random.randint(4, 9)
        coin_select_three= random.randint(10, 12)
        

        bitcoin= VaultCoin (
            vault_id= i,
            coin_id= 1,
            amount= 0.5
        )

        db.session.add(bitcoin)

        vault_coin1= VaultCoin (
            vault_id= i,
            coin_id= 2,
            amount= float(random.randint(5, 9))
        )

        db.session.add(vault_coin1)

        vault_coin2= VaultCoin (
            vault_id= i,
            coin_id= 3,
            amount= float(random.randint(1, 9))
        )
        db.session.add(vault_coin2)
        vault_coin3= VaultCoin (
            vault_id= i,
            coin_id= 4,
            amount= float(random.randint(1, 9))
        )
        db.session.add(vault_coin3)

        j = 5

        while j < 13:
            vault_coins= VaultCoin (
                vault_id= i,
                coin_id= j,
                amount= float(random.randint(0, 2))
            )
            db.session.add(vault_coins)
            db.session.commit()
            j += 1

        i += 1

        db.session.commit()


def undo_vault_coins():
    db.session.execute('TRUNCATE vault_coins RESTART IDENTITY CASCADE;')
    db.session.commit()