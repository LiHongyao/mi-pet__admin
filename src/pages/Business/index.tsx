import React, { useEffect, useState } from 'react'
import { message, Table, Space, Button } from 'antd'
import { ColumnProps} from 'antd/es/table'
import Api from '../../api'
import Utils from '../../utils/utils'



const Business = () => {

  // 定义列
  const columns:ColumnProps<IPET.IBusiness>[] = [
    {
      title: '序号',
      align: 'center',
      render:(text: IPET.IBusiness, record: IPET.IBusiness, index: number) => index + 1
    },
    {
      title: '商家名称',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      align: 'center',
      render: (applyTime: number) => Utils.dateFormat(applyTime * 1000)
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (data: IPET.IBusiness) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => { onAction({userId: data.id, result: 1})}}>确认</Button>
          <Button size="small"  type="primary" danger={true}onClick={() => { onAction({ userId: data.id, result: 2 })}}>拒绝</Button>
        </Space>
      )
    }
  ]


  const [data, setData] = useState([] as IPET.IBusiness[]);
  const [loading, setLoading] = useState(true);



  // methods
  const getData = () => {
    Api.user.applyList({
      page: 1,
      pageSize: 10
    }).then(res => {
      message.success('加载成功');
      setData(res.data.data);
      setLoading(false);
    })
  }
  // events
  const onAction = (params: {userId: number, result: number}) => {
    Api.user.examine(params).then(res => {
      message.success('审核成功');
      setData(Utils.del<IPET.IBusiness>(data, 'id', params.userId));
    })
  }
  // effect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <header>商家审核</header>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        size="middle"
        bordered
        rowKey={(datas: { id: number }) => datas.id}
      ></Table>
    </div>
  )
}

export default Business;