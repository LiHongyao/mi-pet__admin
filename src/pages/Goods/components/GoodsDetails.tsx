import React, { memo, useState } from 'react'
import { Carousel } from 'antd'
import Utils from '../../../utils/utils'
import './GoodsDetails.scss'

interface IProps {
  data: IPET.IGoodsDetails
}
const GoodsDetails: React.FC<IProps> = props => {
  const { data } = props;
  // state
  const [selectedInex, setSelectedInex] = useState(0);
  const [spec, setSpec] = useState(data.specs[0]);
  // events
  const onSpecItemTap = (spec: IPET.ISpec, index: number) => {
    setSpec(spec);
    setSelectedInex(index);
  }
  // render
  return (
    <div className="goods-details">
      {/* banner */}
      <Carousel>
        {data.images.map((imgUrl: string, index: number) => (
          <img key={index} src={imgUrl} alt="" className="carousel-img"  />
        ))}
      </Carousel>
      {/* 商品名称 */}
      <h3 className="title">{data.title}</h3>
      {/* 价格 */}
      <div className="price-box">
        <p className="price">批发价：¥{spec.wholesalePrice}</p>
        <p className="price">零售价：¥{spec.originalPrice}</p>
      </div>
      {/* 规格 */}
      <div className="specs">
        {data.specs.map((spec: IPET.ISpec, index: number) => (
          <section key={index} className={`spec-item ${selectedInex === index ? 'selected' : ''}`} onClick={() => { onSpecItemTap(spec, index) }}>{spec.title}</section>
        ))}
      </div>
      {/* 商品信息 */}
      <div className="goods-info">
        <header className="title-header">  
          <section className="line"></section>
          <h1>商品信息</h1>
          <section className="line"></section>
        </header>
        <div className="goods">
          <section>品牌：{data.brand}</section>
          <section>品种：{data.breed}</section>
          <section>分类：{data.category}</section>
          <section>保质期：{data.exp}个月</section>
          <section className="up-time">上传时间：{Utils.dateFormat(data.upTime * 1000)}</section>
        </div>
      </div>
      {/* 商品详情 */}
      <div className="details">
        <header className="title-header">  
          <section className="line"></section>
          <h1>商品详情</h1>
          <section className="line"></section>
        </header>
        {data.infos.map((imgUrl: string, index: number) => (
          <img key={'img-info' + index} src={imgUrl} width="100%" alt="" />
        ))}
      </div>
    </div>
  )
}

export default memo(GoodsDetails);
