import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Table, Button } from 'antd'
import { history } from 'umi'
import './index.scss'



function index() {
  let columns = [
    {
      title: '英雄名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: '技能',
      dataIndex: 'skill',
      key: 'skill'
    },
    {
      title: '定位',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: '查看',
      dataIndex: 'address',
      key: 'address',
      render: (href: string) => (
        <>
          <a href={href}>查看</a>
        </>
      )
    },
    {
      title: '操作',
      dataIndex: 'handler',
      key: 'handler',
      render: (id: number) => (
        <>
          <span>编辑</span>
          <span>删除</span>
        </>
      )
    },
  ]


  const [datas, setDatas] = useState<CMS.Hero[]>([] as CMS.Hero[]);
  const getDatas = () => {
    axios.get('/api/heros').then((res: AxiosResponse<CMS.Hero[]>) => {
      setDatas(res.data);
    })
  }
  const goAddHero = () => {
    history.push('/heros/add')
  }
  useEffect(() => {
    getDatas();
  }, [])

  return (
    <div>
      <Button type="primary" onClick={goAddHero}>添加英雄</Button>
      <Table
        className="table"
        columns={columns}
        dataSource={datas}
        rowKey={(datas: { id: number }) => datas.id}
      />
    </div>
  )
}

export default index
