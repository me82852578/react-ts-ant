import React, { Key, ReactNode, useRef } from "react";
import { Input, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  FilterConfirmProps,
  FilterDropdownProps,
} from "antd/lib/table/interface";
import { Column, Columns, DataSource, GroupedDataSource } from "./types";
import PriceCell from "./priceCell";

export const useColumns = (groups?: Column[], totalAvgPrice: number = 0) => {
  const filterInputRef = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: Key[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
  };

  const sort = (a: string | number, b: string | number) => {
    return a.toString().charCodeAt(0) - b.toString().charCodeAt(0);
  };

  const customFilterConfigs = (dataIndex: Column) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          ref={filterInputRef}
          allowClear
          value={selectedKeys[0]}
          placeholder={`Search ${dataIndex}`}
          onSearch={(value, e) => {
            if (e?.currentTarget.tagName === "INPUT") {
              if (typeof clearFilters === "function") {
                clearFilters();
              }
              confirm({ closeDropdown: false });
            } else {
              handleSearch(selectedKeys, confirm, dataIndex);
            }
          }}
          onChange={(e) => {
            setSelectedKeys([e.target.value]);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (
      filtered: ReactNode | ((filtered: boolean) => React.ReactNode)
    ) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (
      value: string | number | boolean,
      record: Record<string, any>
    ) => {
      return record[dataIndex] && typeof value === "string"
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "";
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => filterInputRef.current?.select(), 100);
      }
    },
    sorter: (a: GroupedDataSource, b: GroupedDataSource) =>
      sort(a[dataIndex], b[dataIndex]),
  });

  const columns: Columns[] = [
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      ...customFilterConfigs("state"),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      ...customFilterConfigs("city"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ...customFilterConfigs("type"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...customFilterConfigs("price"),
      sorter: (a: DataSource, b: DataSource) => a.price - b.price,
      render: (t: number) => (
        <PriceCell price={t} comparedPrice={totalAvgPrice} />
      ),
    },
    {
      title: "Houses",
      dataIndex: "houses",
      key: "houses",
      ...customFilterConfigs("houses"),
      sorter: (a: GroupedDataSource, b: GroupedDataSource) =>
        a.houses - b.houses,
    },
    {
      title: "AvgPrice",
      dataIndex: "avgPrice",
      key: "avgPrice",
      ...customFilterConfigs("avgPrice"),
      sorter: (a: GroupedDataSource, b: GroupedDataSource) =>
        a.avgPrice - b.avgPrice,
      render: (t: number) => (
        <PriceCell price={t} comparedPrice={totalAvgPrice} />
      ),
    },
  ];

  if (!groups || groups.length < 1) {
    return columns.filter((c) => c.key !== "avgPrice" && c.key !== "houses");
  } else {
    return columns.filter(
      (c) =>
        groups.includes(c.key) || c.key === "avgPrice" || c.key === "houses"
    );
  }
};
