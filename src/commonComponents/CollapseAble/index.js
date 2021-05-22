import React, {Component} from 'react';
import { Collapse, Icon } from 'antd';
const { Panel } = Collapse


class CollapseAble extends Component {
  render(){
  return (
    this.props.dataNow!==undefined?
      <Collapse
        accordion
        bordered={false}
        expandIcon={({ isActive }) => <Icon type="plus-circle" rotate={isActive ? 45 : 0} />}
        expandIconPosition="right"
        >
          {this.props.dataNow && this.props.dataNow.map((data,i)=>{
            return(
              <Panel header={data.name} key={i}>
                <div className="max-height">{data.description.props.children!==undefined?data.description.props.children:null}</div>
              </Panel>
            )
          })}
        </Collapse>
        :
        null
    )
  }
}
export default CollapseAble;