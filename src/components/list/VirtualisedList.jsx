import React from "react";
import { FixedSizeList as List } from "react=window"
import AutoSizer from "react-virtualized-auto-sizer";
import "./styles.css"

const Row=({ index, style })=> (
    <div className={index % 2 ?"ListItemOdd":"ListItemEven"}>Row{index}</div>
);

const VirtualisedList=() => {
    return(
        <div>
            VirtualisedList
            <AutoSizer>
                {({height, width})=>(
                    <List className="List"
                    height={150}
                    itemCount={150}
                    itemSize={35}
                    width={width}
                    >
                        {Row}                        
                    </List>
                )}
            </AutoSizer>
        </div>
    );
};

export default VirtualisedList;