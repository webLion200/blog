type UserInfoType = {
  userName?: string;
  telPhone?: number | string;
  password?: string;
}

type CatalogType = {
  cata_id: string;
  cata_name?: string;
  [propName: string]: any
}

type ArticleType = {
  cata_id?: string;
  article_id: string;
  article_name: string;
  content: string;
  published?: number; // 发布状态(0 未发布， 1 已发布)
  [propName: string]: any
}