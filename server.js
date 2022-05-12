const express = require('express');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 8000;

// dependency implementations
app.use( express.json() );
app.use( express.urlencoded({ extended: true }));

// creating classes

class User {
    constructor(){
        this.user_id = faker.mersenne.rand(0, 1000);
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();

    }
}

class Company {
    constructor(){
        this.id = faker.mersenne.rand(0, 1000);
        this.name = faker.company.companyName();
        this.address = {
            street : faker.address.streetAddress(),
            city : faker.address.cityName(),
            state : faker.address.state(),
            zipCode : faker.address.zipCode(),
            country: faker.address.country()
        }
    }
}

// create routes

app.get('/api', (req, res) =>{
    res.json({ msg: 'Hello World' })
})

// new user route
app.get('/api/users/new', (req, res)=>{
    // create a user, i.e. make a new instance of class User
    const newUser = new User();
    // respond w/json w/info about new user
    res.json({msg: newUser});
})

// new company route
app.get('/api/companies/new', (req, res) => {
    // create new instance of class Company
    const newCompany = new Company();
    res.json({msg: newCompany});
})

// new user and new company route
app.get('/api/user/company/new', (req, res) =>{
    const newUser = new User(), newCompany = new Company();
    res.json({user: newUser, company: newCompany});
})


// console.log() the listening part
app.listen(port, ()=>console.log(`listening on port ${port}`));