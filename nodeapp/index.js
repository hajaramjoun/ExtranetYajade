






// /**
//  * Add documents into the Solr index.
//  */
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var admin = require("firebase-admin");
var serviceAccountKey = require("./serviceAccountKey.json");
var solr = require('solr-client');
var express = require('express')
var app = express()
const bodyParser = require('body-parser');
const appRoutes = express.Router();
app.use(bodyParser.json());
var solrnode = require('solr-node');
//Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });




// Create a client
var clientNode = new solrnode({
    host: 'localhost',
    port: '8983',
    core: 'core',
    protocol: 'http'
});




// Create a client
var client = solr.createClient({
    host: 'localhost',
    port: '8983',
    core: 'core',
    protocol: 'http'
});
// // sudo docker cp solr:/var/solr/data/get/conf/managed-schema ./^C
// // docker cp /home/yajade/shareFolder/ExtranetYajade/nodeapp//home/yajade/shareFolder/ExtranetYajade/nodeapp solr:/var/solr/data/get/conf/managed-schema      
let applications = []
let docs = []
for (var i = 0; i <= 10; i++) {
    var doc = {
        
        foreignKey: 'ApplicationA' + i,
        name: 'ApplicationA' + i,
        client: 'Rjue',
        registered: '2018/01/01',
        description: 'Les clients de yajade  c est  sma et rjue  et  cjue ',
        imageLien: "https://nexus.yajade.com/static/rapture/resources/images/loading-logo.png",
        prix: 0 + i,
        saison: 'automne',
        lien: 'Pending'
    }
    docs.push(doc);
    applications.push(doc);
    console.log("ajout");
}

for (var i = 0; i <= 10; i++) {
    var doc = {
        foreignKey: 'ApplicationB' + i,
        name: 'ApplicationB' + i,
        registered: '2018/01/01',
        client: 'cjue',
        description: ' yajade a bien structurer l application rjue ',
        imageLien: "https://jenkins.yajade.com/static/a1bced40/images/headshot.png",
        lien: 'lien',
        prix: 0 + i,
        saison: 'hiver',
        lien: 'Pending'
    }
    docs.push(doc);
    applications.push(doc);
    console.log("ajout");
}
// Add documents
for (var i = 0; i <= 10; i++) {
    var doc = {
        foreignKey: 'ApplicationC' + i,
        name: 'ApplicationC' + i,
        registered: '2018/01/01',
        client: 'sma',
        description: ' yajade a bien structurer l application sma ',
        imageLien: "https://docs.gitlab.com/assets/images/gitlab-logo.svg",
        lien: 'lien',
        prix: 0 + i,
        saison: 'ete',
        lien: 'Pending'
    }
    docs.push(doc);
    console.log("ajout");
}
// Add documents
for (var i = 0; i <= 10; i++) {
    var doc = {
        foreignKey: 'ApplicationD' + i,
        name: 'ApplicationD' + i,
        registered: '2018/01/01',
        description: ' yajade a bien structurer l application cjue ',
        imageLien: "https://docs.gitlab.com/assets/images/gitlab-logo.svg",
        prix: 0 + i,
        saison: 'printemps',
        lien: 'Pending'
    }
    docs.push(doc);
    applications.push(doc);
    console.log("ajout");
}





app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');//  172.17.0 ip for your vm 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

appRoutes.route('/doc').post(function (req, res) {

    console.log(req.body.query.toString());
    // var query = client.createQuery().q(`description:yajade`);
    var query = client.createQuery().q(`description:${req.body.query.toString()}`).start(0).rows(220);
    // var query = client.createQuery().q(`description:${req.body.query.toString()}`).start(0).rows(44);
    // var query = client.createQuery().q(`${req.body.query.toString()}`);
    req.body.checkboxs.map((item) => {
        item.checkbox.map((itemCheck) => {
            if (itemCheck.checked == true) {
                console.log(itemCheck.id.toString());
                console.log(itemCheck.name.toString());
                query = query.matchFilter(itemCheck.id.toString(), itemCheck.name.toString());
            }
        });
    });
    query = query
        .facet({
            field: 'saison',
        })
        .facet({
            field: 'client',

        })
        .facet({
            field: 'prix',

        });
    // query = client.createQuery().q(req.body.query.toString())
    // .start(2).rows(5).matchFilter('Saison', 'hiver')
    //     .facet({
    //         field: 'prix',

    //     });
    client.search(query, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            const response = obj.response;
            console.log(obj.facet_counts.facet_fields.saison.length);
            console.log(obj.facet_counts.facet_fields.prix.length);
            console.log(obj.facet_counts.facet_fields.client.length);

            if (response && response.docs) {
                res.json(obj)
            }
        }
    })


});
appRoutes.route('/docs').get(function (req, res) {

 
    // var query = client.createQuery().q(`description:yajade`);
    var query = client.createQuery().q(`*:*`).start(0).rows(220);
 
    query = query
        .facet({
            field: 'saison',
        })
        .facet({
            field: 'client',

        })
        .facet({
            field: 'prix',

        });
  
    client.search(query, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            const response = obj.response;
            if (response && response.docs) {
                res.json(obj)
            }
        }
    })


});

