import React, { useState, useEffect } from 'react';
import { Table, Space, message, Button, Modal, Form, Input } from 'antd';
import { ColumnProps} from 'antd/es/table'
import Utils from '../../utils/utils';
import Validator from '../../utils/validator'
import './index.scss';
import Api from '../../api';


interface IExamine {
  orderId: number,
  result: number // 1 退货再退款；2 直接退款； 3 拒绝
  failReason?: string,
  merchantName?: string,
  merchantPhone?: string,
  merchantAddress?: string
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
      align: 'center'
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
      title: '操作',
      key: 'action',
      width: 255,
      fixed: 'right',
      render: (data: IPET.IAfterSaleItem) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => { onExamine({orderId:data.orderId,result: 1 }); }}>退货后退款</Button>
          <Button size="small" type="primary" onClick={() => { onExamine({orderId:data.orderId,result: 2 }); }}>直接退款</Button>
          <Button size="small" type="primary" danger onClick={() => { onExamine({orderId:data.orderId,result: 3 }); }}>拒绝</Button>
        </Space>
      ),
    },
  ];

  // state
  const [form] = Form.useForm();
  const [data, setData] = useState([] as IPET.IAfterSaleItem[]);
  const [examine, setExamine] = useState({} as IExamine);
  const [modalVisible, setModalVisible] = useState(false);

  // methods
  const getData = () => {
    Api.order.refundList({
      page: 1,
      pageSize: 10000,
      status: 0
    }).then(res => {
      setData(res.data.data);
    }).catch(() => {})
  };
  const handleExamine = (params: IExamine) => {
    Api.order.examine(params).then(res => {
      message.success('操作成功');
      setData(Utils.del<IPET.IAfterSaleItem>(data, 'orderId', params.orderId));
    }).catch(() => {})
  }
  // events
  const onExamine = (params: IExamine) => {
    switch(params.result) {
      case 1:
        setExamine(params);
        setModalVisible(true);
        break;
      case 2:
        handleExamine(params);
        break;
      case 3:
        let failReason = prompt('请输入拒绝退款原因：')
        if(failReason) {
          handleExamine({...params, failReason})
        }
        break;
    }
  }
  const onFinish = (values: {
    merchantName?: string,
    merchantPhone?: string,
    merchantAddress?: string
  }) => {
    setModalVisible(false);
    handleExamine({ ...examine, ...values});
  }

  // effects
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="after-sale">
      <header>退款售后 - 未处理</header>
      <Table
        scroll={{x: 1500}}
        dataSource={data}
        columns={columns}
        size="middle"
        bordered
        rowKey={(record: IPET.IAfterSaleItem) => record.orderId}
      ></Table>
      <Modal
        title="退货信息："
        style={{ top: 20 }}
        visible={modalVisible}
        footer={null}
        onCancel={() => {setModalVisible(false)}}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item 
            label="退货收件人" 
            name="merchantName"
            rules={[{ required: true, message: '退货收件人不能为空' }]}
          >
            <Input placeholder="请填写退货收件人姓名" />
          </Form.Item>

          <Form.Item 
            label="退货电话"
            name="merchantPhone"
            rules={[{ required: true, message: '退货电话不能为空' }, {pattern: /^1[3,4,5,6,7,8,9]\d{9}$/, message: '退货电话不合法'}]}
          >
            <Input placeholder="请填写退货电话" />
          </Form.Item>

          <Form.Item 
            label="退货地址" 
            name="merchantAddress"
            rules={[{ required: true, message: '退货地址不能为空' }]}
          >
            <Input placeholder="请填写退货地址" />
          </Form.Item>

          <Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">确认</Button>
              <Button type="primary" danger onClick={() => { setModalVisible(false)}}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default AfterSale;
