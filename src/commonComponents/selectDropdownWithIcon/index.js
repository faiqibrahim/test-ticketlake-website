import React, {Component} from "react";
import Select, {components} from 'react-select'

const {Option} = components;

const CustomSelectOption = props => (
    <Option {...props}>
        <img alt='img' src={props.data.icon} className={'customSelectOption'}/>
        {props.data.label}
    </Option>
);

const CustomSelectValue = props => (
    <div style={{display: 'contents'}}>
        <img alt='img' src={props.data.icon} className={'customSelectValue'}/>
        {props.data.label}
    </div>
);

class SelectDropdownWithIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showValueContainer: true,
            showOption: false,
            showSingleValue: false
        };
    }

    render() {
        const {id, name, placeholder, options, onChange, networkImg} = this.props;

        const styles = {
            valueContainer: base => ({
                ...base,
                paddingLeft: this.state.showValueContainer ? '10px' : '8px'
            })
        };

        const onChangeFunction = (e) => {
            this.setState({showValueContainer: false});
            onChange(e.value)
        };

        const ValueContainer = ({children, ...props}) => {
            return (
                components.ValueContainer && (
                    <components.ValueContainer {...props}>
                        <div className={'row rowWidth'}>
                            <div className={'col-md-2'}>
                                <img alt='img' src={props.selectProps.networkImg} className={'valContainerImg'}/>
                            </div>
                            <div className={'col-md-10'}>
                                {children}
                            </div>
                        </div>
                    </components.ValueContainer>
                )
            );
        };

        return (
            <Select
                id={id}
                name={name}
                networkImg={networkImg}
                className='react-select-container iconSelectDropDown'
                classNamePrefix='react-select'
                placeholder={placeholder}
                options={options}
                onChange={(e) => onChangeFunction(e)}
                components={this.state.showValueContainer ? {ValueContainer, Option: CustomSelectOption, SingleValue: CustomSelectValue} :
                    {Option: CustomSelectOption, SingleValue: CustomSelectValue}}
                styles={styles}
            />
        )
    }
}

export default SelectDropdownWithIcon;