const { response } = require('express')
const express = require('express')
const app = express()

//parse JSON using express
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/api/users'))

app.listen(3000, (req, res) => {
    console.log('Server started on port 3000.')

})

let movies =  [
    {
        id: "1",
        title: "a volta dos que não foram",
        director: "Olari Suarez",
        release_date: "200-08-13"
    },
    {
        id:"2",
        title: "aqueda do que lavantou",
        director: "Fuleiro",
        release_date: "1994-04-03"
    }
];

//get the movie list in  the form of json
app.get('/movie', (req, res) =>{
    res.json(movies)
});

//add movie to the list
app.post('/movie', (req, res) =>{
    const movie = req.body

    console.log(movie)
    movies.push(movie)
    res.send('Filme foi adicionado para a lista!');
});

app.get('/bredbk', (req,res) => {
    res.json(
        {
            message: 'It works baby!'
        }
    )
    console.log('Test log in /bredbk')
})