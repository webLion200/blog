import { useMount } from 'ahooks';


const useAppData = () => {
  useMount(async () => {
    // 这里做一些数据初始化的请求
  })

  return null
}

export default useAppData;
