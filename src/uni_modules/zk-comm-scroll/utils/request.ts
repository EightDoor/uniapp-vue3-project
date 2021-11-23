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
const req = <T = any>(
  url: string,
  method?:
  Methods,
  data?: any,
  header?: Object,
): Promise<T> => new Promise((resolve, reject) => {
    toast.showLoading('数据请求中...');
    uni.request({
      url,
      data,
      method: method ?? 'POST',
      header,
      success(res) {
        const result = res.data as T;

        resolve(result);
      },
      fail(err) {
        reject(err);
        toast.showMsg('数据加载失败', 'error');
      },
      complete() {
        toast.hideLoading();
      },
    });
  });

export default req;
