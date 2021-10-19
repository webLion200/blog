module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Catalogs = app.model.define('catalogs', {
    cataId: { type: INTEGER, primaryKey: true },
    userId: INTEGER,
    cataName: STRING,
    createdAt: DATE,//创建时间
    updatedAt: DATE,
  });

  return Catalogs
}