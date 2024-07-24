import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownFilter = ({ userIds, onChange }: any) => {
  console.log("Dropdown filter");
  return (
    <>
      <Select
        placeholder="Filter by User ID"
        onChange={onChange}
        style={{ width: 200, marginBottom: 20 }}
        allowClear
      >
        {userIds.map((id: any) => (
          <Option key={id} value={id}>
            {id}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default React.memo(DropdownFilter);
