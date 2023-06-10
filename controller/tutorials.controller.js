const db = require('../models');
// models path depends on your structure
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    console.log('\n \n creating tutorial...')
    console.log(req.body);

    // Validating the request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can be placed here!'
        });
        return;
    }

    // Creating a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Saving the Tutorial in the database
    Tutorial.create(tutorial).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            Message:
                err.message || 'Some errors will occur when creating a tutorial'
        });
    });
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: '%${title}%' } } : null;

    Tutorial.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || 'Some error have occurred when retrieving the tutorials.'
        });
    });
};