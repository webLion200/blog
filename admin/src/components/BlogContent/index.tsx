import { FC } from "react";
import { Input } from 'antd';
import './index.css'
const BlogContent:FC = () => {
  return (
    <div className="blog-content-wrap">
      <div className="title-wrap"><Input className="input-title" value="2021-09-08" type="text" maxLength={20}/></div>
      <div className="markdown-wrap">
1223
      </div>
    </div>
  )
}

export default BlogContent