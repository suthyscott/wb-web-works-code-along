## Setup
Create new folder called `wb-express-session`

Create `app.js`

Install express

Put `node_modules` in `.gitignore`

Set `"type": "module"`

Build out basic server and listen

Set `start` script in package.json

Install nunjucks and configure it

## Endpoints

Build out base endpoint that renders `index.html.njk`. Then build out the `index.html.njk` file in the `views` folder. 

Build out the `/login` endpoint and corresponding form in `login.html.njk`.

Build out the `/dashboard` endpoint that renders `index.html.njk` with or without an email. You'll need to setup the top level middleware that allows us to parse body objects: `app.use(express.urlencoded({ extended: false }));`

```
app.get('/', (req, res) => {
    res.render('index.html.njk')
})

app.get('/login', (req, res) => {
    res.render('login.html.njk')
})

app.post('/dashboard', (req,res) => {
    const {email} = req.body 
    if(email) {
        res.render('index.html.njk', {email})
    } else {
        res.render('index.html.njk')
    }
})
```

The problem is that at this point, if you go back to the `/` route it will not know that you just logged in. It doesn't 'remember' that you already entered your email. 

## Using session

Start going through the slides about express-session. We don't want to directly work with cookies here because they can't store as much info and they're tricky to work with, so we'll use sessions to 'remember' that the user logged in and what their email is. 

Install `express-session`

Set up the session middleware

Tweak the `/dashboard` endpoint to add an `email` property to req.session, using the value from `req.body.email`. Then build out a `dashboard.html.njk` file to inform the user that they've logged in and route them back to the home page. 

Tweak the `/` endpoint to have an if statement similar to the one that was originally in the `/dashboard` endpoint: if there's an email on `req.session` then pass it down to `index.html.njk`, if not then the condition in `index.html.njk` will render the link asking the user to login. 

Finally, we need a way to allow the user to logout. # wb-web-works-code-along
