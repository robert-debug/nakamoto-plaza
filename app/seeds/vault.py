from app.models import db, Vault


def seed_vaults():
    i = 1
    while i < 14:
        vault = Vault(
            user_id= i
        )
        db.session.add(vault)
        db.session.commit()
        i += 1

def undo_vaults():
    db.session.execute('TRUNCATE vaults RESTART IDENTITY CASCADE;')
    db.session.commit()


