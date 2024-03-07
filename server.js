const http = require('http');
const fs = require('fs');
const host = 'localhost';
const port = 8000;
const server = http.createServer();

const commentaires = [];

server.on('request', (req, res) => {
    if (req.url.startsWith('/images')) {
        try {
            const file = fs.readFileSync(`.${req.url}`);
            res.end(file);
        } catch (err) {
            console.log(err);
            res.end('erreur ressource');
        }
    } else if (req.url === '/all-images') {
        const images = fs.readdirSync('images');

        let html = '<!DOCTYPE html>'
        html += `<html>
                 <head>
                     <meta charset="UTF-8">
                     <title>Mur d\'images</title>
                     <link rel="stylesheet" href="/style">
                 </head>
                 <body>`;
        html += '<a href="/">Index</a><div class="center"><h1>Mur d\'images</h1></div>'
        html += '<div id="mur">'
        for (let i = 0; i < images.length; i++) {
            const id = i + 1
            if (!images[i].endsWith('_small.jpg')) {
                html += `<a href="/page-image/${id}"><img src="/images/${images[i]}" alt="${images[i]}" width="300"></a>`;
            }
            
        }
        html += '</div></body></html>';
        res.end(html);
    } else if (req.url === '/style') {
        res.end(fs.readFileSync('style.css', 'utf-8'));
    } else if (req.url === '/logo') {
        res.end(fs.readFileSync('images/logo.png'));
    } else if (req.url.startsWith('/page-image')) {
        // Gère les pages d'images
        const id = parseInt(req.url.split('/')[2], 10);
        const images = fs.readdirSync('images');
        const length = images.filter((image) => !image.endsWith('_small.jpg') && image != "logo.png").length;
        let html = '<!DOCTYPE html>'
        html += `<html>
                 <head>
                     <meta charset="UTF-8">
                     <title>Image ${id}</title>
                     <link rel="stylesheet" href="/style">
                 </head>
                 <body>`;
        html += `<a href=/all-images>Mur</a><div class="center"><img src="/images/image${id}.jpg" width="350"><p>Magnifique Image</p></div>`

        // Div pour les commentaires
        html += `<div class=center><h4>Commentaires</h4>`;
        if (commentaires[id]){
            for (let i = 0; i < commentaires[id].length; i++) {
                if (commentaires[id][i] !== undefined){
                    html += `<div> -- ${commentaires[id][i]} -- </div>`;
                }
            }
        }
        html += `<h4>Ajouter un nouveau commentaire</h4>`;
        html += `<form action="/image-description" method="POST">
                    <input type="hidden" name="numero" id="numero" value="${id}">
                    <label for="commentaire">Commentaire : </label>
                    <input type="text" name="commentaire" id="commentaire">
                    <input type="submit" value="Envoyer">
                 </form></div>`;
        if (id > 1 && id < length){
            html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/images/image${id-1}_small.jpg"></a></span><span class="right"><a href=/page-image/${id+1}><img src="/images/image${id+1}_small.jpg"></a></span></div>`;
        } else if (id == 1) {
            html += `<div><span class="left"></span><span class="right"><a href=/page-image/${id+1}><img src="/images/image${id+1}_small.jpg"></a></span></div>`;
        } else if (id == length) {
            html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/images/image${id-1}_small.jpg"></a></span><span class="right"></span></div>`;
        }
        html += '</body></html>';
        res.end(html);
    } else if (req.method === 'POST' && req.url === '/image-description') {
        let donnees;
        req.on('data', (dataChunk) => {
            donnees += dataChunk.toString();
        });
        req.on('end', () => {
            const paramValue = donnees.split('&');
            const imageId = Number(paramValue[0].split('=')[1]);
            let commentaire = paramValue[1].split('=')[1];

            commentaire = commentaire.replace('+', ' ');   // Remplace '+' par ' '
            try {
                commentaire = decodeURIComponent(commentaire); // Remplace les caractères spéciaux
            } catch(err) {
                console.error(err);
                let html = `<!DOCTYPE html>
                            <html>
                                <head>
                                    <meta charset="UTF-8>
                                    <title>ERREUR SERVEUR</title>
                                </head>
                                <body>
                                    <p style="color: red;">ERREUR ${err}</p>
                                    <a href="/page-image/${imageId}">Revenir à la page ${imageId}</a>
                                </body>
                            </html>`;
                res.end(html);
            }
            if (!commentaires[imageId]) {
                commentaires[imageId] = [];
            }
            console.log(commentaire);
            commentaires[imageId].push(commentaire);
            res.statusCode = 302;
            // Quand bouton "Envoyer", on actualise la page actuelle
            res.writeHead(302, { Location: `/page-image/${imageId}` });
            res.end();
        });
    }
    
    else {
        res.end(fs.readFileSync('index.html', 'utf-8'));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
