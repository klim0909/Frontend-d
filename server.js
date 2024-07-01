const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tickets = [
    {
        id: 1,
        name: 'Тестовый тикет 1',
        status: false,
        description: 'Описание для Тестового тикета 1',
        created: Date.now(),
    },
    {
        id: 2,
        name: 'Тестовый тикет 2',
        status: true,
        description: 'Описание для Тестового тикета 2',
        created: Date.now(),
    },
];

app.get('/', (req, res) => {
    const { method, id } = req.query;

    if (method === 'allTickets') {
        res.json(tickets.map(({ id, name, status, created }) => ({ id, name, status, created })));
    } else if (method === 'ticketById' && id) {
        const ticket = tickets.find(ticket => ticket.id === Number(id));
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404).send('Тикет не найден');
        }
    } else if (method === 'deleteById' && id) {
        tickets = tickets.filter(ticket => ticket.id !== Number(id));
        res.status(204).send();
    } else {
        res.status(400).send('Неверный метод или отсутствует id');
    }
});

app.post('/', (req, res) => {
    const { method, id } = req.query;
    const { name, description, status } = req.body;

    if (method === 'createTicket') {
        const newTicket = {
            id: tickets.length ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 1,
            name,
            description,
            status: status || false,
            created: Date.now(),
        };
        tickets.push(newTicket);
        res.status(201).json(newTicket);
    } else if (method === 'updateById' && id) {
        const ticketIndex = tickets.findIndex(ticket => ticket.id === Number(id));
        if (ticketIndex >= 0) {
            tickets[ticketIndex] = { ...tickets[ticketIndex], name, description, status };
            res.json(tickets[ticketIndex]);
        } else {
            res.status(404).send('Тикет не найден');
        }
    } else {
        res.status(400).send('Неверный метод или отсутствует id');
    }
});

app.listen(port, () => {
    console.log(`Сервер API слушает на http://localhost:${port}`);
});
