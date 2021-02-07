import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert } from '@material-ui/lab';

class MoneyPopupImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checkAlert: false,
            loading: false,
            msg: ""
        }
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.converDate = this.converDate.bind(this);
    }

    componentDidMount() {
    }

    onFileUpload() {
        axios({
            url: `http://localhost:8080/import/importMoneys`,
            method: 'post',
            data: this.state.data,
            headers: {
                "Content-Type": "multipart/form-data; boundary=AaB03x" +
                    "--AaB03x" +
                    "Content-Disposition: file" +
                    "Content-Type: png" +
                    "Content-Transfer-Encoding: binary" +
                    "...data... " +
                    "--AaB03x--",
                "Accept": "application/json",
                "type": "formData"
            },
        })
            .then((response) => {
                if (response.data.key === "SUCCESS") {
                    this.setState({
                        loading: true
                    })
                    setTimeout(() => {
                        this.props.closePopupImport()
                    }, 3000);
                } else if (response.data.key === "FORMAT") {
                    this.setState({
                        checkAlert: true,
                        msg: response.data.message
                    })
                } else if (response.data.key === "EMPTY") {
                    this.setState({
                        checkAlert: true,
                        msg: response.data.message
                    })
                } else {
                    this.setState({
                        checkAlert: true,
                        msg: "IMPORT KHÔNG THÀNH CÔNG"
                    })
                }
            }).catch(error => {
                this.setState({
                    checkAlert: true,
                    msg: "IMPORT KHÔNG THÀNH CÔNG"
                })
            })
    }

    onFileChange = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        this.setState({
            data: data
        })
    }

    onDownload() {
        axios({
            url: `http://localhost:8080/download/templateMoney`,
            method: 'get',
            responseType: 'blob'
        }).then((response) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', "bookFile_" + this.converDate() + ".xlsx"); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove()
        }).catch( res => {
            this.setState({
                checkAlert: true,
                msg: "EXPORT BỊ LỖI"
            })
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
                <Dialog maxWidth="md" fullWidth={true} onClose={false} aria-labelledby="max-width-dialog-title" open={this.props.openPopup}>
                    <DialogTitle id="simple-dialog-title">Import File</DialogTitle>
                    <DialogContent>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    {/* <CardHeader color="primary">
                                        <h4>Import</h4>
                                    </CardHeader> */}
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <input type="file" onChange={this.onFileChange} accept="application/vnd.ms-excel" />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <Button onClick={this.onDownload}>Tải file mẫu</Button>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onFileUpload} color="primary">Import !!!</Button>
                        <Button onClick={this.props.closePopupImport} color="primary">Close</Button>
                    </DialogActions>
                    {this.state.checkAlert ? <Alert severity="error">{this.state.msg}</Alert> : null}
                </Dialog>
            </div>
        )
    }
}

export default MoneyPopupImport;