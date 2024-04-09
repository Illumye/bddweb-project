/* Serveur Web pour le projet */

// Librairies
const http = require('http');
const fs = require('fs');
require('dotenv').config()
const { Client } = require('pg');

// Constantes
const host = 'localhost';
const port = 8080;
const server = http.createServer();

const commentaires = [];

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'application_image',
    port: 5432
});

client.connect()
.then(() => {
    console.log('Connected to database');
})
.catch((e) => {
    console.error("Error connecting to database");
    console.error(e);
});

server.on('request', (req, res) => {
    if (req.url.startsWith('/public/')){
        try{
            const file = fs.readFileSync(`.${req.url}`);
            res.end(file);
        } catch (err) {
            console.log(err);
            res.end('erreur ressource');
        }
        return;
        
    }
    if (req.url.startsWith('/images')) {
        const file = fs.readFileSync(`.${req.url}`);
        res.end(file);
    } else if (req.url === '/all-images') {
        client.query('SELECT * FROM images', (err, resp) => {
            if (err) throw err;
            const images = resp.rows;
            const length = images.length;

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
            for (let i = 0; i < length; i++) {
                html += `<a href="/page-image/${images[i].id}"><img src="/public/images/image${images[i].id}.jpg" alt="image${images[i].id}" width="300"></a>`;
            }
            html += '</div><footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer></body></html>';
            res.end(html);
        });
        // const images = fs.readdirSync('images');
        // const length = images.filter((image) => !image.endsWith('_small.jpg') && image != "logo.png").length;

        // let html = '<!DOCTYPE html>'
        // html += `<html>
        //          <head>
        //              <meta charset="UTF-8">
        //              <title>Mur d\'images</title>
        //              <link rel="stylesheet" href="/style">
        //          </head>
        //          <body>`;
        // html += '<a href="/">Index</a><div class="center"><h1>Mur d\'images</h1></div>'
        // html += '<div id="mur">'
        // for (let i = 1; i <= length; i++) {
        //     html += `<a href="/page-image/${i}"><img src="/images/image${i}.jpg" alt="image${i}" width="300"></a>`;
        // }
        // html += '</div><footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer></body></html>';
        // res.end(html);
    } else if (req.url === '/style') {
        res.end(fs.readFileSync('public/style.css', 'utf-8'));
    } else if (req.url === '/logo') {
        res.end(fs.readFileSync('public/images/logo.png'));
    } else if (req.url.startsWith('/page-image')) {
        // Gère les pages d'images
        console.log("URL: ", req.url);
        const id = parseInt(req.url.split('/')[2], 10);
        console.log("ID: ", id);
        const images = fs.readdirSync('public/images');
        const length = images.filter((image) => !image.endsWith('_small.jpg') && image != "logo.png").length;
        if (Number.isInteger(id)){
            client.query('SELECT * FROM images WHERE id = $1', [id], (err, resp) => {
                if (err) throw err;
                const image = resp.rows[0];

                client.query('SELECT * FROM commentaires WHERE id_image = $1', [id], (err, resp) => {
                    if (err) throw err;
                    const commentaires = resp.rows;

                    let html = '<!DOCTYPE html>'
                    html += `<html>
                            <head>
                                <meta charset="UTF-8">
                                <title>Image ${id}</title>
                                <link rel="stylesheet" href="/style">
                            </head>
                            <body>`;
                    html += `<a href=/all-images>Mur</a><div class="center"><img src="/public/images/image${id}.jpg" width="350"><p>${image.nom}</p></div>`;
                    html += `<div class=center><h4>Commentaires</h4>`;
                    for (let commentaire of commentaires) {
                        html += `<div> -- ${commentaire.texte} -- </div>`;
                    }
                    html += `<h4>Ajouter un nouveau commentaire</h4>`;
                    html += `<form action="/image-description" method="POST">
                                <input type="hidden" name="numero" id="numero" value="${id}">
                                <label for="commentaire">Commentaire : </label>
                                <input type="text" name="commentaire" id="commentaire">
                                <input type="submit" value="Envoyer">
                            </form></div>`;

                    if (id > 1 && id < length){
                        html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/public/images/image${id-1}_small.jpg"></a></span><span class="right"><a href=/page-image/${id+1}><img src="/public/images/image${id+1}_small.jpg"></a></span></div>`;
                    }
                    else if (id == 1) {
                        html += `<div><span class="left"></span><span class="right"><a href=/page-image/${id+1}><img src="/public/images/image${id+1}_small.jpg"></a></span></div>`;
                    }
                    else if (id == length) {
                        html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/public/images/image${id-1}_small.jpg"></a></span><span class="right"></span></div>`;
                    }
                    html += `<footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer></body><script type="text/javascript" src='/public/page-image.js'></script></html>`;
                    res.end(html);
                });
            });
        } else {
            console.error('Erreur id');
        }
        // const images = fs.readdirSync('images');
        // const length = images.filter((image) => !image.endsWith('_small.jpg') && image != "logo.png").length;
        // let html = '<!DOCTYPE html>'
        // html += `<html>
        //          <head>
        //              <meta charset="UTF-8">
        //              <title>Image ${id}</title>
        //              <link rel="stylesheet" href="/style">
        //          </head>
        //          <body>`;
        // html += `<a href=/all-images>Mur</a><div class="center"><img src="/images/image${id}.jpg" width="350"><p>Magnifique Image</p></div>`

        // // Div pour les commentaires
        // html += `<div class=center><h4>Commentaires</h4>`;
        // if (commentaires[id]){
        //     for (let i = 0; i < commentaires[id].length; i++) {
        //         if (commentaires[id][i] !== undefined){
        //             html += `<div> -- ${commentaires[id][i]} -- </div>`;
        //         }
        //     }
        // }
        // html += `<h4>Ajouter un nouveau commentaire</h4>`;
        // html += `<form action="/image-description" method="POST">
        //             <input type="hidden" name="numero" id="numero" value="${id}">
        //             <label for="commentaire">Commentaire : </label>
        //             <input type="text" name="commentaire" id="commentaire">
        //             <input type="submit" value="Envoyer">
        //          </form></div>`;
        // if (id > 1 && id < length){
        //     html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/images/image${id-1}_small.jpg"></a></span><span class="right"><a href=/page-image/${id+1}><img src="/images/image${id+1}_small.jpg"></a></span></div>`;
        // } else if (id == 1) {
        //     html += `<div><span class="left"></span><span class="right"><a href=/page-image/${id+1}><img src="/images/image${id+1}_small.jpg"></a></span></div>`;
        // } else if (id == length) {
        //     html += `<div><span class="left"><a href="/page-image/${id-1}"><img src="/images/image${id-1}_small.jpg"></a></span><span class="right"></span></div>`;
        // }
        // html += '<footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer></body></html>';
        // res.end(html);
    }
    // Méthodes pour les commentaires -> formulaire
    else if (req.method === 'POST' && req.url === '/image-description') {
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

            client.query('INSERT INTO commentaires (id_image, texte) VALUES ($1, $2)', [imageId, commentaire], (err, resp) => {
                if (err) throw err;
                res.writeHead(302, { Location: `/page-image/${imageId}` });
                res.end();
            });
            // if (!commentaires[imageId]) {
            //     commentaires[imageId] = [];
            // }
            // console.log(commentaire);
            // commentaires[imageId].push(commentaire);
            // res.statusCode = 302;
            // // Quand bouton "Envoyer", on actualise la page actuelle
            // res.writeHead(302, { Location: `/page-image/${imageId}` });
            // res.end();
        });
    } 
    // Lien vers mon dépôt git (non-obligatoire)
    else if (req.url === "/github") {
        res.writeHead(302, { Location: 'https://github.com/Illumye/bddweb-project' });
        res.end();
    }
    // Page d'accueil / racine
    else if (req.url === "/") {
        client.query('SELECT * FROM images ORDER BY date DESC LIMIT 3', (err, resp) => {
            if (err) throw err;

            let html = `<!DOCTYPE html>
                        <html lang="fr">
                        <head>
                            <meta charset="UTF-8">
                            <title>Mon Mur d'images</title>
                            <link rel="stylesheet" href="/style">
                        </head>
                        <body>
                            <div class="center">
                                <img src="/logo" width="100">
                                <p>Vous trouverez ici toutes les images que j'aime</p>
                                <div>
                        `;
            for (let row of resp.rows){
                html += `<a href="/page-image/${row.id}"><img src="/public/images/image${row.id}.jpg" alt="image${row.id}" width="300"></a>`;
            }
            html += `
                    </div>
                    <a href="/all-images">Voir toutes les images</a>
                    </div>
                    <footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer></body></html>`;
            res.end(html);
        });
    }
    // Page 404
    else {
        let html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not Found</title>
            <link rel="stylesheet" href="/style">
        </head>
        <body>
        <div class="center">
            <h1>404</h1>
            <p>La page ou la ressource demandée n'existe pas</p>
            <a href="/">Revenir à l'index</a>
            <footer class="footer">Retrouvez le dépôt git <a href="/github">ici</a></footer>
        </div>
        </body>
        </html>
        `
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(html);
    }
});

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
