module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize;
  const Articles = app.model.define('articles', {
    articleId: { type: INTEGER, primaryKey: true },
    userId: INTEGER,
    cataId: INTEGER,
    published: ENUM(0, 1),
    articleName: STRING,
    content: TEXT,
    createdAt: DATE,//创建时间
    updatedAt: DATE,
  });

  return Articles
}