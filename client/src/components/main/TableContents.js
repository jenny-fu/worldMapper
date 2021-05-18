import React        from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {

    let entries = props.activeList ? props.activeList.region : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    } 
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-secondary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem} setActiveList={props.setActiveList}
                        activeEntry={props.activeEntry} setShowDeleteR={props.setShowDeleteR}
                        setActiveRegion={props.setActiveRegion}
                    />
                ))
            }
            </div>
            : <div className='container-secondary' >
                {
                    props.activeList._id ? <h2 className="nothing-msg"> No subregions added! </h2> : <></> 
                }               
                
            </div>
    );
};

export default TableContents;