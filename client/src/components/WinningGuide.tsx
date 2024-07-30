import React from 'react';
import { Table } from 'antd';

const guideData = [
  { key: '1', symbol: 'C', name: 'Cherry', credits: 10 },
  { key: '2', symbol: 'L', name: 'Lemon', credits: 20 },
  { key: '3', symbol: 'O', name: 'Orange', credits: 30 },
  { key: '4', symbol: 'W', name: 'Watermelon', credits: 40 },
];

const columns = [
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Credits',
    dataIndex: 'credits',
    key: 'credits',
  },
];

const WinningGuide = () => {
  return (
    <>
    <h1>Jackpot options</h1>
    <Table
      dataSource={guideData}
      columns={columns}
      pagination={false}
      style={{ marginTop: 20 }}
    />
    </>
  );
};

export default WinningGuide;
