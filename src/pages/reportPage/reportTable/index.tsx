import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Cascader, InputNumber, Space, Table, Typography } from "antd";
import { useColumns } from "./columns";
import { Column, DataSource, GroupedDataSource } from "./types";
import { CloseOutlined } from "@ant-design/icons";

const groupByMultiAndSum = (
  dataSource: Record<string | number, any>[],
  groups: string[] = ["state", "city", "type"]
): Record<string | number, string | number>[] | GroupedDataSource => {
  const grouped = dataSource.reduce<any>((acc, curr) => {
    let groupedResult: string[] = [];
    groups.forEach((g) => {
      groupedResult.push(curr[g]);
    });
    const groupedKey = groupedResult.join();

    if (!acc[groupedKey]) {
      return {
        ...acc,
        [groupedKey]: { ...curr, avgPrice: curr.price, houses: 1 },
      };
    } else {
      return {
        ...acc,
        [groupedKey]: {
          ...acc[groupedKey],
          price: acc[groupedKey].price + curr.price,
          avgPrice: (
            (acc[groupedKey].price + curr.price) /
            (acc[groupedKey].houses + 1)
          ).toFixed(2),
          houses: acc[groupedKey].houses + 1,
        },
      };
    }
  }, {});

  return grouped;
};

const ReportTable = () => {
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
    axios
      .get("/api/properties")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => {
        setDataSource([]);
        console.error(err);
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
    <Space direction="vertical" style={{ display: "flex", padding: "1rem" }}>
      <div>
        <Typography.Text>Group by:　</Typography.Text>
        <Cascader
          style={{ width: "400px" }}
          options={cascaderOptions.map((c) => ({
            label: c.label,
            value: c.value,
          }))}
          onChange={handleGroupByOnChange}
          placeholder="Group by ..."
          multiple
          // maxTagCount="responsive"
        />
      </div>
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
        <Typography.Text type="secondary">
          (Tip: If already grouped, the "price range" is the range of the
          "average price". )
        </Typography.Text>
      </Space>
      <Typography.Text>
        The average total price is <strong>${totalDataAvgPrice}</strong> .
      </Typography.Text>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={renderDataSource()}
        pagination={{
          size: "small",
          pageSize: 10,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[1]}/${total}`,
        }}
      />
    </Space>
  );
};

export default ReportTable;
