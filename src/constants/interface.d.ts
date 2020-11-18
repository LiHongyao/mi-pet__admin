export = IPET;
export as namespace IPET;

declare namespace IPET {
  // 商家列表字段
  interface IBusiness {
    id: number, // 商家id
    username: string, // 商家名称
    phone: string, // 商家电话
    applyTime: number // 申请商家时的时间戳
  }
  // 售后列表
  interface IAfterSaleItem {
    title: string, // 商品名称
    specName: string; // 购买的规格名称
    num: number, // 购买数量
    price: number, // 订单金额
    status: number,  // 订单状态(0未发货、1已完成)
    reason: string, // 退款原因
    images?: string[], // 退款时上传的图片/如果没有就返回空数组
    applyTime: number, // 申请退款时的时间戳
    logisticsNo: string, // 物流单号
    orderId: number // 订单id
    orderNo: string, // 订单编号
    handleRes?: number, // 处理结果 0 拒绝 1 接受（这个字段可选，只在处理之后返回）
  }

  // 商品列表
  interface IGoods {
    goodsId: number, // 商品id
    thumbnail: string, // 缩略图
    title: string, // 商品名称
    brand: string, // 品牌
    category: string, // 分类
    breed: string, // 品种
    upTime: number //上传时间(时间戳)
  }

  // 商品详情页
  interface ISpec {
    title: string, // 规格名称
    wholesalePrice: number, // 批发价
    originalPrice: number // 零售价
  }
  interface IGoodsDetails extends IGoods {
    specs: ISpec[], // 规格列表
    exp: number, // 保质期
    images: string[], // banner图
    infos: string[] // 详情图
  }


}