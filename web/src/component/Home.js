import React, { Component, Fragment } from 'react';
import { Icon, Row, Col, Button, message, Modal } from 'antd';
import axios from 'axios';
import { auth } from '../common/auth';
import './css/home.less';
import store from './../store/index';
import { connect } from 'react-redux';
import { 
    getClearSelectedAndSelectedOpponentAction,
    getLockFrameAction,
    getSelectItemAction,
    getOperateModalVisibleAction,
    getReverseChessAction,

    sagaInitDataAction,
    sagaFetchChesserByIdAction,
    sagaOperationAciton,
    sagaReverseChessAction,
    sagaFirstReverseChessAction,
    sagaResetAction 
 } from './../store/actionCreators';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.state = store.getState();
        // store.subscribe(this.handleStoreChange)
    }
    
    // handleStoreChange = () => {
    //     this.setState(store.getState())
    // }

    componentDidMount = () => {
        const id = localStorage.getItem('id');
        if (id) {
            // const action = sagaInitDataAction();
            // store.dispatch(action);
            this.props.sagaInitData();
            // const fetchChessAction = sagaFetchChesserByIdAction(id);
            // store.dispatch(fetchChessAction);
            this.props.sagaFetchChesserById(id);
            setInterval(()=>{
                // const action = sagaInitDataAction();
                // store.dispatch(action);
                this.props.sagaInitData();
                // const fetchChessAction = sagaFetchChesserByIdAction(id);
                // store.dispatch(fetchChessAction);
                this.props.sagaFetchChesserById(id);
            },2000)
        } else {
            window.location.href="/login";
        }
        
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
        // const action = getLockFrameAction(semaphore, role);
        // store.dispatch(action);
        this.props.lockFrame(semaphore, role);
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
        if (!this.props.selectedItem) {
            const color = localStorage.getItem('color');
            if (color && color !== item.color && "DISPLAY" == item.state) {
                message.error('不能操作对方棋子')
                return;
            }
             // 判断此棋子是否已翻开
             if (item.state == 'NONE') {
                // const action = getClearSelectedAndSelectedOpponentAction('','');
                // store.dispatch(action);
                this.props.clearSelectedAndSelectedOpponent('', '');
                this.reverseChess(item);
            } else if (item.state == 'DISPLAY') {
                if (!color && item.color !== localStorage.getItem('color') && !this.props.selectedItem) {
                    return;
                }
                if (!this.props.selectedItem) {
                    if (item.code == '') {
                        return;
                    }
                    // 选中要操作的棋子
                    // const action = getSelectItemAction(item);
                    // store.dispatch(action);
                    this.props.selectItem(item);
                } else {
                    this.operateChess(item);
                }
                
            }
        } else {
            // 再次点击选中的棋子，取消选中
            if (this.props.selectedItem.id === item.id) {
                // const action = getSelectItemAction('');
                // store.dispatch(action);
                this.props.selectItem('');
                return;
            }
            if (this.props.selectedItem.color === item.color && this.props.selectedItem.code !== 'pao') {
                message.error("相同颜色不能操作");
                return;
            }
            this.operateChess(item);
        }
    }

    // 兑子，吃子，移动操作
    operateChess = (selectedOpponentItem) => {
        const selectedX = this.props.selectedItem.x;
        const selectedY = this.props.selectedItem.y;
        const selectedColor = this.props.selectedItem.color;
        // 颜色相同，重新选择
        if (selectedColor == selectedOpponentItem.color && this.props.selectedItem.code !== 'pao') {
            // const action = getSelectItemAction(item);
            // store.dispatch(action);
            this.props.selectItem('');
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
        this.operation(this.props.selectedItem, selectedOpponentItem);
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
        // const action = sagaOperationAciton(chessId, opponentChessId, personId, opponentId, personState);
        // store.dispatch(action);
        this.props.sagaOperation(chessId, opponentChessId, personId, opponentId, personState);
    }
    
    // 翻子
    reverseChess = (item) => {
        let items = this.props.items;
        let semaphore = this.props.semaphore;
        items[item.x-1][item.y-1].props = 'DISPLAY'; 
        const role = localStorage.getItem('role');
        if (role == 'CONSUMER') {
            semaphore = 0;
            // const action = getReverseChessAction(items, semaphore);
            // store.dispatch(action);
            this.props.reverseChess(items, semaphore);
            this.commonReverseChess(item.id);
        } else if (role == 'PRODUCER') {
            semaphore = 1;
            // const action = getReverseChessAction(items, semaphore);
            // store.dispatch(action);
            this.props.reverseChess(items, semaphore);
            this.commonReverseChess(item.id);
        }
         if (!role) {
            // 第一次翻子
            semaphore = 0;
            // const action = getReverseChessAction(items, semaphore)
            // store.dispatch(action);
            this.props.reverseChess(items, semaphore);
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
        // const action = sagaReverseChessAction(personId, opponentId, personState, itemId);
        // store.dispatch(action);
        this.props.sagaReverseChess(personId, opponentId, personState, itemId);
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
        // const action = sagaFirstReverseChessAction(itemId, personId, opponentId, itemColor);
        // store.dispatch(action);
        this.props.sagaFirstReverseChess(itemId, personId, opponentId, itemColor);
    }
    handleCancel = (e) => {
        message.success('和局')
    }
    // handleReset = (e) => {
    //     // const action = resetAction();
    //     const action = sagaResetAction();
    //     store.dispatch(action);
    // }
    // handleModal = () => {
    //     const modalVisibleAction = getOperateModalVisibleAction(true);
    //     store.dispatch(modalVisibleAction);
    // }
    render() {
        // const { items, selectedItem, selectedItemBackgroudColor, semaphore, role, modalVisible } = this.state;
        const { items, selectedItem, selectedItemBackgroudColor, semaphore, role, modalVisible,
            handleReset, handleModal } = this.props;
        return (
            <Fragment>
                <div className="monitor-frame">
                    <div className="layout-operation">
                        <Button type="primary" size="large" onClick={handleReset}>重开</Button>
                        <Button type="primary" onClick={this.handleCancel}>结束</Button>
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
                        visible={modalVisible}
                        onOk={handleModal}
                        onCancel={handleModal}
                        >
                        <p>恭喜您，赢了本局！</p>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        selectedItem: state.selectedItem,
        selectedOpponentItem: state.selectedOpponentItem,
        selectedItemBackgroudColor: state.selectedItemBackgroudColor,
        data: state.data,
        started: state.started,
        semaphore: state.semaphore,
        role: state.role,
        modalVisible: state.modalVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sagaInitData() {
            const action = sagaInitDataAction();
            dispatch(action);
        },
        
        sagaFetchChesserById(id) {
            const fetchChessAction = sagaFetchChesserByIdAction(id);
            dispatch(fetchChessAction);
        },
        
        lockFrame(semaphore, role) {
            const action = getLockFrameAction(semaphore, role);
            dispatch(action);
        },
        

        handleReset() {
            const action = sagaResetAction();
            dispatch(action);
        },

        handleModal() {
            const modalVisibleAction = getOperateModalVisibleAction(false);
            dispatch(modalVisibleAction);
        },

        clearSelectedAndSelectedOpponent(selectedItem, selectedOpponentItem) {
            const action = getClearSelectedAndSelectedOpponentAction(selectedItem, selectedOpponentItem);
            dispatch(action);
        },

        selectItem(item) {
            const action = getSelectItemAction(item);
            dispatch(action);
        },
        
        sagaOperation(chessId, opponentChessId, personId, opponentId, personState) {
            const action = sagaOperationAciton(chessId, opponentChessId, personId, opponentId, personState);
            dispatch(action);
        },
       
        reverseChess(items, semaphore) {
            const action = getReverseChessAction(items, semaphore);
            dispatch(action);
        },

        sagaReverseChess(personId, opponentId, personState, itemId) {
            const action = sagaReverseChessAction(personId, opponentId, personState, itemId);
            dispatch(action);
        },
        
        sagaFirstReverseChess(itemId, personId, opponentId, itemColor) {
            const action = sagaFirstReverseChessAction(itemId, personId, opponentId, itemColor);
            dispatch(action);
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);