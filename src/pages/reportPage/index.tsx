import { Space, Typography } from "antd";
import ReportTable from "./reportTable";

export default function ReportPage() {
  return (
    <Space direction="vertical" style={{ display: "flex", padding: "1rem" }}>
      <Typography.Title level={3} >The data of property in USA</Typography.Title>
      <ReportTable />
    </Space>
  );
}
