const faker = require('faker')

const randomNumber = (num) => Math.floor(Math.random() * Math.floor(num))

const seed_user = (num) => {
    let i = 1
    let j = 1
    console.log(`COPY BELOW HERE`)
    state = ['California', 'Georgia', 'Ohio', 'New York', 'Washington', 'Texas', 'Illinois']

    while(j <= num){
        while (i <= 6) {
            const random = randomNumber(7)
            const firstName = faker.name.firstName()
            const lastName = faker.name.lastName()
            const string = `
            user${j} = User(
            username= "${firstName} ${lastName}",
            email= "${faker.internet.email()}",
            password= "${faker.internet.password()}",
            firstname= "${firstName}",
            lastname= "${lastName}",
            fakebankinfo= 12345,
            state= "${state[i]}"
            )`
            console.log(string)
            console.log("")
            console.log(`db.session.add(user${j})`)
            console.log("")
            i++
            j++
        }
        i = 1
    }
    console.log("")
    console.log("")
};

seed_user(10)