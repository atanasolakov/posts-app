import React from "react";
import { Select } from "antd";

const { Option } = Select;

const DropdownFilter = ({ userIds, onChange }) => {
  return (
    <>
      <Select
        placeholder="Filter by User ID"
        onChange={onChange}
        style={{ width: 200, marginBottom: 20 }}
        allowClear
      >
        {userIds.map((id) => (
          <Option key={id} value={id}>
            {id}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default DropdownFilter;
