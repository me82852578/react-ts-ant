import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Cascader,
  Col,
  InputNumber,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useColumns } from "./columns";
import { Column, DataSource, GroupedDataSource } from "./types";
import { CloseOutlined } from "@ant-design/icons";
import groupByMultiAndSum from "./utils";

const ReportTable = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const [grouped, setGrouped] = useState<{
    keys: Column[];
    data: GroupedDataSource[];
  }>({
    keys: [],
    data: [],
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([NaN, NaN]);
  const totalDataAvgPrice =
    dataSource.reduce<number>((acc, curr) => acc + curr.price, 0) /
    dataSource.length;
  const columns = useColumns(grouped.keys, totalDataAvgPrice);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/properties")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => {
        setDataSource([]);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleGroupByOnChange(
    value: (string | number)[] | (string | number)[][]
  ) {
    const keys = value.flat() as Column[];
    const groupedData = Object.values(groupByMultiAndSum(dataSource, keys));
    setGrouped({ data: groupedData, keys: keys });
  }

  const cascaderOptions = [
    { label: "State", value: "state" },
    { label: "City", value: "city" },
    { label: "Type", value: "type" },
  ];

  function handlePriceRangeOnChange(value: number, index: number) {
    setPriceRange((prevState) => {
      let copyState: [number, number] = [...prevState];
      copyState[index] = value;
      return copyState;
    });
  }

  const handlePriceRange = () => {
    setPriceRange([NaN, NaN]);
  };

  const renderDataSource = () => {
    if ((priceRange[0] || priceRange[0] === 0) && priceRange[1]) {
      if (grouped.keys.length > 0) {
        return grouped.data.filter(
          (d) => priceRange[0] <= d.avgPrice && d.avgPrice <= priceRange[1]
        );
      } else {
        return dataSource.filter(
          (d) => priceRange[0] <= d.price && d.price <= priceRange[1]
        );
      }
    }
    if (grouped.keys.length > 0) {
      return grouped.data;
    } else {
      return dataSource;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Typography.Text>Group by:　</Typography.Text>
          <Cascader
            style={{ width: "300px" }}
            options={cascaderOptions.map((c) => ({
              label: c.label,
              value: c.value,
            }))}
            onChange={handleGroupByOnChange}
            placeholder="Group by ..."
            multiple
            // maxTagCount="responsive"
          />
        </Col>
        <Col xs={24}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Space>
              <Typography.Text>Price range:</Typography.Text>
              <InputNumber
                value={priceRange[0]}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handlePriceRangeOnChange(value, 0)}
                min={0}
              />
              –
              <InputNumber
                value={priceRange[1]}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
                onChange={(value) => handlePriceRangeOnChange(value, 1)}
                min={0}
              />
              <Button
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={handlePriceRange}
              />
            </Space>
            <Typography.Text type="secondary">
              (Tip: If already grouped, the "price range" is the range of the
              "average price". )
            </Typography.Text>
          </div>
        </Col>
        <Col xs={24}>
          <Typography.Text>
            The average total price is <strong>${totalDataAvgPrice}</strong> .
          </Typography.Text>
        </Col>
        <Col xs={24}>
          <Table
            loading={loading}
            rowKey="id"
            columns={columns}
            dataSource={renderDataSource()}
            scroll={{ x: "max-content" }}
            pagination={{
              size: "small",
              pageSize: 10,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[1]}/${total}`,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReportTable;
