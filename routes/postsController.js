const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
   PostsModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error to get data : ' + err);
   });
});
//ajouter ou creer les donnee
router.post('/', (req, res) => {
   console.log(req.body);
   const newRecord = PostsModel({
      author: req.body.author,
      message: req.body.message,
   });

   newRecord.save((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error to get data : ' + err);
   });
});
//modifier les donnee
router.put('/:id', (req, res) => {
   if (!ObjectId.isValid(req.params.id))
      return res.status(400).send('ID unknow : ' + req.params.id);

   const updateRecord = {
      author: req.body.author,
      message: req.body.message,
   };

   PostsModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateRecord },
      { new: true },
      (err, docs) => {
         if (!err) res.send(docs);
         else console.log('Update error :' + err);
      },
   );
});
//supprimer les donnes

router.delete('/:id', (req, res) => {
   if (!ObjectId.isValid(req.params.id))
      return res.status(400).send('ID unknow : ' + req.params.id);

   PostsModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Delete error : ' + err);
   });
});
module.exports = router;
