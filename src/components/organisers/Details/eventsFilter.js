import React from "react";
import { eventsFilterOption } from "./api-handler";
import { Select } from "antd";

const { Option } = Select;

const EventsFilter = () => {
  return (
    <div className="category-filter  col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6  ">
      <div>
        <Select
          defaultValue="all"
          placeholder="Events"
          className="chosen-select  filterDropDowns organiserCategorySelect events customHeight"
        >
          {eventsFilterOption.map((data) => (
            <Option key={data.option} value={data.value}>
              {data.option}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default EventsFilter;
