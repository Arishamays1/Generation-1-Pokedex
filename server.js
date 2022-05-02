const express= require('express')
const methodOverride = require('method-override');
const app=express()
const PORT=5000
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
//----------
const pokemon=require('./pokedex/models/pokemon.js')

//----------
app.get('/', (req,res)=>{
    res.render('pokepage.ejs')
})

app.get('/pokemon',(req, res)=>{
    const pokeData={pokemon}
    res.render('index.ejs', pokeData)
})

app.get('/pokemon/new',(req,res)=>{
    res.render('new.ejs')
})
//send you to correct pokemon
app.get('/pokemon/:id',(req, res) =>{
    const context = {poke: pokemon[req.params.id]}
    res.render('show.ejs', context)
})
app.get('/pokemon/:id/edit', (req, res)=>{
   const context= {poke: pokemon[req.params.id],
    id:req.params.id}
    res.render('edit.ejs', context)
})
//posts and redirect newly created pokemon
app.post('/pokemon',(req, res)=>{
    pokemon.push(req.body)
    res.redirect('/pokemon')
})

//Delete route
app.delete('/pokemon/:id', (req, res)=>{
    console.log(req.params.id)
pokemon.splice(req.params.id, 1)//<-- 1 takes off 1 of index
res.redirect('/pokemon')
})

//puts pokemon that has been edited  on show pge
app.put('/pokemon/:id',(req, res)=>{
    pokemon[req.params.id]=req.body
    console.log(req.body)
    res.redirect(`/pokemon/${req.params.id}`)
})




//----Listener------
app.listen(PORT, ()=>{
console.log(`you're connected to ${PORT}.`)
})

