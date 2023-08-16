import express from 'express' 
import nunjucks from 'nunjucks' 
import session from 'express-session';


const app = express()

// Need this to use req.body
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'anyoldrandomstring',
      saveUninitialized: true,
      resave: false,
    }),
  );

nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });



app.get('/', (req, res) => {

    if(req.session.email) {
        res.render('index.html.njk', {email: req.session.email})
    } else {
        res.render('index.html.njk')
    }
})

app.get('/login', (req, res) => {
    res.render('login.html.njk')
})

app.post('/dashboard', (req,res) => {
    const {email} = req.body 
    req.session.email = email 
    res.render('dashboard.html.njk')
})

app.get('/logout', (req,res) => {
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })

})

app.listen(4545, () => console.log(`Take us to warp ${4545}!`))