const Toast = {
  /**
   * 弹出提示
   * @param title
   * @param icon
   */
  showMsg(title: string, icon?:'success' | 'loading' | 'error' | 'none') {
    uni.showToast({
      title,
      position: 'center',
      icon: icon ?? 'success',
    });
  },
  /**
   * 显示加载中
   * @param title
   * @returns
   */
  showLoading(title: string) {
    return uni.showLoading({
      title,
      // 蒙层
      mask: true,
    });
  },
  /**
   * 隐藏加载
   */
  hideLoading() {
    uni.hideLoading();
  },
};

export default Toast;
