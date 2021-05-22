import React from 'react'

class TableHeads extends React.Component{
    tableHeaders = this.props.children.map((head) => {
        return( <th key={head}>
                {head}
            </th>
        )
    });

    render(props){
        return(
            <tr>
                {this.tableHeaders}
            </tr>
        )
    }
}

export default TableHeads;