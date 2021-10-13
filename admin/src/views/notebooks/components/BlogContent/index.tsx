import { FC, useState, useEffect  } from "react";
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

import marked from "marked";
import hljs  from "highlight.js";
import 'highlight.js/styles/github.css';
import { useTypedSelector } from '../../store';
import { effects, actions } from "../../slice";

import './index.css'

const { TextArea } = Input;

const BlogContent:FC = () => {
  const { currArticleInfo } = useTypedSelector(state => state.notebook)
  const dispatch = useDispatch()

  const [content, setContent] = useState('');
  const [isPreview, setPreviewStatus] = useState(false);
  const [_html, setHtml] = useState('');

  useEffect(() => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'javascript';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: false,
      smartLists: true,
    });
    const _html = marked(content);
    setHtml(_html)
  })
  const changeContent = (e: any) => {
    setContent(e.target.value)
  }

  const handlePreview = () => {
    setPreviewStatus(!isPreview)
  }

  const handleChangeTitle = (e: any) => {
    const articleName = e.target.value
    dispatch(actions.changeCurrArticleInfo({
      article_name: articleName
    }))
  }

  const handleSaveTitle = () => {
    dispatch(effects.updateArticle())
  }
console.log(currArticleInfo, 'currArticleInfo')
  return (
    <div className="blog-content-wrap">
      <div className="title-wrap">
        <Input className="input-title" value={currArticleInfo['article_name']} type="text" maxLength={20} onChange={handleChangeTitle} onBlur={handleSaveTitle}/>
        <div className="actions-btn">
          <Button type="default" onClick={handlePreview}>
            {
              isPreview ? '取消预览' : '预览'
            }
          </Button>
        </div>
      </div>
      <div className="markdown-wrap">
        {
          isPreview ? 
          <div dangerouslySetInnerHTML={{__html: _html}} /> : 
          <TextArea placeholder="请输入文章内容" className="textarea" autoSize={{minRows: 20}} bordered={false} value={content}  onChange={changeContent}/>
        }
      </div>
    </div>
  )
}

export default BlogContent