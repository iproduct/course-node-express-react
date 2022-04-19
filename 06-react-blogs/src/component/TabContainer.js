import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize';

export const TabContainer = ({ children }) => {
    const tabsElem = useRef()
    const tabInstance = useRef()
    useEffect(() => {
        console.log(">>>Tabs Element:", tabsElem.current)
        tabInstance.current = M.Tabs.init(tabsElem.current);
        console.log(">>>>Init Tabs Instance:", tabInstance.current);
        return () => {
            console.log(">>>>Cleaning Tabs:", tabInstance.current);
            tabInstance.current.destroy();
        };
    }, [])
    const tabs = React.Children.toArray(children).filter(child => child.type.name === 'TabPanel')
    return (
        <div className="row">
            <div className="col s12">
                <ul className="tabs" ref={tabsElem}>
                    {tabs.map(tab => (
                        <li key={tab.props.id} className="tab col s3"><a href={'#' + tab.props.id}>{tab.props.title}</a></li>
                    ))}
                </ul>
            </div>
            {children}
        </div>
    )
}
