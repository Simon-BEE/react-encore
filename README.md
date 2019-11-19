# Structure MVC (Model View Controller)
------------------------------------------

Une structure pour Symfony flex avec docker. 

## Installation

Faire un git clone de ce projet dans un nouveau dossier    
> git clone https://github.com/Simon-BEE/SYMFOstructure.git ./    

Copier le contenu .env.sample dans un nouveau fichier nommé .env et remplacé avec les valeurs voulues.    

Choisir le docker-compose correspondant à son environnement docker:    
* Si on utilise ce [webproxy](https://github.com/evertramos/docker-compose-letsencrypt-nginx-proxy-companion), renommer le docker-compose-webproxy.yml en docker-compose.yml.
* Pour un environnement plus classique vous n'avez rien à modifier dans le docker-compose.yml déjà existant.

Executer la commande ci-dessous dans un terminal, dans le dossier que vous avez créé    
> ./start.sh

## Have fun!

------------------------------------------
modified by Skymon
