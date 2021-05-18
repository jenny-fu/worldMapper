import Logo from '../navbar/Logo';
import Level from '../navbar/Level';
import Login from '../modals/Login';
import CreateMap from '../modals/CreateMap';
import Delete from '../modals/Delete';
import DeleteRegion from '../modals/DeleteRegion';
import Edit from '../modals/Edit';
import MapContents from '../main/MapContents';
import TableContents from '../main/TableContents';
import TableHeader from '../main/TableHeader';
import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';
import SidebarRegion from '../sidebar/SidebarRegion';
import * as mutations from '../../cache/mutations';
import RegionHeader from '../main/RegionHeader';
import { GET_DB_MAPS } from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WButton, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WMMain, WLSide } from 'wt-frontend';
import {
	UpdateListField_Transaction,
	SortItems_Transaction,
	UpdateListItems_Transaction,
	ReorderItems_Transaction,
	EditItem_Transaction
} from '../../utils/jsTPS';
import SidebarList from '../sidebar/SidebarList';

const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		if (e.key === 'z' && e.ctrlKey) {
			if (props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) {
			if (props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let email = null;
	let maps = [];
	let SidebarData = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeList, setActiveList] = useState({});
	const [activeRegionID, setActiveRegionID] = useState('');
	const [selectedDelete, activeButNot] = useState({});
	const [entryItem, setEntryItem] = useState({});
	const [entryIndex, setEntryIndex] = useState(0);
	const [showDelete, toggleShowDelete] = useState(false);
	const [showDeleteR, toggleShowDeleteR] = useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showMap, toggleShowMap] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showEdit, toggleShowEdit] = useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	let button = document.getElementById("user-name");
	if (button && auth) button.innerHTML = props.user.firstName + " " + props.user.lastName;
	if (auth) { email = props.user.email; }
	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign todolists 
		for (let map of data.getAllMaps) {
			maps.push(map)
		}
		// if a list is selected, shift it to front of todolists
		// if (activeList._id) {
		// 	let selectedListIndex = maps.findIndex(entry => entry._id === activeList._id);
		// 	let removed = maps.splice(selectedListIndex, 1);
		// 	maps.unshift(removed[0]);
		// }
		// create data for sidebar links
		for (let map of maps) {
			if (map) {
				SidebarData.push({ _id: map._id, name: map.name });
			}
		}
	}

	// NOTE: might not need to be async
	const reloadList = async () => {
		if (activeList._id) {
			let tempID = activeList._id;
			let list = maps.find(list => list._id === tempID);
			setActiveList(list);
		}
	}

	const loadTodoList = (list) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		if (list === {})
			setActiveRegionID('');
		setActiveList(list);
	}

	const viewRegion = (id) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		setActiveRegionID(id);
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }],
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	const [UpdateTodoItemField] = useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	const [UpdateTodolistField] = useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [DeleteTodoItem] = useMutation(mutations.DELETE_ITEM, mutationOptions);
	const [AddTodoItem] = useMutation(mutations.ADD_ITEM, mutationOptions);
	const [AddTodolist] = useMutation(mutations.ADD_TODOLIST); //add a new map
	const [DeleteTodolist] = useMutation(mutations.DELETE_TODOLIST);

	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const addItem = async () => {
		let list = activeList;
		const regions = list.region;
		const newItem = {
			_id: '',
			name: 'Subregion Name',
			capital: 'Subregion Capital',
			leader: 'Subregion Leader',
			landmarks: [], //array of string
			parent: activeList._id, //objectID...?
			region: [] //array of string (objectIDs to get the next Item/Region)
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeList._id;
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteItem = async (item, index) => {
		console.log("Index ========= ", entryIndex);
		console.log("Item ======== ", entryItem);

		let listID = activeList._id;
		let itemID = item._id;
		console.log("item", item)
		let opcode = 0;

		let itemToDelete = {
			_id: item._id,
			name: item.name,
			capital: item.capital,
			leader: item.leader,
			landmarks: item.landmarks, //array of string
			parent: item.parent, //objectID...?
			region: item.region //array of string (objectIDs to get the next Item/Region)
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const editItem = async (itemID, field, value, prev) => {
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const reorderItem = async (itemID, dir) => {
		// let listID = activeList._id;
		// let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		// props.tps.addTransaction(transaction);
		// tpsRedo();

	};

	const createNewList = async (title) => {
		let list = {
			_id: '',
			name: title,
			owner: props.user._id,
			region: [],
			sortRule: 'task',
			sortDirection: 1
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_MAPS }] });
		if (data) {
			loadTodoList(data.addTodolist);
		}
	};

	const deleteList = async () => {
		let id = selectedDelete._id;
		DeleteTodolist({ variables: { _id: id }, refetchQueries: [{ query: GET_DB_MAPS }] });
		loadTodoList({});
	};

	const reset = () => {
		setActiveRegionID('');
		loadTodoList({});
	}

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const handleSetActive = (_id) => {
		let selectedList = maps.find(todo => todo._id === _id);
		// if(!selectedList){ //if selected list is a subregion (not main map)
		// 	selectedList = findRegion(maps, _id);
		// }
		loadTodoList(selectedList);
	};

	const findRegion = (items, id) => {
		if (items) {
			for (var i = 0; i < items.length; i++) {
				if (items[i]._id === id) {
					return items[i];
				}
				var found = findRegion(items[i].region, id);
				if (found) return found;
			}
		}
	}

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowDeleteR(false);
		toggleShowCreate(false);
		toggleShowEdit(false);
		toggleShowMap(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowDeleteR(false);
		toggleShowLogin(false);
		toggleShowEdit(false);
		toggleShowMap(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowDeleteR(false);
		toggleShowLogin(false);
		toggleShowEdit(false);
		toggleShowMap(false);
		toggleShowDelete(!showDelete);
	};

	const setShowDeleteR = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowEdit(false);
		toggleShowMap(false);
		toggleShowDeleteR(!showDeleteR);
	};

	const setShowEdit = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(false);
		toggleShowDeleteR(false);
		toggleShowMap(false);
		toggleShowEdit(!showEdit);
	};

	const setShowMap = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(false);
		toggleShowDeleteR(false);
		toggleShowEdit(false);
		toggleShowMap(!showMap);
	};

	const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const setEntry = (item, index) => {
		setEntryItem(item);
		setEntryIndex(index);
	}

	let region = null;
    if(activeList) region = findRegion(maps, activeList._id);
    const findLevels = () => {
        let out = [];
        if(region){
            while(region._id != activeList._id){
                out.push(region.name);
                region = findRegion(maps, region.parent);
            }
        }
        let reversed = out.reverse();
        return reversed;
    }
    const levels = findLevels();

	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo'
								active={activeList._id} reset={reset} activeRegionID={activeRegionID}
								maps={maps} activeList={activeList}
							/>
						</WNavItem>
					</ul>
					<ul>
						<WNavItem>
							<div className="levels">
								{(levels.length > 0) ? levels.map(level => (
									<Level name={level} setActiveList={loadTodoList} activeList={activeList} />
								)) : <></>
								}
							</div>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							reloadTodos={refetch} setActiveList={loadTodoList}
							setShowEdit={setShowEdit} listIDs={SidebarData}
							setActiveRegion={setActiveRegionID}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			{
				activeList._id ?
					<WMMain>
						{(activeRegionID === '') ?
							<div className="container-primary">
								<RegionHeader
									activeList={activeList} undo={tpsUndo} redo={tpsRedo}
									canUndo={canUndo} canRedo={canRedo} addItem={addItem}
								/>
								<TableHeader
									// disabled={!props.activeList._id}        
									addItem={props.addItem}
									undo={props.undo} redo={props.redo} canUndo={props.canUndo}
									canRedo={props.canRedo} setShowDelete={props.setShowDelete}
									setActiveList={props.setActiveList} sort={sort}
								/>
								<TableContents
									addItem={addItem} deleteItem={deleteItem}
									editItem={editItem} reorderItem={reorderItem}
									setShowDelete={setShowDelete} undo={tpsUndo} redo={tpsRedo}
									activeList={activeList} setActiveList={loadTodoList}
									canUndo={canUndo} canRedo={canRedo}
									sort={sort} auth={auth}

									listIDs={SidebarData} activeid={activeList._id}
									handleSetActive={handleSetActive} createNewList={createNewList}
									updateListField={updateListField} key={activeList._id}
									activeEntry={setEntry} setShowDeleteR={setShowDeleteR}
									setActiveRegion={viewRegion}
								/>
							</div>
							:
							<div className="container-primary">
								<SidebarRegion
									activeList={activeList} undo={tpsUndo} redo={tpsRedo}
									canUndo={canUndo} canRedo={canRedo} activeRegionID={activeRegionID}
									maps={maps} parent={activeList}
								/>
								<SidebarList
									setShowDelete={setShowDelete} sort={sort} auth={auth}
									activeList={activeList} setActiveList={loadTodoList}
									listIDs={SidebarData} createNewList={createNewList}
									activeid={activeList._id} key={activeList._id}
									setShowMap={setShowMap} activeButNot={activeButNot}
									maps={maps} updateListField={updateListField}
									regionViewer={true} handleSetActive={handleSetActive}
									activeRegionID={activeRegionID} maps={maps}
									setActiveRegion={setActiveRegionID}
								/>
							</div>
						}
					</WMMain>
					:
					<WMMain>
						{
							auth ?
								<div className="container-primary">
									<MapContents
										setShowDelete={setShowDelete} sort={sort} auth={auth}
										activeList={activeList} setActiveList={loadTodoList}
										listIDs={SidebarData} createNewList={createNewList}
										activeid={activeList._id} key={activeList._id}
										setShowMap={setShowMap} activeButNot={activeButNot}
										maps={maps}
										updateListField={updateListField}
										handleSetActive={handleSetActive}
									/>
								</div>
								:
								<div className="container-primary">
									<img src="https://i.pinimg.com/originals/ba/fc/b8/bafcb8760fe3c0947d3b2e0c9d9eb380.jpg"
										className="homeImage"></img>
									<div className="homeText"> Welcome to the World Data Mapper! </div>
								</div>

						}
					</WMMain>
			}

			{
				showDelete && (<Delete deleteList={deleteList} setShowDelete={setShowDelete} />)
			}

			{
				showDeleteR && (<DeleteRegion item={entryItem} index={entryIndex} deleteItem={deleteItem} setShowDeleteR={setShowDeleteR} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch} setShowLogin={setShowLogin} />)
			}

			{
				showEdit && (<Edit email={email} fetchUser={props.fetchUser} reloadTodos={refetch} setShowEdit={setShowEdit} />)
			}

			{
				showMap && (<CreateMap createNewList={createNewList} fetchUser={props.fetchUser} reloadTodos={refetch} setShowMap={setShowMap} />)
			}

		</WLayout>
	);
};

export default Homescreen;