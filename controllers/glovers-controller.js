function GloversController(db) {
  return {
    list() {
      return db.glovers;
    },
    add(data) {
      if (data.name && data.name.length > 1) {
        const gloverId = +new Date();
        db.glovers[gloverId] = {
          name: data.name,
          id: gloverId,
        };
        return ok();
      } else {
        throw new Error('Provide name for the glover');
      }
    },
    delete(gloverId) {
      if (db.glovers[gloverId]) {
        delete db.glovers[gloverId];
        return ok();
      } else {
        throw new Error(`Glover with id=${gloverId} not found`);
      }
    },
  };
}

function ok() {
  return { status: 'ok' };
}

module.exports = GloversController;
