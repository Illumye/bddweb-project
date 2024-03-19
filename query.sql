-- importer les données de application-image.sql



-- liste des toutes les images
SELECT * FROM images;

-- liste des images triées par date (du plus récent au plus ancien)
SELECT * FROM images ORDER BY date DESC;

-- les trois images les plus récentes
SELECT * FROM images ORDER BY date DESC LIMIT 3;

-- la liste des images prises après le '2022-01-01'
SELECT * FROM images WHERE date > '2022-01-01';

-- toutes les images qui ont plus de dix likes
SELECT * FROM images WHERE likes > 10;

-- toutes les images dont l'orientation est portrait (ou paysage)
SELECT * FROM images JOIN orientation ON images.orientation = orientation.id WHERE orientation.orientation = 'Portrait' OR orientation.orientation = 'Paysage';

-- toutes les images dont l'auteur est 'Marcel Duchamp'
SELECT * FROM images WHERE id_auteur = (SELECT id FROM auteurs WHERE nom = 'Duchamp' AND prenom = 'Marcel');

-- toutes les images de l'auteur 'Marcel Duchamp' dont l'orientation est portrait
SELECT * FROM images JOIN orientation ON images.orientation = orientation.id WHERE id_auteur = (SELECT id FROM auteurs WHERE nom = 'Duchamp' AND prenom = 'Marcel') AND orientation.orientation = 'Portrait';

-- nombre de likes obtenus par 'Marcel Duchamp' sur toutes ses images
SELECT SUM(likes) AS total_likes FROM images WHERE id_auteur = (SELECT id FROM auteurs WHERE nom = 'Duchamp' AND prenom = 'Marcel');

-- tous les commentaires de l'image dont l'id est 28
SELECT * FROM commentaires WHERE id_image = 28;

-- l'image qui a le plus de likes
SELECT * FROM images ORDER BY likes DESC LIMIT 1;