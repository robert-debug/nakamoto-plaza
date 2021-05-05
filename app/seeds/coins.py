from app.models import db, Coin
import datetime

datetimes = datetime.datetime.now()
def seed_coins():
    bitcoin = Coin(
        name='Bitcoin',
        symbol='BTC',
        lastaskprice=48095.67319629,
        lastaskpricedate=datetimes,
        maxsupply =21000000,
        circsupply=18700475
    )

    db.session.add(bitcoin)

    ethereum = Coin(
        name='Ethereum',
        symbol='ETH',
        lastaskprice=2800.69577202,
        lastaskpricedate=datetimes,
        maxsupply=0,
        circsupply=115748819
    )

    db.session.add(ethereum)

    dogecoin = Coin(
        name='Dogecoin',
        symbol='DOGE',
        lastaskprice=0.48813996,
        lastaskpricedate=datetimes,
        maxsupply=0,
        circsupply=129475242412
    )

    db.session.add(dogecoin)

    ripple = Coin(
        name='Ripple',
        symbol='XRP',
        lastaskprice=1.30819334,
        lastaskpricedate=datetimes,
        maxsupply=100000000000,
        circsupply=46030731641
    )

    db.session.add(ripple)

    cardano = Coin(
        name='Cardano',
        symbol='Ada',
        lastaskprice=1.17488424,
        lastaskpricedate=datetimes,
        maxsupply=45000000000,
        circsupply=32061503736
    )

    db.session.add(cardano)

    uniswap = Coin(
        name='Uniswap Protocol Token',
        symbol='UNI',
        lastaskprice=35.72123819,
        lastaskpricedate=datetimes,
        maxsupply=1000000000,
        circsupply=558378475
    )

    db.session.add(uniswap)

    litecoin = Coin(
        name='Litecoin',
        symbol='LTC',
        lastaskprice=291.19985476,
        lastaskpricedate=datetimes,
        maxsupply=84000000,
        circsupply=66752415
    )
    db.session.add(litecoin)

    stellar = Coin(
        name='Stellar',
        symbol='XLM',
        lastaskprice=0.48891318,
        lastaskpricedate=datetimes,
        maxsupply=50000000000,
        circsupply=23010708009
    )

    db.session.add(stellar)

    ethclassic = Coin(
        name='Ethereum Classic',
        symbol='ETC',
        lastaskprice=74.62248955,
        lastaskpricedate=datetimes,
        maxsupply=210700000,
        circsupply=126909629
    )

    db.session.add(ethclassic)

    tron = Coin(
        name='TRON',
        symbol='TRX',
        lastaskprice=0.11224112,
        lastaskpricedate=datetimes,
        maxsupply=100850743812,
        circsupply=71660220128
    )

    db.session.add(tron)

    aave = Coin(
        name='Aave',
        symbol='AAVE',
        lastaskprice=387.98516230,
        lastaskpricedate=datetimes,
        maxsupply=16000000,
        circsupply=12735637
    )

    db.session.add(aave)

    cosmos = Coin(
        name='Cosmos',
        symbol='ATOM',
        lastaskprice=19.49421638,
        lastaskpricedate=datetimes,
        maxsupply=0,
        circsupply=238526147
    )

    db.session.add(cosmos)

    db.session.commit()

def undo_coins():
    db.session.execute('TRUNCATE coins RESTART IDENTITY CASCADE;')
    db.session.commit()





