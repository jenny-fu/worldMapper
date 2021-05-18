const byTask = (items, direction) => { //name
	if(direction === 1) items.sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1);
	return items;
}

const byDueDate = (items, direction) => {//cap
	if(direction === 1) items.sort((a,b) => a.capital.toUpperCase() > b.capital.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.capital.toUpperCase() < b.capital.toUpperCase() ? 1 : -1);
	return items;
}

const byStatus = (items, direction) => { //leader
	if(direction === 1) items.sort((a,b) => a.leader.toUpperCase() > b.leader.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.leader.toUpperCase() < b.leader.toUpperCase() ? 1 : -1);
	return items;
}

const byAssignedTo = (items, direction) =>{//landmark
	// if(direction === 1) items.sort((a,b) => a.landmarks.toUpperCase() > b.assigned_to.toUpperCase() ? 1 : -1);
	// else items.sort((a,b) => a.assigned_to.toUpperCase() < b.assigned_to.toUpperCase() ? 1 : -1);
	// return items
}

module.exports = {byTask, byDueDate, byStatus, byAssignedTo}
