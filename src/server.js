var React = require('react');
var ReactDOMServer = require('react-dom/server');

var App = require('./App');


const PORT = process.env.PORT || 3006;

ssr.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

ssr.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});