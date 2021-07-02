import React from "react"
const HeaderTabs = (props) => {
    const {tabs,activeTab,onTabClick,hrefValue} = props;
    return (
        <React.Fragment>
            {
                tabs.map((tabItem,index) => (
                <li key={index}>
                    <a className={activeTab === index+1 ? "active-detail-li" : "detail-li"}
                        onClick={() => onTabClick(index+1)}
                        href={hrefValue}>
                        {tabItem}
                    </a>
                </li>
                ))
            }
        </React.Fragment>
    )
}
export  default  HeaderTabs;