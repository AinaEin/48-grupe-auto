import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

const corsOptions = {
    origin: 'http://localhost:4820'
};
const helmetOptions = {
    crossOriginResourcePolicy: false
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let lastUserId = 0;
const users = [
    // {
    //     id: 1,
    //     email: 'admin@admin',
    //     password: 'admin',
    //     cars: [1, 3, 77],
    // },
];

// const cars = [
//     {
//         id: 1,
//         name: 'Auto pavadinimas 1',
//         img: 'http://localhost:4821/img/cars/1.jpg',
//         price: 0,
//     },
//     {
//         id: 2,
//         name: 'Auto pavadinimas 2',
//         img: 'http://localhost:4821/img/cars/2.jpg',
//         price: 0,
//     },
//     {
//         id: 3,
//         name: 'Auto pavadinimas 3',
//         img: 'http://localhost:4821/img/cars/3.jpg',
//         price: 0,
//     },
//     {
//         id: 4,
//         name: 'Auto pavadinimas 4',
//         img: 'http://localhost:4821/img/cars/4.jpg',
//         price: 0,
//     },
//     {
//         id: 5,
//         name: 'Auto pavadinimas 5',
//         img: 'http://localhost:4821/img/cars/5.jpg',
//         price: 0,
//     },
//     {
//         id: 6,
//         name: 'Auto pavadinimas 6',
//         img: 'http://localhost:4821/img/cars/6.jpg',
//         price: 0,
//     },
//     {
//         id: 7,
//         name: 'Auto pavadinimas 7',
//         img: 'http://localhost:4821/img/cars/7.jpg',
//         price: 0,
//     },
//     {
//         id: 8,
//         name: 'Auto pavadinimas 8',
//         img: 'http://localhost:4821/img/cars/8.jpg',
//         price: 0,
//     },
//     {
//         id: 9,
//         name: 'Auto pavadinimas 9',
//         img: 'http://localhost:4821/img/cars/9.jpg',
//         price: 0,
//     },
//     {
//         id: 10,
//         name: 'Auto pavadinimas 10',
//         img: 'http://localhost:4821/img/cars/10.jpg',
//         price: 0,
//     },
//     {
//         id: 11,
//         name: 'Auto pavadinimas 11',
//         img: 'http://localhost:4821/img/cars/11.jpg',
//         price: 0,
//     },
//     {
//         id: 12,
//         name: 'Auto pavadinimas 12',
//         img: 'http://localhost:4821/img/cars/12.jpg',
//         price: 0,
//     },
//     {
//         id: 13,
//         name: 'Auto pavadinimas 13',
//         img: 'http://localhost:4821/img/cars/13.jpg',
//         price: 0,
//     },
//     {
//         id: 14,
//         name: 'Auto pavadinimas 14',
//         img: 'http://localhost:4821/img/cars/14.jpg',
//         price: 0,
//     },
//     {
//         id: 15,
//         name: 'Auto pavadinimas 15',
//         img: 'http://localhost:4821/img/cars/15.jpg',
//         price: 0,
//     },
//     {
//         id: 16,
//         name: 'Auto pavadinimas 16',
//         img: 'http://localhost:4821/img/cars/16.jpg',
//         price: 0,
//     },
//     {
//         id: 17,
//         name: 'Auto pavadinimas 17',
//         img: 'http://localhost:4821/img/cars/17.jpg',
//         price: 0,
//     },
//     {
//         id: 18,
//         name: 'Auto pavadinimas 18',
//         img: 'http://localhost:4821/img/cars/18.jpg',
//         price: 0,
//     },
//     {
//         id: 19,
//         name: 'Auto pavadinimas 19',
//         img: 'http://localhost:4821/img/cars/19.jpg',
//         price: 0,
//     },
//     {
//         id: 20,
//         name: 'Auto pavadinimas 20',
//         img: 'http://localhost:4821/img/cars/20.jpg',
//         price: 0,
//     },
// ];

let lastCarId = 0;
const cars = [
    // {
    //     userId: 1,
    //     id: 1,
    //     name: 'Auto pavadinimas 1',
    //     img: 'http://localhost:4821/img/cars/1.jpg',
    //     price: 0,
    // },
];

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    let isUniqueUserEmail = true;

    for (const user of users) {
        if (user.email === email) {
            isUniqueUserEmail = false;
            break;
        }
    }

    if (isUniqueUserEmail) {
        users.push({
            id: ++lastUserId,
            email,
            password,
            cars: [],
        });
        console.log(users);

        return res.send(JSON.stringify({
            type: 'success',
            message: 'User successfully registered'
        }));
    }

    return res.send(JSON.stringify({
        type: 'error',
        message: 'User already exists'
    }));
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    let userId = -1;

    for (const user of users) {
        if (user.email === email &&
            user.password === password) {
            userId = user.id;
            break;
        }
    }

    if (userId > 0) {
        return res.send(JSON.stringify({
            message: 'User successfully logged in',
            loggedIn: true,
            userId,
        }));
    }

    return res.send(JSON.stringify({
        message: 'Such user does not exist',
        loggedIn: false,
    }));
});

app.get('/api/cart-details', (req, res) => {
    return res.send(JSON.stringify({
        data: [
            {
                name: 'Pomidoras',
                price: 2,
                amount: 0,
            },
            {
                name: 'Agurkas',
                price: 1.5,
                amount: 0,
            },
            {
                name: 'Svogūnas',
                price: 5,
                amount: 0,
            },
        ],
    }));
});

app.get('/api/newest-cars', (req, res) => {
    return res.send(JSON.stringify({
        list: cars.slice(-6).reverse()
    }));
});

app.get('/api/all-cars', (req, res) => {
    return res.send(JSON.stringify({
        list: cars
    }));
});

app.post('/api/create-car', (req, res) => {
    const { userId, name, price } = req.body;

    cars.push({
        id: ++lastCarId,
        userId,
        name,
        price,
        img: 'http://localhost:4821/img/cars/1.jpg',
    });

    for (const user of users) {
        if (user.id === userId) {
            user.cars.push(lastCarId);
            break;
        }
    }

    return res.send(JSON.stringify({
        type: 'success',
        message: 'Car created',
    }));
});

app.get('/api/my-cars/:userId', (req, res) => {
    console.log(req.params);

    return res.send(JSON.stringify({
        list: cars.filter(car => car.userId === req.params.userId),
    }));
});

app.get('*', (req, res) => {
    console.log('404');
    return res.send('404 - content not found');
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(4821, () => {
    console.log(`\nhttp://localhost:4821`);
});