CREATE DATABASE application_image;

CREATE TABLE auteurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
);

CREATE TABLE orientation (
    id SERIAL PRIMARY KEY,
    orientation VARCHAR(100) NOT NULL
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    date DATE,
    orientation INTEGER REFERENCES orientation(id),
    fichier VARCHAR(100) NOT NULL,
    likes INTEGER,
    id_auteur INTEGER REFERENCES auteurs(id),
);

CREATE TABLE commentaires (
    id SERIAL PRIMARY KEY,
    texte TEXT NOT NULL,
    id_image INTEGER REFERENCES images(id)
);

INSERT INTO orientation (orientation) VALUES ('Portrait');
INSERT INTO orientation (orientation) VALUES ('Paysage');

INSERT INTO auteurs (nom, prenom) VALUES ('Duchamp', 'Marcel');
INSERT INTO auteurs (nom, prenom) VALUES ('Von Gloeden', 'Elisa');
INSERT INTO auteurs (nom, prenom) VALUES ('Mapplethorpe', 'Gil');
INSERT INTO auteurs (nom, prenom) VALUES ('Renoir', 'Pierre-Auguste');

INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Portrait bleu', '2000-01-01', 1, 'image1.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Marcheur', '2000-01-01', 1, 'image2.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Sol Rouge', '2000-01-01', 2, 'image3.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Bulles chaudes', '2010-01-01', 2, 'image4.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Nature morte', '1985-01-01', 2, 'image5.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Grotte vivante', '2000-01-01', 2, 'image6.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Travail Soir', '2000-01-01', 1, 'image7.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Citron salade', '2000-01-01', 1, 'image8.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Floue artistique', '2000-01-01', 1, 'image9.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Auto', '2000-01-01', 2, 'image10.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Feuilles violettes', '2000-01-01', 1, 'image11.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Ville Nuit', '2000-01-01', 1, 'image12.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Baignade', '1999-01-01', 2, 'image13.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Caverne Espoir', '2000-01-01', 1, 'image14.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Cerveau Cardiaque', '2000-01-01', 2, 'image15.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Rayons Luminieux', '2000-01-01', 2, 'image16.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Lunette Triangle', '2000-01-01', 1, 'image17.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Route Nuit', '2000-01-01', 1, 'image18.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Sapin Hall', '2000-01-01', 1, 'image19.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Vacances Ski', '2000-01-01', 1, 'image20.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Ocean Matin', '2000-01-01', 1, 'image21.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Escalator Panne', '1986-03-01', 1, 'image22.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Voiture Jaune', '2010-01-01', 2, 'image23.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Coucher de Soleil', '2018-06-21', 1, 'image24.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Montagnes Enneigées', '2019-12-14', 2, 'image25.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Lac Paisible', '2020-08-07', 1, 'image26.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Forêt Tropicale', '2017-03-12', 2, 'image27.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Champ de Fleurs', '2021-04-26', 1, 'image28.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Ville Nocturne', '2019-11-23', 2, 'image29.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Plage d Été', '2022-07-05', 1, 'image30.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Paysage Urbain', '2020-10-01', 1, 'image31.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Rue sous la Pluie', '2021-12-09', 1, 'image32.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Desert Aride', '2019-05-16', 2, 'image33.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Cascade', '2020-07-15', 1, 'image34.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Désert', '2021-05-20', 2, 'image35.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Architecture', '2021-01-15', 2, 'image36.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Feu d artifice', '2022-07-14', 1, 'image37.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Château', '2022-06-01', 2, 'image38.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Aurore Boréale', '2021-12-25', 1, 'image39.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Papillon', '2023-04-20', 2, 'image40.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Pluie de météores', '2023-08-12', 1, 'image41.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Vague géante', '2022-11-30', 2, 'image42.jpg', 3);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Parc d automne', '2023-10-15', 1, 'image43.jpg', 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Soleil levant', '2023-05-01', 2, 'image44.jpg', 2);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Paysage de montagne', '2023-09-15', 1, 'image45.jpg', 1);
INSERT INTO images (nom, date, orientation, fichier, id_auteur) VALUES ('Chaton', '2023-07-30', 2, 'image46.jpg', 3);


INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Scène urbaine', '2023-04-10', 1, 'image47.jpg', 4, 15);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Champ de tournesols', '2023-08-25', 2, 'image48.jpg', 1, 4);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Pont la nuit', '2023-10-05', 1, 'image49.jpg', 2, 16);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Forêt brumeuse', '2023-11-11', 2, 'image50.jpg', 3, 12);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Espace', '2023-12-12', 1, 'image51.jpg', 4, 7);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Rivière calme', '2024-01-18', 2, 'image52.jpg', 1, 45);
INSERT INTO images (nom, date, orientation, fichier, id_auteur, likes) VALUES ('Tempête en mer', '2024-02-24', 1, 'image53.jpg', 2, 20);


INSERT INTO commentaires (texte, id_image) VALUES ('Superbe image !', 28);
INSERT INTO commentaires (texte, id_image) VALUES ('Magnifique !', 5);
INSERT INTO commentaires (texte, id_image) VALUES ('J adore !', 28);