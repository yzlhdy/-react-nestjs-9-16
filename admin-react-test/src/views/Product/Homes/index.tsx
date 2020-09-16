import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Input,
  Select, message
} from 'antd'
import { Container } from './styles'
import { productList, productSearch } from '../../../api/category'
import { useHistory } from 'react-router-dom'
const { Option } = Select;

interface ProductData {
  id: string;
  created: Date;
  name: string;
  desc: string;
  price: number;
  detail: string;
  images: string;
}

interface SearchData {
  name: string;
  desc: string;
}


const Homes: React.FC = () => {

  const [pageIndex, setPageIndex] = useState<number>(1)
  const [produList, setProductList] = useState<ProductData[]>([])

  const [search, setSearch] = useState<SearchData>({
    name: 'name',
    desc: ''
  })

  const history = useHistory()
  const getproduct = () => {
    productList(pageIndex).then(res => {
      if (res.data.status === 200) {
        setProductList(res.data.data)
      }
    })
  }
  useEffect(() => {
    getproduct()
    return () => {

    }
  }, [])
  const headelSearch = () => {
    productSearch({ name: search.name, desc: search.desc, page: pageIndex }).then(res => {
      if (res.data.status === 200) {
        setProductList(res.data.data)
      } else {
        message.error(res.data.message)
      }
    })
    console.log(search);

  }
  const handelPage = (page: number) => {
    setPageIndex(page)
  }
  const title = (
    <span>
      <Select defaultValue="productName"
        value={search.name}
        onChange={(value: string) => setSearch({ ...search, name: value })}
        style={{ width: 120 }} >
        <Option value="name">按名称搜索</Option>
        <Option value="desc">按商品名称</Option>

      </Select>
      <Input style={{ width: '300px', margin: '0 20px' }}
        placeholder="请输入内容"
        value={search.desc}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch({ ...search, desc: event.target.value })}
      />
      <Button type="primary" onClick={headelSearch}>搜索</Button>
    </span>
  )
  const extra = (
    <Button type='primary'>添加商品</Button>
  )
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: '状态',
      dataIndex: 'status',
      redner: (status: number) => (
        <span>
          <Button type="primary">{status === 1 ? '上架' : '下架'}</Button>
          <span>{status === 1 ? '已下架' : '在售'}</span>
        </span>
      )
    },
    {
      title: '详情',
      dataIndex: 'desc',
      key: 'desc'
    },
    {
      title: '操作',
      render: () => (
        <span>
          <Button type="primary" onClick={() => history.push('/product/detail')}> 详情</Button>
          <Button type="primary" style={{ margin: '0 10px' }}> 修改</Button>
          <Button type="primary"> 删除</Button>
        </span>
      )
    }
  ]
  return (
    <Container>
      <Card title={title} extra={extra} >
        <Table
          dataSource={produList}
          columns={columns}
          rowKey="id"
          pagination={{
            current: pageIndex,
            onChange: handelPage,
            showQuickJumper: true
          }}

        />
      </Card>
    </Container >
  );
}

export default Homes;
