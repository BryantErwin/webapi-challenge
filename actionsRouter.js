const express = require("express");

const actionModel = require("./data/helpers/actionModel.js");

const router = express();
router.use(express.json());


router.post("/", (req, res) => {
    const notes = req.body.notes;
    const description = req.body.description;

    if(!notes && !description && !description.length < 128) {
        res.status(400).json({message: "Up to 128 long, required."})
    } else {
        actionModel
            .insert(req.body)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({error: "Must include notes description, and project ID"})
            });
    };

});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    actionModel
        .get(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Error with the server"})
        })
})

router.delete("/:id", (req, res)=> {
    const { id } = req.params;

    actionModel
        .remove(id)
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Was not found on the server"})
        })
})


router.put("/:id", (req, res) => {
    const notes = req.body.notes;
    const description = req.body.description;
    const { id } = req.params;

    if(!notes && !description && !description.length < 128) {
        res.status(400).json({message: "Up to 128 characters long, required."})
    } else {
        actionModel
            .update(id, req.body)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: "Must included notes description, and project ID"})
            });

    };
})




module.exports = router;