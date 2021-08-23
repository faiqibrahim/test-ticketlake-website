import React from "react";
import { filterOptions } from "./api-handler";
import { Select } from "antd";

const { Option } = Select;

const DateFilter = ({ setDateFilterValue, disable }) => {
  return (
    <div className="category-filter  col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6 ">
      <div>
        <Select
          defaultValue="all"
          placeholder="filter by"
          className="chosen-select  filterDropDowns organiserCategorySelect filterBy customHeight"
          disabled={disable}
          onChange={(e) => {
            setDateFilterValue(e);
          }}
        >
          {filterOptions.map((data) => (
            <Option key={data.option} value={data.value}>
              {data.option}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default DateFilter;
