import React, { Component, Fragment } from 'react';
import { Icon, Row, Col, Button, message, Modal } from 'antd';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { auth } from './../common/auth';
import './css/home.less';
import { connect } from 'react-redux';
import { 
    getInitDataAction,
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

 @connect(
    state=>({
        items: state.home.items,
        selectedItem: state.home.selectedItem,
        selectedOpponentItem: state.home.selectedOpponentItem,
        selectedItemBackgroudColor: state.home.selectedItemBackgroudColor,
        data: state.home.data,
        started: state.home.started,
        semaphore: state.home.semaphore,
        role: state.home.role,
        modalVisible: state.home.modalVisible
    }),
    {
        getInitData: getInitDataAction,
        sagaInitData: sagaInitDataAction,
        sagaFetchChesserById: sagaFetchChesserByIdAction,
        lockFrame: getLockFrameAction,
        handleReset: sagaResetAction,
        handleModal: getOperateModalVisibleAction,
        clearSelectedAndSelectedOpponent: getClearSelectedAndSelectedOpponentAction,
        selectItem: getSelectItemAction,
        sagaOperation: sagaOperationAciton,
        reverseChess: getReverseChessAction,
        sagaReverseChess: sagaReverseChessAction,
        sagaFirstReverseChess: sagaFirstReverseChessAction,
    }
)

class Home extends Component {
    
    constructor(props) {
        super(props);
    }

    getInitDataDispatch = (items) => {
        this.props.getInitData(items);
    }

    sagaInitDataDispatch = () => {
        this.props.sagaInitData();
    }

    sagaFetchChesserByIdDispatch = (id) => {
        this.props.sagaFetchChesserById(id);
    }

    lockFrameDispatch = (semaphore, role) => {
        this.props.lockFrame(semaphore, role);
    }

    handleResetDispatch = () => {
        this.props.handleReset();
    }

    handleModalDispatch = () => {
        this.props.handleModal(false);
    }

    clearSelectedAndSelectedOpponentDispatch = (selectedItem, selectedOpponentItem) => {
        this.props.clearSelectedAndSelectedOpponent(selectedItem, selectedOpponentItem);
    }

    selectItemDispatch = (item) => {
        this.props.selectItem(item);
    }

    sagaOperationDispatch = (chessId, opponentChessId, personId, opponentId, personState) => {
        this.props.sagaOperation(chessId, opponentChessId, personId, opponentId, personState);
    }

    reverseChessDispatch = (items, semaphore) => {
        this.props.reverseChess(items, semaphore);
    }

    sagaReverseChessDispatch = (personId, opponentId, personState, itemId) => {
        this.props.sagaReverseChess(personId, opponentId, personState, itemId);
    }

    sagaFirstReverseChessDispatch = (itemId, personId, opponentId, itemColor) => {
        this.props.sagaFirstReverseChess(itemId, personId, opponentId, itemColor);
    }

    componentDidMount = () => {
        const id = localStorage.getItem('id');
        const rws = new ReconnectingWebSocket('ws://localhost:8090/websocket/'+ id);
        if (id) {
            rws.addEventListener('open', ()=> {
                rws.send('');
            });
            rws.addEventListener('message', e => {
                if (e.data) {
                    const wsResultData = JSON.parse(e.data)
                    this.initData(wsResultData.chess);
                    this.fetchChesserById(wsResultData.person);
                }
            });
            this.sagaInitDataDispatch();
            this.sagaFetchChesserByIdDispatch(id);
            // setInterval(()=>{
            //     this.sagaInitDataDispatch();
            //     this.sagaFetchChesserByIdDispatch(id);
            // },2000)
        } else {
            window.location.href="/login";
        }
        
    }

    initData = (data) => {
        const items = [['','','','','','','',''],['','','','','','','',''],['','','','','','','',''],['','','','','','','','']];
        if (data) {
            data.forEach(element => {
                items[element.x-1][element.y-1] = element;
            });
            this.getInitDataDispatch(items);
        }
    }

    fetchChesserById = (data) => {
        console.log(data)
        const id = localStorage.getItem("id");
        let role;
        let state ;
        let color;
        for (let i=0;i<data.length;i++){
            if (id == data[i].id) {
                role = data[i].role;
                state = data[i].state;
                color = data[i].color;
            }
        }
        role?localStorage.setItem('role', role):'';
        state?localStorage.setItem('state', state):'';
        color?localStorage.setItem('color', color):'';
        if (state && role) {
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
            this.lockFrameDispatch(semaphore, role);
            // const action = getLockFrameAction(semaphore, role);
            // yield put(action);
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
        this.lockFrameDispatch(semaphore, role);
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
                this.clearSelectedAndSelectedOpponentDispatch('', '')
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
                    this.selectItemDispatch(item);
                } else {
                    this.operateChess(item);
                }
                
            }
        } else {
            // 再次点击选中的棋子，取消选中
            if (this.props.selectedItem.id === item.id) {
                this.selectItemDispatch('');
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
            this.selectItemDispatch('');
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
        this.sagaOperationDispatch(chessId, opponentChessId, personId, opponentId, personState);
    }
    
    // 翻子
    reverseChess = async (item) => {
        let items = this.props.items;
        let semaphore = this.props.semaphore;
        items[item.x-1][item.y-1].props = 'DISPLAY'; 
        const role = localStorage.getItem('role');
        if (role == 'CONSUMER') {
            semaphore = 0;
            await this.reverseChessDispatch(items, semaphore);
            this.commonReverseChess(item.id);
        } else if (role == 'PRODUCER') {
            semaphore = 1;
            await this.reverseChessDispatch(items, semaphore);
            this.commonReverseChess(item.id);
        }
         if (!role) {
            // 第一次翻子
            semaphore = 0;
            await this.reverseChessDispatch(items, semaphore);
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
        this.sagaReverseChessDispatch(personId, opponentId, personState, itemId);
    }
    //第一次翻子
    firstReverseChess = (itemId,itemColor) => {
        localStorage.setItem('role','CONSUMER');
        const personId = localStorage.getItem('id');
        const opponentId = localStorage.getItem('opponentId');
        this.sagaFirstReverseChessDispatch(itemId, personId, opponentId, itemColor);
    }
    handleCancel = (e) => {
        message.success('和局')
    }
   
    render() {
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
                        {items && items.map((rowItem,rowIndex)=>{
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

export default Home;