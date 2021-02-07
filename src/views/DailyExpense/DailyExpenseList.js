import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import DailyExpensePopupImport from './DailyExpensePopupImport.js';
import DailyExpenseAddOrEdit from './DailyExpenseAddOrEdit.js';

class DailyExpenseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["STT", "Hành động", "STT", "Nội dung", "Chi tiết", "Chi tiền", "Ngày báo cáo", "Tháng báo cáo", "Năm báo cáo"],
            tableData: [],
            data: null,
            checkOpenDropdownMenu: false,
            show: false,
            data: {},
            action: "ADD",
            showPopupImport: false
        }
        this.onSearch = this.onSearch.bind(this);
        this.delete = this.delete.bind(this);
        this.detail = this.detail.bind(this);
        this.add = this.add.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.openPopUp = this.closePopUp.bind(this);
        this.openPopupImport = this.openPopupImport.bind(this);
        this.closePopupImport = this.closePopupImport.bind(this);
    }

    componentDidMount() {
        this.onSearch();
    }

    onSearch() {
        fetch("http://localhost:8080/dailyExpenseService/moneys")
            .then(res => res.json())
            .then(
                (result) => {
                    let data = [];
                    for (let i = 0; i < result.length; i++) {
                        let array = [i + 1 + "",
                        <div><IconButton aria-label="delete"><DeleteIcon onClick={() => this.delete(result[i].id)} /></IconButton><IconButton aria-label="edit"><EditIcon onClick={() => this.detail(result[i].id)} /></IconButton ></div>,
                        result[i].tenBaocao + "", result[i].tienSong + "", result[i].tienTietKiem + "", result[i].tienChoi + "", result[i].thangBaocao + "", result[i].namBaoCao + "" ]
                        data.push(array);
                    }
                    this.setState({
                        tableData: data
                    })
                }
            )
    }

    delete(id) {
        const url = `http://localhost:8080/dailyExpenseService/delete/${id}`;
        axios
            .delete(url)
            .then(res => {
                this.onSearch();
            })
            .catch(err => {
                console.log(err);
            });
    }

    detail(id) {
        axios({
            url: `http://localhost:8080/dailyExpenseService/money/${id}`,
            method: 'get',
        }).then((response) => {
            console.log(response.data)
            this.setState({
                data: response.data,
                show: true,
                action: "EDIT"
            })
        })
    }

    add() {
        this.setState({
            action: "ADD",
            show: true
        })
    }

    openPopUp() {
        this.setState({
            show: true
        })
    }

    closePopUp() {
        this.setState({
            show: false
        })
        this.onSearch();
    }

    openPopupImport() {
        this.setState({
            showPopupImport: true
        })
    }

    closePopupImport() {
        this.setState({
            showPopupImport: false
        })
        this.onSearch();
    }

    render() {
        return (
            <div>
                {
                    this.state.show ? <DailyExpenseAddOrEdit closePopUp={this.closePopUp} data={this.state.data} action={this.state.action} />
                        : <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4>Danh sách</h4>
                                        <button onClick={this.add}>Thêm mới</button>
                                        <button onClick={this.export}>Export!</button>
                                        <button onClick={this.openPopupImport}>Import!</button>
                                    </CardHeader>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="primary"
                                            tableHead={this.state.tableHead}
                                            tableData={this.state.tableData}
                                            delete={this.delete}
                                            dropdownMenu={this.dropdownMenu}
                                            checkOpenDropdownMenu={this.state.checkOpenDropdownMenu}
                                        />
                                    </CardBody>
                                </Card>
                                {
                                this.state.showPopupImport ? (
                                    <DailyExpensePopupImport openPopup={this.state.showPopupImport} closePopupImport={this.closePopupImport}>

                                    </DailyExpensePopupImport>) : null
                            }
                            </GridItem>
                        </GridContainer>
                }
            </div>
        );
    }
}


export default DailyExpenseList;