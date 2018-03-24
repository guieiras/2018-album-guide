const mongoose = require('mongoose');
const Album = mongoose.model('Albuns');

module.exports = {
  createAlbum: (request, response) => {
    Album.create({ name: request.body.name, stickers: {} }).then((album) => {
      response.json({ name: album.name, token: album._id });
    }).catch((err) => {
      response.status(422).json(err);
    })
  },
  getAlbum: (request, response) => {
    Album.findOne({ _id: request.params.albumId })
      .then((album) => { album ? response.send(album) : response.sendStatus(404); })
      .catch(() => { response.sendStatus(404); });
  }
}
