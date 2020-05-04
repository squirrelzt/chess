import React, { Component, Fragment } from 'react';
import { Icon, Row, Col, Button, message, Modal } from 'antd';
import axios from 'axios';
import { auth } from '../common/auth';
import './css/home.less';
import store from './../store/index';
// import { INIT_DATA, HANDLE_RESET, LOCK_FRAME, SELECT_ITEM, OPERATE_MODAL_VISIBLE, REVERSE_CHESS } from './../store/actionType'
import { 
    getInitDataAction, 
    getHandleResetAction,
    getClearSelectedAndSelectedOpponentAction,
    getLockFrameAction,
    getSelectItemAction,
    getOperateModalVisibleAction,
    getReverseChessAction
 } from './../store/actionCreators';

export default class Home extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     items: [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']],
        //     selectedItem: '',
        //     selectedOpponentItem: '',
        //     selectedItemBackgroudColor: '#6387ea',
        //     data: [],
        //     started: false,
        //     semaphore: 1,
        //     role: 'CONSUMER'
        // }
        this.state = store.getState();
        store.subscribe(this.handleStoreChange)
    }
    
    handleStoreChange = () => {
        this.setState(store.getState())
    }

    fetch = (params = {}) => {
        axios.get(auth.getPath() + '/query')
        .then((response) => {
            this.initData(response.data);
        })
        .catch((error) => {
            console.log(error);
            message.error('查询棋子失败');
        })
        .then(() => {

        });
        // auth.fetch('/query','get',params,(result)=>{
        //     this.initData(result);
        // });
    }

    initData = (data) => {
        const items = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
        if (data) {
            data.forEach(element => {
                items[element.x-1][element.y-1] = element;
            });
            // const action = {
            //     type: INIT_DATA,
            //     value: items
            // }
            const action = getInitDataAction(items);
            store.dispatch(action);
            // this.setState({
            //     items
            // })
        }
    }

    componentDidMount = () => {
        const id = localStorage.getItem('id');
        if (id) {
            this.fetch();
            this.fetchChesserById({id:id});
            setInterval(()=>{
                this.fetch();
                this.fetchChesserById({id:id});
            },2000)
        } else {
            window.location.href="/login";
        }
        
    }

    //查询页面状态是active还是lock
    fetchChesserById = (params) => {
        axios.get(auth.getPath() + '/queryPersonById', { params })
        .then((response) => {
            const role = response.data.role;
            const state = response.data.state;
            const color = response.data.color;
            role?localStorage.setItem('role', role):'';
            state?localStorage.setItem('state', state):'';
            color?localStorage.setItem('color', color):'';
            if (state && role) {
                this.lockFrame(state, role);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('根据id查询用户信息失败');
        })
        .then(() => {

        });
        // auth.fetch('/queryPersonById','get',params,(result)=>{
        //     const role = result.role;
        //     const state = result.state;
        //     const color = result.color;
        //     localStorage.setItem('role', role);
        //     localStorage.setItem('state', state);
        //     localStorage.setItem('color', color);
        //     if (state && role) {
        //         this.lockFrame(state, role);
        //     }
        // });
    }

    // 锁定页面
    lockFrame = (state, role) => {
        let semaphore = 0;
        if (state == 'ACTIVE' && role == 'CONSUMER') {
            semaphore = 1;
        } else if (state == 'ACTIVE' && role == 'PRODUCER') {
            semaphore = 0;
        } else if (state == 'LOCK' && role == 'CONSUMER') {
            semaphore = 0;
        } else if (state == 'LOCK' && role == 'PRODUCER') {
            semaphore = 1;
        }
        // const action = {
        //     type: LOCK_FRAME,
        //     value: {
        //         semaphore,
        //         role
        //     }
        // }
        const action = getLockFrameAction(semaphore, role);
        store.dispatch(action);
        // this.setState({
        //     semaphore,
        //     role
        // })
    }
    // 点击棋子
    onSelect = (item) => {
        // 未加载数据，返回
        if (!item) {
            return;
        }
        // 选己方操作棋子
        if (!this.state.selectedItem) {
            const color = localStorage.getItem('color');
            if (!color && color !== item.color && "DISPLAY" == item.state) {
                message.error('不能操作对方棋子')
                return;
            }
             // 判断此棋子是否已翻开
             if (item.state == 'NONE') {
                // this.setState({
                //     selectedItem: '',
                //     selectedOpponentItem: ''
                // })
                const action = getClearSelectedAndSelectedOpponentAction('','');
                store.dispatch(action);
                this.reverseChess(item);
            } else if (item.state == 'DISPLAY') {
                if (!color && item.color !== localStorage.getItem('color') && !this.state.selectedItem) {
                    return;
                }
                if (!this.state.selectedItem) {
                    if (item.code == '') {
                        return;
                    }
                    // 选中要操作的棋子
                    // this.setState({
                    //     selectedItem: item
                    // })
                    // const action = {
                    //     type: SELECT_ITEM,
                    //     value: item
                    // }
                    const action = getSelectItemAction(item);
                    store.dispatch(action);
                } else {
                    this.operateChess(item);
                }
                
            }
        } else {
            // 再次点击选中的棋子，取消选中
            if (this.state.selectedItem.id === item.id) {
                // this.setState({
                //     selectedItem: ''
                // });
                // const action = {
                //     type: SELECT_ITEM,
                //     value: ''
                // }
                const action = getSelectItemAction('');
                store.dispatch(action);
                return;
            }
            if (this.state.selectedItem.color === item.color && this.state.selectedItem.code !== 'pao') {
                message.error("相同颜色不能操作");
                return;
            }
            this.operateChess(item);
        }
    }

    // 兑子，吃子，移动操作
    operateChess = (selectedOpponentItem) => {
        const selectedX = this.state.selectedItem.x;
        const selectedY = this.state.selectedItem.y;
        const selectedColor = this.state.selectedItem.color;
        // 颜色相同，重新选择
        if (selectedColor == selectedOpponentItem.color && this.state.selectedItem.code !== 'pao') {
            // this.setState({
            //     selectedItem: selectedOpponentItem
            // })
            // const action = {
            //     type: SELECT_ITEM,
            //     value: selectedOpponentItem
            // }
            const action = getSelectItemAction(item);
            store.dispatch(action);
            return;
        }
        if (selectedX != selectedOpponentItem.x && selectedY != selectedOpponentItem.y) {
            message.error('不同行或列的数据不能进行操作');
            return;
        }

        let state = localStorage.getItem('state');
        if (state == 'ACTIVE') {
            state = 'LOCK';
        } else if (state == 'LOCK') {
            state = 'ACTIVE';
        }
        localStorage.setItem('state', state);
        this.lockFrame(state, localStorage.getItem('role'));
        this.operation(this.state.selectedItem, selectedOpponentItem);
    }

    operation = (selectedItem, selectedOpponentItem) => {
        const chessId = selectedItem.id;
        const code = selectedItem.code;

        const chessX = selectedItem.x;
        const chessY = selectedItem.y;
        const opponentChessX = selectedOpponentItem.x;
        const opponentChessY = selectedOpponentItem.y;
        if (chessX !== opponentChessX && chessY !== opponentChessY) {
            message.error("不同行数据不能操作");
            return;
        }

        if ("pao" === code) {
            
        }
        if (!selectedItem.code && "bing" === code) {
            if ("jiang" !== selectedOpponentItem.code) {
                message.error("兵卒只能吃将帅");
                return;
            }
            if (chessX !== opponentChessX && chessY !== opponentChessY) {
                message.error("兵卒只能吃临近的将帅");
                return;
            }
        }
        const opponentChessId = selectedOpponentItem.id;
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        const personState = localStorage.getItem('state');
        let params = {
            chessId,
            opponentChessId,
            personId,
            opponentId,
            personState
        }
        axios.get(auth.getPath() + '/operate', { params })
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                if (result.victory) {
                    // this.setState({
                    //     modalVisible: true
                    // })
                    // const modalVisibleAction = {
                    //     type: OPERATE_MODAL_VISIBLE,
                    //     value: true
                    // }
                    const modalVisibleAction = getOperateModalVisibleAction(true);
                    store.dispatch(modalVisibleAction);
                }
                // this.setState({
                //     selectedItem: ''
                // })
                // const action = {
                //     type: SELECT_ITEM,
                //     value: ''
                // }
                const action = getSelectItemAction('');
                store.dispatch(action);
            } else if (result && result.result == 1) {
                message.error(result.msg);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('操作失败');
        })
        .then(() => {

        });
        // auth.fetch('/operate','get',params,(result)=>{
        //     if (result && result.result == 0) {
        //         if (result.victory) {
        //             // this.setState({
        //             //     modalVisible: true
        //             // })
        //             // const modalVisibleAction = {
        //             //     type: OPERATE_MODAL_VISIBLE,
        //             //     value: true
        //             // }
        //             const modalVisibleAction = getOperateModalVisibleAction(true);
        //             store.dispatch(modalVisibleAction);
        //         }
        //         // this.setState({
        //         //     selectedItem: ''
        //         // })
        //         // const action = {
        //         //     type: SELECT_ITEM,
        //         //     value: ''
        //         // }
        //         const action = getSelectItemAction('');
        //         store.dispatch(action);
        //     } else if (result && result.result == 1) {
        //         message.error(result.msg);
        //     }
        // });
    }
    
    // 翻子
    reverseChess = (item) => {
        let items = this.state.items;
        let semaphore = this.state.semaphore;
        items[item.x-1][item.y-1].state = 'DISPLAY'; 
        const role = localStorage.getItem('role');
        // const action = {
        //     type: REVERSE_CHESS,
        //     value: {
        //         items,
        //         semaphore
        //     }
        // }
        if (role == 'CONSUMER') {
            semaphore = 0;
            // this.setState({
            //     items,
            //     semaphore
            // });
            const action = getReverseChessAction(items, semaphore);
            store.dispatch(action);
            this.commonReverseChess(item.id);
        } else if (role == 'PRODUCER') {
            semaphore = 1;
            // this.setState({
            //     items,
            //     semaphore
            // });
            const action = getReverseChessAction(items, semaphore);
            store.dispatch(action);
            this.commonReverseChess(item.id);
        }
         if (!role) {
            // 第一次翻子
            semaphore = 0;
            // this.setState({
            //     items,
            //     semaphore
            // });
            const action = getReverseChessAction(items, semaphore)
            store.dispatch(action);
            this.firstReverseChess(item.id, item.color);
        }
    }
    commonReverseChess = (itemId) => {
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        let personState = localStorage.getItem('state');
        if (personState == 'ACTIVE') {
            localStorage.setItem('state', 'LOCK');
        } else if (personState == 'LOCK') {
            localStorage.setItem('state', 'ACTIVE');
        }
        personState = localStorage.getItem('state');
        let params = {
            personId,
            opponentId,
            personState,
            chessId: itemId
        }
        axios.get(auth.getPath() + '/reverseChess', { params })
        .then((response) => {
            const result = response.data;
            if (result && result.result == 1) {
                const state = localStorage.getItem('state');
                let semaphore = this.state.semaphore
                if ("PRODUCER" == state) {
                    semaphore += 1;
                } else if ('CONSUMER' == state) {
                    semaphore -= 1;
                }
                // this.setState({
                //     semaphore
                // });
                const action = getSetSemaphoreAction(semaphore);
                store.dispatch(action);
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('翻子操作失败');
        })
        .then(() => {

        });
        // auth.fetch('/reverseChess','get',params,(result)=>{
        //     if (result && result.result == 1) {
        //         const state = localStorage.getItem('state');
        //         let semaphore = this.state.semaphore
        //         if ("PRODUCER" == state) {
        //             semaphore += 1;
        //         } else if ('CONSUMER' == state) {
        //             semaphore -= 1;
        //         }
        //         this.setState({
        //             semaphore
        //         })
        //     }
        // });
    }
    //第一次翻子
    firstReverseChess = (itemId,itemColor) => {
        localStorage.setItem('role','CONSUMER');
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        let params = {
            chessId: itemId,
            personId,
            opponentId,
            color: itemColor
        }
        axios.get(auth.getPath() + '/firstReverseChess', { params })
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                axios.get(auth.getPath() + '/queryPersonById', {id: personId })
                .then((res) => {
                    if (res.data) {
                        localStorage.setItem('color', res.color);
                        localStorage.setItem('state', res.state);
                    }
                })
                .catch((error) => {

                })
                .then(() => {

                })
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('第一次翻子操作失败');
        })
        .then(() => {

        });
        // auth.fetch('/firstReverseChess','get',params,(result)=>{
        //     if (result && result.result == 0) {
        //         auth.fetch('/queryPersonById','get',{id: personId},(res)=>{
        //             if (res) {
        //                 localStorage.setItem('color', res.color);
        //                 localStorage.setItem('state', res.state);
        //             }
        //         });
        //     }
        // });
    }
    handleCancel = (e) => {
        message.success('和局')
    }
    handleReset = (e) => {
        axios.get(auth.getPath() + '/initData')
        .then((response) => {
            const result = response.data;
            if (result && result.result == 0) {
                message.success('重开成功');
                const action = getHandleResetAction('', '', '', '', 'CONSUMER', 1);
                store.dispatch(action);
            } else {
                message.error('重开失败');
            }
        })
        .catch((error) => {
            console.log(error);
            message.error('重开操作失败');
        })
        .then(() => {

        });

        // auth.fetch('/initData','get','',(result)=>{
        //     if (result && result.result == 0) {
        //         message.success('重开成功');
        //         // const action = {
        //         //     type: HANDLE_RESET,
        //         //     value: {
        //         //         localStorageSetItemRole: '',
        //         //         localStorageSetItemState: '',
        //         //         localStorageSetItemColor: '',
        //         //         selectedItem: '',
        //         //         role: 'CONSUMER',
        //         //         semaphore: 1
        //         //     }
        //         // }
        //         const action = getHandleResetAction('', '', '', '', 'CONSUMER', 1);
        //         store.dispatch(action);
        //         // localStorage.setItem('role', '');
        //         // localStorage.setItem('state', '');
        //         // localStorage.setItem('color', '');
        //         // this.setState({
        //         //     selectedItem: '',
        //         //     role: 'CONSUMER',
        //         //     semaphore: 1
        //         // })
        //     } else {
        //         message.error('重开失败');
        //     }
        // });
    }
    handleModal = () => {
        // this.setState({
        //     modalVisible: false
        // })
        // const modalVisibleAction = {
        //     type: OPERATE_MODAL_VISIBLE,
        //     value: false
        // }
        const modalVisibleAction = getOperateModalVisibleAction(true);
        store.dispatch(modalVisibleAction);
    }
    render() {
        const { items, selectedItem, selectedItemBackgroudColor, semaphore, role } = this.state;
        return (
            <Fragment>
                <div className="monitor-frame">
                    <div className="layout-operation">
                        <Button type="primary" size="large" onClick={this.handleReset.bind(this)}>重开</Button>
                        <Button type="primary" onClick={this.handleCancel.bind(this)}>结束</Button>
                    </div>
                    <div className="chess-container">
                        {items.map((rowItem,rowIndex)=>{
                            return (
                                <Row key={rowIndex}>
                                    {rowItem.map((colItem, colIndex) => {
                                        return (
                                            <Col span={3} key={colIndex}>
                                                <Button className='chess-btn'
                                                    shape="circle" 
                                                    style={{color:colItem?colItem.color:'#fff',
                                                            backgroundColor: colItem.state==='DEAD'?'peru':
                                                            (selectedItem && (selectedItem.x == colItem.x &&
                                                                selectedItem.y==colItem.y)?selectedItemBackgroudColor:'tan')}}
                                                    onClick={()=>this.onSelect(colItem)}
                                                    disabled={(role=='CONSUMER'&&semaphore==0)||(role=='PRODUCER'&&semaphore==1)}>
                                                        {colItem && colItem.state == 'DISPLAY'?colItem.name:''}
                                                </Button>
                                            </Col>
                                        )
                                    })
                                    }
                                </Row>
                            )
                        })
                        }
                    </div>
                    <Modal
                        title="结束提示"
                        visible={this.state.modalVisible}
                        onOk={this.handleModal.bind(this)}
                        onCancel={this.handleModal.bind(this)}
                        >
                        <p>恭喜您，赢了本局！</p>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}