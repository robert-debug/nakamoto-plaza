# from werkzeug.security import generate_password_hash
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', firstname='Demonia', lastname= 'Demoman',
                fakebankinfo='12345', state='California')

    db.session.add(demo)

    db.session.commit()

    user1 = User(
            username= "Nicklaus Schmitt",
            email= "Jackson_Thompson22@gmail.com",
            password= "_1KeEyPRmIV7IGZ",
            firstname= "Nicklaus",
            lastname= "Schmitt",
            fakebankinfo= 12345,
            state= "Georgia"
    )

    db.session.add(user1)


    user2 = User(
            username= "Erica Hettinger",
            email= "Kasandra.Lakin@hotmail.com",
            password= "v2G1aKzBTf7rnh6",
            firstname= "Erica",
            lastname= "Hettinger",
            fakebankinfo= 12345,
            state= "Ohio"
    )

    db.session.add(user2)


    user3 = User(
            username= "Raymond Green",
            email= "Baron_Hettinger3@yahoo.com",
            password= "RGiIW_4d4RKkpmc",
            firstname= "Raymond",
            lastname= "Green",
            fakebankinfo= 12345,
            state= "New York"
    )

    db.session.add(user3)


    user4 = User(
            username= "Daphney Rodriguez",
            email= "Oliver.Stehr@gmail.com",
            password= "KEUEgM1l600RJm2",
            firstname= "Daphney",
            lastname= "Rodriguez",
            fakebankinfo= 12345,
            state= "Washington"
    )

    db.session.add(user4)


    user5 = User(
            username= "Daphne Stark",
            email= "Jordy_Frami@yahoo.com",
            password= "BsBbv57wOqiSw9B",
            firstname= "Daphne",
            lastname= "Stark",
            fakebankinfo= 12345,
            state= "Texas"
    )

    db.session.add(user5)


    user6 = User(
            username= "Nelson Kunze",
            email= "Alia9@gmail.com",
            password= "dv1TUcRV8pa8neM",
            firstname= "Nelson",
            lastname= "Kunze",
            fakebankinfo= 12345,
            state= "Illinois"
    )

    db.session.add(user6)


    user7 = User(
            username= "Carlotta Barton",
            email= "Rocio_Friesen81@gmail.com",
            password= "6e6r4dUHREkYxOK",
            firstname= "Carlotta",
            lastname= "Barton",
            fakebankinfo= 12345,
            state= "Georgia"
    )

    db.session.add(user7)


    user8 = User(
            username= "Rogelio Gutkowski",
            email= "Jensen_Rice@gmail.com",
            password= "zYVjJlUNloHQSGM",
            firstname= "Rogelio",
            lastname= "Gutkowski",
            fakebankinfo= 12345,
            state= "Ohio"
    )

    db.session.add(user8)


    user9 = User(
            username= "Madisyn Wolff",
            email= "Juwan38@gmail.com",
            password= "lNN_kWeNXfhLo1I",
            firstname= "Madisyn",
            lastname= "Wolff",
            fakebankinfo= 12345,
            state= "New York"
    )

    db.session.add(user9)


    user10 = User(
            username= "Laura Bergnaum",
            email= "Dorian_Mueller@hotmail.com",
            password= "Ys9XfgGdya07NZB",
            firstname= "Laura",
            lastname= "Bergnaum",
            fakebankinfo= 12345,
            state= "Washington"
    )

    db.session.add(user10)


    user11 = User(
            username= "Jaime O'Hara",
            email= "Jovany.Mayer@gmail.com",
            password= "9GiC2WAfIymlvsW",
            firstname= "Jaime",
            lastname= "O'Hara",
            fakebankinfo= 12345,
            state= "Texas"
    )

    db.session.add(user11)


    user12 = User(
            username= "Reed Johnson",
            email= "Josefina.Kautzer@hotmail.com",
            password= "YQzXl9LZCvQMit1",
            firstname= "Reed",
            lastname= "Johnson",
            fakebankinfo= 12345,
            state= "Illinois"
    )

    db.session.add(user12)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
