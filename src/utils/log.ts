const log = {
  /**
     * success
     * @param val
     */
  s: (val: any, title?: string) => {
    console.group(`${title ?? 'success'} ->`);
    console.log(val);
    console.groupEnd();
  },

  /**
     * info
     * @param val
     */
  i: (val: any, title?: string) => {
    console.group(`${title ?? 'info'} ->`);
    console.log(val);
    console.groupEnd();
  },

  /**
     * debug
     * @param val
     */
  d: (val: any, title?: string) => {
    console.group(`${title ?? 'debug'} ->`);
    console.log(val);
    console.groupEnd();
  },
  /**
     * error
     * @param val
     */
  e: (val: any, title?: string) => {
    console.group(`${title ?? 'error'} ->`);
    console.log(val);
    console.groupEnd();
  },
};

export default log;
