import React, { useState, useEffect } from 'react'
import { Table, Space, Button, message, Modal } from 'antd'
import { ColumnProps} from 'antd/es/table'
import Api from '../../api'
import Utils from '../../utils/utils'
import GoodsDetails from './components/GoodsDetails'
import './index.scss'




const Goods = () => {
  const columns:ColumnProps<IPET.IGoods>[] = [
    {
      title: '序号',
      align: 'center',
      fixed: 'left',
      width: 50,
      render:(text: IPET.IGoods, record: IPET.IGoods, index: number) => index + 1
    },
    {
      title: '缩略图',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: 'center',
      width: 80,
      render: (imgUrl: string) => (
        <img src={imgUrl} alt="" className="thumbnail"/>
      )
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      align: 'center',
      width: 80
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      width: 80
    },
    {
      title: '品种',
      dataIndex: 'breed',
      key: 'breed',
      align: 'center',
      width: 80
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 100,
      render: (data: IPET.IGoods) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => { onLookDetails(data.goodsId); }}>查看详情</Button>
          <Button size="small" type="primary" onClick={() => { onTapStatus({goodsId: data.goodsId, status: 1}); }}>上架</Button>
          <Button size="small" type="primary" danger onClick={() => { onTapStatus({goodsId: data.goodsId, status: 2}); }}>拒绝</Button>
        </Space>
      ),
    },
  ];
  
  const [data, setData] = useState([] as IPET.IGoods[]);
  const [goodsDetails, setGoodsDetails] = useState<IPET.IGoodsDetails | null>(null);
  const [modalVisible, setModalVisible] = useState(false)

  // methods
  const getData = () => {
    Api.goods.list({
      status: 0,
      page: 1,
      pageSize: 10000
    }).then(res => {
      setData(res.data.data)
    }).catch(() => {})
    
  };
  
  // events
  const onLookDetails = (goodsId: number) => {
    setModalVisible(true);
    Api.goods.details(goodsId).then(res => {
      setGoodsDetails(res.data);
    }).catch(() => {})
  }
  const onTapStatus = (params: {goodsId: number, status: number}) => {
    Api.goods.status(params).then(res => {
      message.success('操作成功');
      setData(Utils.del<IPET.IGoods>(data, 'goodsId', params.goodsId));
    })
  }
  const onCancel = () => {
    setModalVisible(false);
    setGoodsDetails(null);
  }

  // effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <header>商品管理 - 最近上传</header>
      <Table 
        loading={false}
        dataSource={data} 
        columns={columns} 
        size="middle"
        bordered
        rowKey={(record: IPET.IGoods) => record.goodsId}
      />
      <Modal
        title="商品详情："
        style={{ top: 20 }}
        visible={modalVisible}
        footer={null}
        onCancel={onCancel}
      >
        <div className="modal-content">
         { goodsDetails && <GoodsDetails data={goodsDetails} />}
        </div>
      </Modal>
    </div>
  )
}

export default Goods;