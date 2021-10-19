import { FC, useState, useEffect  } from "react";
import { Input, Button, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

import marked from "marked";
import hljs  from "highlight.js";
import 'highlight.js/styles/github.css';
import { useTypedSelector } from '../../store';
import { effects, actions } from "../../slice";
import WIcon from "../Icon";

import './index.css'

const { TextArea } = Input;

const BlogContent:FC = () => {
  const { currArticleInfo } = useTypedSelector(state => state.notebook)
  const dispatch = useDispatch()

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
    const _html = marked(currArticleInfo.content);
    setHtml(_html)
  })
  const changeContent = (e: any) => {
    const content = e.target.value
    dispatch(actions.changeCurrArticleInfo({
      content
    }))
  }

  const handlePreview = () => {
    setPreviewStatus(!isPreview)
  }

  const handleChangeTitle = (e: any) => {
    const articleName = e.target.value
    dispatch(actions.changeCurrArticleInfo({
      articleName
    }))
  }

  const handleSave = () => {
    dispatch(effects.updateArticle())
  }


  return (
    <div className="blog-content-wrap">
      <div className="title-wrap">
        <Input className="input-title" value={currArticleInfo['articleName']} type="text" maxLength={20} onChange={handleChangeTitle} onBlur={handleSave}/>
        <div className="actions-btn">
        <Tooltip title="保存">
          <WIcon className="mr10" type="save" color="#096dd9" size={32} style={{cursor: 'pointer'}} onClick={handleSave}/>
        </Tooltip>
        <Tooltip title="预览">
          <WIcon type="preview" color="#999" size={30} onClick={handlePreview} style={{cursor: 'pointer'}}/>
        </Tooltip>

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
          <TextArea placeholder="请输入文章内容" className="textarea" autoSize={{minRows: 20}} bordered={false} value={currArticleInfo.content}  onChange={changeContent}/>
        }
      </div>
    </div>
  )
}

export default BlogContent