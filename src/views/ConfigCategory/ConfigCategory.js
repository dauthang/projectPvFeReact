import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import ConfigCategoryAddOrEdit from './ConfigCategoryAddOrEdit.js';
class ConfigCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["STT", "Hành động", "Tên danh mục", "Mã danh mục", "Mô tả", "Mặc định"],
            tableData: [],
            data: null,
            checkOpenDropdownMenu: false,
            show: false,
            data: {},
            action: "ADD",
        }
        this.onSearch = this.onSearch.bind(this);
        this.delete = this.delete.bind(this);
        this.detail = this.detail.bind(this);
        this.add = this.add.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.openPopUp = this.closePopUp.bind(this);
    }

    componentDidMount() {
        this.onSearch();
    }

    onSearch() {
        fetch("http://localhost:8080/category/categorys")
            .then(res => res.json())
            .then(
                (result) => {
                    let data = [];
                    for (let i = 0; i < result.length; i++) {
                        let array = [i + 1 + "",
                        <div><IconButton aria-label="delete"><DeleteIcon onClick={() => this.delete(result[i].categoryId)} /></IconButton><IconButton aria-label="edit"><EditIcon onClick={() => this.detail(result[i].categoryId)} /></IconButton ></div>,
                        result[i].name + "", result[i].code + "", result[i].description + "", result[i].isDefault + "" === "1" ? "Hoạt động" : "Không hoạt đọng"]
                        data.push(array);
                    }
                    this.setState({
                        tableData: data
                    })
                }
            )
    }

    delete(categoryId) {
        const url = `http://localhost:8080/category/delete/${categoryId}`;
        axios
            .delete(url)
            .then(res => {
                this.onSearch();
            })
            .catch(err => {
                console.log(err);
            });
    }

    detail(categoryId) {
        axios({
            url: `http://localhost:8080/category/category/${categoryId}`,
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

    render() {
        return (
            <div>
                {
                    this.state.show ? <ConfigCategoryAddOrEdit closePopUp={this.closePopUp} data={this.state.data} action={this.state.action} /> 
                    : <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>Danh sách</h4>
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
                        </GridItem>
                    </GridContainer> 
                }
            </div>
        );
    }
}


export default ConfigCategory;