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
  },
  postStickers: (request, response) => {
    const stickers = request.body.stickers;
    if (stickers) {
      const updateParams = Object
        .keys(stickers)
        .reduce((memo, stickNumber) => {
          memo[`stickers.${stickNumber}`] = stickers[stickNumber];
          return memo;
        }, {})

      Album.update({ _id: request.params.albumId }, { $inc: updateParams })
        .then(() => {
          Album.findOne({ _id: request.params.albumId })
          .then((album) => {
            response.send(Object.keys(stickers).reduce((memo, sticker) => {
              memo[sticker] = album.stickers[sticker];
              return memo;
            }, {}));
          })
        })
        .catch(() => { response.sendStatus(404); });
    } else {
      response.sendStatus(422);
    }
  },
  deleteAlbum: (request, response) => {
    Album.findOneAndRemove({ _id: request.params.albumId, name: request.body.name })
      .then((album) => { response.sendStatus(album ? 204 : 404); })
      .catch(() => { response.sendStatus(404); });
  }
}
