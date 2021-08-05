import React from "react";

import { Form, Input } from "antd";
const formElements = (props) => {
  const { data } = props.formElement;
  const { id } = props.formElement;

  return (
    <Form.Item
      label={data.title}
      name={data.name}
      rules={{
        requried: true,
        message: data.placeholder,
      }}
    >
      <Input
        type={data.value}
        value={data.value}
        onChange={(e) => props.onChange(e.target.value, id)}
      />
    </Form.Item>
  );
};

export default formElements;
