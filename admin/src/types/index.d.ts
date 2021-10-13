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