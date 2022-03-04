les commandes pour  déployer L'application sous Docker
 


  - docker run  --network solrapp --name solr -d -p 8983:8983 -t solr
  
  - docker exec -it --user=solr solr bin/solr create_core -c get

 
  - cd  nodeapp

  - sudo docker  build  -t hajar/node .

  - sudo docker run --name node  -p 8081:8081 --network solrapp   hajar/node 

  - sudo docker build -t hajar/yajade .

  - sudo docker run --name yajade  -p 3000:3000  hajar/yajade 
