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

class MonneyAddOrEdit extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addOrEditSubmit = this.addOrEditSubmit.bind(this);
        this.handleChangeTest = this.handleChangeTest.bind(this);
        this.getListCategoryType = this.getListCategoryType.bind(this);
        this.handleChangeCategoryType = this.handleChangeCategoryType.bind(this);
        this.state = {
            name: "",
            categoryTypeId: "",
            code: "",
            description: "",
            isDefault: "",
            // list
            listCategoryType: [],
            // select
            selectValueCategoryType: {}
        }
    }

    componentDidMount() {
        this.getListCategoryType();
        if (this.props.action === "EDIT") {
            this.setState({
                categoryId: this.props.data.categoryId,
                name: this.props.data.name,
                code: this.props.data.code,
                categoryType: this.props.data.categoryType,
                description: this.props.data.description,
                idDefault: this.props.data.idDefault,
            })
        } else {
            this.setState({
                name: "",
                categoryType: "",
                description: "",
                idDefault: "",
                code: ""
            })
        }
    }

    handleChange(event) {
        if (event.target.id === "name") {
            this.setState({
                categoryType: event.target.value
            })
        }
        else if (event.target.id === "description") {
            this.setState({
                description: event.target.value
            })
        } else if (event.target.id === "code") {
            this.setState({
                code: event.target.value
            })
        } else if (event.target.id === "idDefault") {
            this.setState({
                idDefault: event.target.value
            })
        }
    }

    addOrEditSubmit() {
        if (this.props.action === "ADD") {
            let data = { name: this.state.name, categoryType: this.state.selectValueCategoryType.value ? this.state.selectValueCategoryType.value : "", description: this.state.description, code: this.state.code, idDefault: this.state.idDefault }
            axios({
                url: `http://localhost:8080/category/insert`,
                method: 'post',
                data: data,
            })
                .then((response) => {
                    if (response.data.key === "SUCCESS") {
                        this.props.closePopUp();
                    }
                })
        } else {
            let data = { categoryId: this.state.categoryId, name: this.state.name, categoryType: this.state.categoryType, description: this.state.description, code: this.state.code, idDefault: this.state.idDefault }
            axios({
                url: `http://localhost:8080/category/update`,
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
            selectValue: { value: event.target.value }
        })
    }

    getListCategoryType() {
        fetch("http://localhost:8080/category/categoryTypes")
            .then(res => res.json())
            .then(
                (result) => {
                    let listCategoryType = [];
                    for (const item of result) {
                        let data = { value: item.categoryTypeId, name: item.name }
                        listCategoryType.push(data)

                    }
                    this.setState({
                        listCategoryType: listCategoryType
                    })
                }
            )

    }

    handleChangeCategoryType(event) {
        this.setState({
            selectValueCategoryType: { value: event.target.value }
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
                                    <CustomSelect options={this.state.listCategoryType} selectValue={this.state.selectValueCategoryType} handleChange={this.handleChangeCategoryType} label="Mã loại danh mục" />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Tên cấu hình danh mục"
                                        id="name"
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
                                        labelText="Mã cấu hình danh mục"
                                        id="code"
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
                                        labelText="Mô tả"
                                        id="description"
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
                                        labelText="Mặc định"
                                        id="isDefault"
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

export default MonneyAddOrEdit;