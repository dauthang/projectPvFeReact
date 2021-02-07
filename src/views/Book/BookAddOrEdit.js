import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import CustomSelect from "components/CustomSelect/CustomSelect.js"
import DialogActions from '@material-ui/core/DialogActions';

class BookAddOrEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addOrEditSubmit = this.addOrEditSubmit.bind(this);
        this.handleChangeTest = this.handleChangeTest.bind(this);
        this.state = {
            name: "",
            category: "",
            author: "",
            pages: "",
            publication: "",
            price: "",
            list : [{value : 1, name : "thang"}, {value : 2, name : "thang1"}],
            selectValue : {}
        }
    }

    componentDidMount() {
        if (this.props.action === "EDIT") {
            this.setState({
                id: this.props.data.id,
                name: this.props.data.name,
                category: this.props.data.category,
                author: this.props.data.author,
                pages: this.props.data.pages,
                publication: this.props.data.publication,
                price: this.props.data.price,
            })
        } else {
            this.setState({
                name: "",
                category: "",
                author: "",
                pages: "",
                publication: "",
                price: ""
            })
        }
    }

    handleChange(event) {
        if (event.target.id === "name") {
            this.setState({
                name: event.target.value
            })
        } else if (event.target.id === "category") {
            this.setState({
                category: event.target.value
            })
        } else if (event.target.id === "author") {
            this.setState({
                author: event.target.value
            })
        } else if (event.target.id === "pages") {
            this.setState({
                pages: event.target.value
            })
        } else if (event.target.id === "publication") {
            this.setState({
                publication: event.target.value
            })
        } else if (event.target.id === "price") {
            this.setState({
                price: event.target.value
            })
        }
    }

    addOrEditSubmit() {
        if (this.props.action === "ADD") {
            let data = { name: this.state.name, category: this.state.category, author: this.state.name, author: this.state.name, pages: this.state.pages, publication: this.state.publication, price: this.state.price, }
            axios({
                url: `http://localhost:8080/bookservice/insert`,
                method: 'post',
                data: data,
            })
                .then((response) => {
                    if (response.data.key === "SUCCESS") {
                        this.props.closePopUp();
                    }
                })
        } else {
            let data = { id: this.state.id, name: this.state.name, category: this.state.category, author: this.state.name, author: this.state.name, pages: this.state.pages, publication: this.state.publication, price: this.state.price, }
            axios({
                url: `http://localhost:8080/bookservice/update`,
                method: 'post',
                data: data,
            })
                .then((response) => {
                    if (response.data.key === "SUCCESS") {
                        this.props.closePopUp();
                    }
                })
        }

    }
    handleChangeTest(event) {
        this.setState({
            selectValue : { option : event.target.value}
        })
    }
    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>{this.props.action === "ADD" ? "Thêm mới sách" : "Cập nhật sách"}</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tên sách"
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.name,
                                            onChange: this.handleChange,
                                            required: "true"
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Thể loại"
                                        id="category"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.category,
                                            onChange: this.handleChange,
                                            required: "true"
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tác giả"
                                        id="author"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.author,
                                            onChange: this.handleChange,
                                            required: "true"
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tổng số trang"
                                        id="pages"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.pages,
                                            onChange: this.handleChange,
                                            required: "true"
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Nhà xuất bản"
                                        id="publication"
                                        formControlProps={{
                                            fullWidth: "true"
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.publication,
                                            onChange: this.handleChange,
                                            required: "true"
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Giá tiền"
                                        id="price"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: false,
                                            value: this.state.price,
                                            onChange: this.handleChange,
                                            required: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <div className="text-center">
                                <Button color="primary" onClick={this.addOrEditSubmit}>{this.props.action === "ADD" ? "Thêm mới" : "Cập nhật"}</Button>
                                <Button color="primary" onClick={this.props.closePopUp}>Quay lại</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}
export default BookAddOrEdit;