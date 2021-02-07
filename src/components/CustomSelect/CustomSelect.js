import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: {},
            options: [],
            label: "",
            inputProps: {}
        };
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel id="demo-simple-select-label"  style={{marginTop : 20}}>{this.props.label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.props.selectValue.value ? this.props.selectValue.value : ""}
                        onChange={this.props.handleChange}
                        {...this.props.inputProps}
                        style={{marginTop : 34}}
                    >
                        {this.props.options.map((prop, key) => {
                            return (
                                <MenuItem value={prop.value}>{prop.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CustomSelect);
