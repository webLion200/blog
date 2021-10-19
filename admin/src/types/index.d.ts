type UserInfoType = {
  userName?: string;
  telPhone?: number | string;
  password?: string;
}

type CatalogType = {
  cataId: string;
  cataName?: string;
  [propName: string]: any
}

type ArticleType = {
  cataId?: string;
  articleId: string;
  articleName: string;
  content: string;
  published?: number; // 发布状态(0 未发布， 1 已发布)
  [propName: string]: any
}