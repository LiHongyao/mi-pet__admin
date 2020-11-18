

class Utils {
  // 构造单例
  private static instance: Utils;
  private constructor() { }
  static defaultUtils() {
    if (!this.instance) {
      this.instance = new Utils();
    }
    return this.instance;
  }
  /**
   * 获取queryString参数值
   * @param name 
   */
  public static getUrlParamByName(name: string) {
    // \b 边界   
    // ?<= 向后匹配 
    // 字符串转成正则表达式，其中的'\b'类型的特殊字符要多加一个'\'
    let reg = new RegExp(`(?<=\\b${name}=)[^&]*`);
    let str = window.location.search || '';
    let target = str.match(reg);
    if (target) {
      return target[0]
    }
    return '';
  }

  /**
   * 获取列表高度
   * @param el 参照元素
   */
  public static getListHeight(el?: HTMLElement) {
    console.log(window.screen.height);
  }

  /**
   * 处理日期格式
   * @param timeStamp  时间错
   * @param format 格式
   */
  public static dateFormat(timeStamp: number, format?: string) {

    function formatNumber(n: any) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }

    var date = new Date(timeStamp);
    var year = formatNumber(date.getFullYear());
    var month = formatNumber(date.getMonth() + 1);
    var day = formatNumber(date.getDate());
  
    var hour = formatNumber(date.getHours());
    var minute = formatNumber(date.getMinutes());
    var second = formatNumber(date.getSeconds());
  
    if(format) {
      return format
      .replace('yyyy', year)
      .replace('mm', month)
      .replace('dd', day)
      .replace('hh', hour)
      .replace('mm', minute)
      .replace('ss', second);
    }
    var res = "";
    res += year + '-' + month  + '-' + day + ' ';
    res += hour + ':' + minute + ':' + second;
    return res;
  }
  /**
   * 删除数组中的指定元素
   * @param arr 数据源
   * @param id 键
   */
  
  
  public static del<T>(arr: T[], key: keyof T, value: any): T[] {
    let tmp = [...arr];
    let index = tmp.findIndex((item:T) => item[key] === value);
    tmp.splice(index, 1);
    return tmp;
  }
}
export default Utils;