appRoutes.route('/add').get(function (req, res) {

    docs.forEach((doc) => {
        clientNode.update(doc, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Response:', result.responseHeader);
        });
    });
    res.json("obj")
});
appRoutes.route('/deleteAll').post(function (req, res) {

   
const deleteAllQuery = '*';    // delete all

clientNode.delete(deleteAllQuery, function(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Response:', result.responseHeader);
});
const application = req.body;
application.forEach((doc) => {
    clientNode.update(doc, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });
});
});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   }
// })

// var upload = multer({ storage: storage }).single('file')
appRoutes.route('/upload').post(function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log( req.body )
   return res.status(200).send(req.file)

})
   


});






appRoutes.route('/addapp').post(function (req, res) {
    let doc = req.body;
    console.log(req.body);

    clientNode.update(doc, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });

    res.json("Ajout")
});
appRoutes.route('/deleteUser').post(function (req, res) {
    console.log(req.body.email)
    admin.auth().deleteUser(req.body.uid)
    .then(function() {
        res.status(200).json({code:'Successfully'});
    
    })
    .catch(function(error) {
        res.status(201).json(error)
    });

});
appRoutes.route('/addUser').post(function (req, res) {

    console.log(req.body.emailState);
    console.log(req.body.passwordState);
    console.log(req.body.uid);
    
    admin.auth().createUser({
        uid: req.body.uid,
        displayName: req.body.nameState,
       // photoURL:req.body.imageState,
        email: req.body.emailState,
        password: req.body.passwordState
    })
    .then(function(userRecord) {
        res.status(200).json({code:'Successfully'});
          })
        .catch(function(error) {
         res.status(201).json(error) // See the UserRecord reference doc for the contents of userRecord.
        });

});
appRoutes.route('/updateUser').post(function (req, res) {
console.log(req.body.uid)

    admin.auth().updateUser(req.body.uid, {
        displayName: req.body.nameState,
        email: req.body.emailState,
        password: req.body.passwordState,
      })
      .then(function(userRecord) {
        res.status(200).json({code:'Successfully'});
      })
      .catch(function(error) {
        res.status(201).json(error)
      });
});
appRoutes.route('/update').post(function (req, res) {

    docState = {
        name: req.body.name.nameState,
        client: req.body.client.clientState,
        registered: req.body.registered.registeredState,
        description: req.body.description.descriptionState,
        imageLien: req.body.imageLien.imageLienState,
        prix: req.body.prix.prixState,
        saison: req.body.saison.saisonState,
        lien: req.body.lien.lienState,
    }

    const deleteAllQuery = `name:${req.body.name.name}`;    // delete all
    clientNode.delete(deleteAllQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });

    clientNode.update(docState, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });
});

appRoutes.route('/delete').post(function (req, res) {
    const deleteAllQuery = `name:${req.body.name}`;    // delete all
    clientNode.delete(deleteAllQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Response:', result.responseHeader);
    });

});
appRoutes.route('/api/login').post(function (req, res) {
    console.log(req.body);
  
    // console.log( req.body.password);   
    if (req.body) {
        res.status(200).json({ 'email': 'email added successfully' });
    }
    // if (req.body.name == 'hajar' && req.body.password == 'hajar') {
    //     res.status(200).json({ 'email': 'email added successfully' });
    // }
    else {
        return res.send(401, {
            'status': 401,
            'code': 1, //custom code that makes sense for your application
            'message': 'You are not a premium user',
            'moreInfo': 'https://myawesomeapi.io/upgrade'
        });
    }




})
appRoutes.route('/api/application').get(function (req, res) {
      console.log("req.body.password");
      res.json({
        applications
    })
});


app.use('/', appRoutes);

app.listen(8081, function () {
    console.log('app listening on port 801!')
})