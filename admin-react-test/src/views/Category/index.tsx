import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Modal, Input,
  message
} from 'antd'
import { categoryList, categoryCreate, categoryEdit, categoryDelete } from '../../api/category'

import { Container } from './styles';
interface CateData {
  id: string;
  name: string;
  created: string
}

const Category: React.FC = () => {
  const [pages, setPages] = useState<number>(1)
  const [categData, setCategData] = useState<CateData[]>([])
  const [showcisible, setShowvisible] = useState<number>(0)
  const [name, setNames] = useState<string>('')
  const [id, setId] = useState<string>('')

  const categoryLists = (page: number) => {
    categoryList(page).then(res => {
      if (res.data.status === 200) {
        setCategData(res.data.data)
      }
    })
  }

  useEffect(() => {
    categoryLists(pages)
    return () => {

    }
  }, [])

  const extra = (
    <Button type="primary" onClick={() => setShowvisible(1)}>
      添加分类
    </Button>
  )

  const handelEdit = (row: any) => {
    setShowvisible(2)
    setId(row.id)
    setNames(row.name)
  }
  const handelDelete = (id: string) => {
    categoryDelete(id).then(res => {
      if (res.data.status === 200) {
        message.success('删除成功')
        categoryLists(pages)
      }
    })
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '操作',
      render: (id: any) => (
        <span>
          <Button type="primary" onClick={() => handelEdit(id)}>修改</Button>
          <Button type="primary" onClick={() => handelDelete(id.id)}>删除</Button>
        </span>
      )
    }
  ]

  const handelPage = (page: number) => {
    setPages(page)
  }

  const handleOk = () => {
    if (showcisible === 1) {
      categoryCreate({ name }).then(res => {

        if (res.data.status === 200) {
          message.success('添加成功')
          categoryLists(pages)
        }

      })
    }
    if (showcisible === 2) {
      categoryEdit(id, { name }).then(res => {
        if (res.data.status === 200) {
          message.success('修改成功')
          categoryLists(pages)
        }

      })
    }

    setShowvisible(0)
  }
  const handleCancel = () => {
    setShowvisible(0)
    setNames('')

  }

  return (
    <Container>
      <Card title='一级分类类表' extra={extra}>
        <Table
          dataSource={categData}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{
            current: pages,
            showQuickJumper: true,
            onChange: handelPage
          }}
        />
        <Modal
          title={showcisible === 1 ? '添加分类' : '修改分类'}
          visible={showcisible !== 0}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input placeholder="请输入分类名称"
            value={name}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => setNames(event.target.value)
            } />
        </Modal>
      </Card>
    </Container>
  );
};

export default Category;
