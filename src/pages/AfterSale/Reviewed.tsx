import React, { useState, useEffect } from 'react';
import { Table,message} from 'antd';
import { ColumnProps} from 'antd/es/table'
import Utils from '../../utils/utils';
import './index.scss';
import Api from '../../api';


interface IExamine {
  orderId: number, 
  result: number, 
  failReason?: string
}
const AfterSale = () => {
  // 定义列
  const columns:ColumnProps<IPET.IAfterSaleItem>[]  = [
    {
      title: '序号',
      width: 45,
      align: 'center',
      fixed: 'left',
      render:(text: IPET.IAfterSaleItem, record:IPET.IAfterSaleItem, index: number) => index + 1
    },
    {
      title: '商品名称',
      width: 200,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '规格名称',
      dataIndex: 'specName',
      key: 'specName',
      align: 'center'
    },
    {
      title: '购买数量',
      dataIndex: 'num',
      key: 'num',
      align: 'center'
    },
    {
      title: '订单金额',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) => status === 1 ? '已收到货' : '未收到货'
    },
    {
      title: '退款原因',
      dataIndex: 'reason',
      key: 'reason',
      align: 'center'
    },
    {
      title: '图片说明',
      dataIndex: 'images',
      key: 'images',
      align: 'center',
      render: (images: string[] | null) => {
        return (images && images.length > 0) ? <img src={images[0]} alt="" className="img" /> : ''
      }
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      align: 'center',
      width: 180,
      render: (timeStamp: number) => Utils.dateFormat(timeStamp)
    },
    {
      title: '物流单号',
      dataIndex: 'logisticsNo',
      key: 'logisticsNo',
      width: 180,
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      align: 'center',
      width: 180,
    },
    {
      title: '处理结果',
      dataIndex: 'refundStatus',
      key: 'refundStatus',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (refundStatus: number) => {
        switch(refundStatus) {
          case 701:
            return '处理中';
          case 702:
            return '已拒绝';
          case 703:
            return '已退款';
          default:
            return '';
        }
      }

    }
  ];

  // state
  const [data, setData] = useState([] as IPET.IAfterSaleItem[]);

  // methods
  const getData = () => {
    Api.order.refundList({
      page: 1,
      pageSize: 10000,
      status: 1
    }).then(res => {
      setData(res.data.data);
    })
  };
  const handleExamine = (params: IExamine) => {
    Api.order.examine(params).then(res => {
      message.success('操作成功');
      setData(Utils.del<IPET.IAfterSaleItem>(data, 'orderId', params.orderId));
    }).catch(() => {})
  }
  // events
 

  // effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="after-sale">
      <header>退款售后 - 已处理</header>
      <Table
        scroll={{x: 1500}}
        dataSource={data}
        columns={columns}
        size="middle"
        bordered
        rowKey={(record: IPET.IAfterSaleItem) => record.orderId}
      ></Table>
    </div>
  );
};

export default AfterSale;
