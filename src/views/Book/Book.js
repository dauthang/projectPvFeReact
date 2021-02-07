import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Stores from "reducers/reducers";
import { addTodo } from 'actions/actions';
import { createStore } from 'redux';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import BookAddOrEdit from '../Book/BookAddOrEdit.js';
import Button from "components/CustomButtons/Button.js";
import Popup from "reactjs-popup";
import BookPopup from "../Book/BookPopup.js";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["STT", "Hành động", "Tên sách", "Thể loại", "Tác giả", "Tổng số trang", "Nhà xuất bản", "Giá tiền"],
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
        this.dropdownMenu = this.dropdownMenu.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.detail = this.detail.bind(this);
        this.add = this.add.bind(this);
        this.openPopupImport = this.openPopupImport.bind(this);
        this.closePopupImport = this.closePopupImport.bind(this);
        this.export = this.export.bind(this);
    }
    componentDidMount() {
        this.onSearch();
    }

    onSearch() {
        fetch("http://localhost:8080/bookservice/books")
            .then(res => res.json())
            .then(
                (result) => {
                    let data = [];
                    for (let i = 0; i < result.length; i++) {
                        let array = [i + 1 + "",
                        <div><IconButton aria-label="delete"><DeleteIcon onClick={() => this.delete(result[i].id)} /></IconButton><IconButton aria-label="edit"><EditIcon onClick={() => this.detail(result[i].id)} /></IconButton ></div>,
                        result[i].name + "", result[i].category + "", result[i].author + "", result[i].pages + "", result[i].publication + "", result[i].price + ""]
                        data.push(array);
                    }
                    this.setState({
                        tableData: data
                    })
                }
            )
    }


    delete(id) {
        const url = `http://localhost:8080/bookservice/books/${id}`;
        axios
            .delete(url)
            .then(res => {
                this.onSearch();
            })
            .catch(err => {
                console.log(err);
            });
    }

    dropdownMenu() {

        // if(this.state.checkOpenDropdownMenu){
        //     this.setState({
        //         checkOpenDropdownMenu : true
        //     })
        // }else{
        //     this.setState({
        //         checkOpenDropdownMenu : false
        //     })
        // }
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

    detail(id) {
        axios({
            url: `http://localhost:8080/bookservice/books/${id}`,
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

    export(){
        axios({
            url: `http://localhost:8080/export/templateBook`,
            method: 'get',
            responseType: 'blob'
        }).then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "bookFileExport_" + this.converDate() + ".xlsx"); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove()
        }) 
    }

    converDate() {
        let date_ob = new Date();

        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // prints date in YYYY-MM-DD format
        return date + "_" + month + "_" + year;
    }
    
    render() {
        return (
            <div>
                {this.state.show ?
                    <BookAddOrEdit closePopUp={this.closePopUp} data={this.state.data} action={this.state.action} /> :
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>Danh sách</h4>
                                    <button onClick={this.export}>Export!</button>
                                    <button onClick={this.openPopupImport}>Import!</button>
                                    <button onClick={this.add}>Thêm mới</button>
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
                                    <BookPopup openPopup={this.state.showPopupImport} closePopupImport={this.closePopupImport}>

                                    </BookPopup>) : null
                            }

                        </GridItem>
                    </GridContainer>
                }
            </div>
        );
    }
}

export default Book;