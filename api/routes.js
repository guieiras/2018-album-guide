module.exports = function (app) {
  const AlbumController = require('./controllers/AlbumController');

  app.route('/albuns')
    .post(AlbumController.createAlbum);

  app.route('/albuns/:albumId')
    .get(AlbumController.getAlbum)
    .put(AlbumController.postStickers);
};
