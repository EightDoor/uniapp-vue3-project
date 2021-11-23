
import toast from './toast';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * 统一请求
 * @param url 
 * @param method 
 * @param data 
 * @param header 
 * @returns 
 */
const req = (url: string, method: Methods, data?: any, header?: Object) => {
  return new Promise((resolve, reject) => {
    toast.showLoading("数据请求中...");
      uni.request({
        url,
        data,
        method,
        header,
          success(res) {
            const data = res.data;
            resolve(data)
          },
          fail(err) {
            reject(err);
            toast.showMsg("数据加载失败", 'error')
          },
          complete() {
            toast.hideLoading();
          }
        })
  })
}

export default req;