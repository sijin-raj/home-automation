import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions';

const MotorSwitch = props => {
  let thisSubDeviceParams;
  const dispatch = useDispatch();
  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );

  const filterSubDeviceParams = () =>
    subDeviceParams.filter(
      subDeviceParam =>
        subDeviceParam.paramName &&
        subDeviceParam.paramValue &&
        subDeviceParam.deviceId === props.deviceId &&
        subDeviceParam.subDeviceId === props.subDeviceId &&
        subDeviceParam.paramName === 'status'
    );

  if (props.deviceId && props.subDeviceId) {
    thisSubDeviceParams = filterSubDeviceParams();
  }

  const handleChange = _subDeviceParam => () => {
    const subDeviceParam = _subDeviceParam;
    subDeviceParam.paramValue = _subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch(subDeviceParamActions.updateSubDeviceParamStatus(subDeviceParam));
  };

  return (
    <Typography component="div">
      {thisSubDeviceParams && thisSubDeviceParams.length > 0 && (
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>{props.name} OFF</Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={thisSubDeviceParams[0].paramValue === 'on'}
              onChange={handleChange(thisSubDeviceParams[0])}
              inputProps={{ 'aria-label': props.name }}
            />
          </Grid>
          <Grid item>{props.name} ON</Grid>
        </Grid>
      )}
    </Typography>
  );
};

export default MotorSwitch;
