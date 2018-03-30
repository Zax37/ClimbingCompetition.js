// EXPRESS FRAMEWORK FOR ROUTER
const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    res.json(
        {
            "version": "1.0",
            "links": [
            ]
        }
    );
});

module.exports = router;