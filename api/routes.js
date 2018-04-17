module.exports = function (app) {
  const AlbumController = require('./controllers/AlbumController');

  app.route('/albuns')
    .post(AlbumController.createAlbum);

  app.route('/albuns/:albumId')
    .get(AlbumController.getAlbum)
    .post(AlbumController.postStickers)
    .delete(AlbumController.deleteAlbum);
};
