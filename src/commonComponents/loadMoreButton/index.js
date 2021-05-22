// Library
import React from 'react';

 const _loadMore = (e, props) => {


    e.preventDefault();

    // if (props.hasNextPage === true) {
    //     if (props.page){
    //         props.page = props.page + 1
    //     }
    // }


};

const loadMore = (props) => {

    return (
        <a className="load-more-button" href="#"
           onClick={(e) => _loadMore(e, props)}>Load more
            <i className="fas fa-spinner"/>
        </a>
    );
};

export default loadMore;