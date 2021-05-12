from app.models import db, Coin
import datetime

datetimes = datetime.datetime.now()
def seed_coins():
    bitcoin = Coin(
        name='Bitcoin',
        symbol='BTC',
        maxsupply =21000000,
        circsupply=18700475
    )

    db.session.add(bitcoin)

    ethereum = Coin(
        name='Ethereum',
        symbol='ETH',
        maxsupply=0,
        circsupply=115748819
    )

    db.session.add(ethereum)

    dogecoin = Coin(
        name='Dogecoin',
        symbol='DOGE',
        maxsupply=0,
        circsupply=129475242412
    )

    db.session.add(dogecoin)

    ripple = Coin(
        name='Ripple',
        symbol='XRP',
        maxsupply=100000000000,
        circsupply=46030731641
    )

    db.session.add(ripple)

    cardano = Coin(
        name='Cardano',
        symbol='ADA',
        maxsupply=45000000000,
        circsupply=32061503736
    )

    db.session.add(cardano)

    uniswap = Coin(
        name='Uniswap Protocol Token',
        symbol='UNI',
        maxsupply=1000000000,
        circsupply=558378475
    )

    db.session.add(uniswap)

    litecoin = Coin(
        name='Litecoin',
        symbol='LTC',
        maxsupply=84000000,
        circsupply=66752415
    )
    db.session.add(litecoin)

    stellar = Coin(
        name='Stellar',
        symbol='XLM',
        maxsupply=50000000000,
        circsupply=23010708009
    )

    db.session.add(stellar)

    ethclassic = Coin(
        name='Ethereum Classic',
        symbol='ETC',
        maxsupply=210700000,
        circsupply=126909629
    )

    db.session.add(ethclassic)

    tron = Coin(
        name='TRON',
        symbol='TRX',
        maxsupply=100850743812,
        circsupply=71660220128
    )

    db.session.add(tron)

    aave = Coin(
        name='Aave',
        symbol='AAVE',
        maxsupply=16000000,
        circsupply=12735637
    )

    db.session.add(aave)

    cosmos = Coin(
        name='Cosmos',
        symbol='ATOM',
        maxsupply=0,
        circsupply=238526147
    )

    db.session.add(cosmos)

    db.session.commit()

def undo_coins():
    db.session.execute('TRUNCATE coins RESTART IDENTITY CASCADE;')
    db.session.commit()





