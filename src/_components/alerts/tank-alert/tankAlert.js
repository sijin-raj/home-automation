import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { DeviceSettingContext } from '../../../_contexts/device-setting/DeviceSettingContext.provider';
import { SocketIdContext } from '../../../_contexts/socket-id/SocketIdContext.provider';
import { SubDeviceParamsContext } from '../../../_contexts/sub-device-param/SubDeviceParamContext.provider';
import { SubDeviceContext } from '../../../_contexts/sub-device/SubDeviceContext.provider';
import CountDownTimer from '../../count-down-timer/CountDownTimer';

const TankAlert = props => {
  let autoShutDownTime;
  const socketIdContext = useContext(SocketIdContext);
  const subDevicesContext = useContext(SubDeviceContext);
  const deviceSettingContext = useContext(DeviceSettingContext);
  const subDeviceParamsContext = useContext(SubDeviceParamsContext);
  const subDeviceParams = subDeviceParamsContext.subDeviceParams;
  const onlineDevices = socketIdContext.onlineDevices;
  const subDevices = subDevicesContext.subDevices;
  const deviceSettings = deviceSettingContext.deviceSettings;
  const thisDeviceParams = subDeviceParams.filter(
    param => param.deviceId === props.deviceId && param.paramName === 'status' && param.paramValue === 'on'
  );
  autoShutDownTime = deviceSettings.filter(setting => {
    const { paramValue, idType, paramName, bindedTo, type } = setting;
    return (
      bindedTo === props.deviceId &&
      paramName === 'autoShutDownTime' &&
      paramValue > 0 &&
      type === 'device' &&
      idType === 'deviceId'
    );
  })[0];

  const getEndTime = startTime => moment(startTime).add(autoShutDownTime.paramValue, 'minutes');

  const thisOnlineDevice = onlineDevices.filter(
    onlineDevice => onlineDevice && onlineDevice.bindedTo && onlineDevice.bindedTo === props.deviceId
  )[0];

  const getSubDeviceName = param => {
    const subDevice = subDevices.filter(subDevice => subDevice.subDeviceId === param.subDeviceId)[0];
    return subDevice ? subDevice.name : null;
  };

  const renderCountdown = param => {
    const subDeviceName = getSubDeviceName(param);
    if (thisOnlineDevice && subDeviceName) {
      return (
        <Typography component="div" color="primary" variant="body2" data-test="alertComponent">
          {subDeviceName} will be turned off automatically &nbsp;
          <strong>
            <CountDownTimer endTime={getEndTime(param.updatedAt)} />
          </strong>
        </Typography>
      );
    }
  };

  const renderAlert = () => {
    return (
      autoShutDownTime &&
      autoShutDownTime.paramValue &&
      thisDeviceParams.map(param => <div key={param.id}>{renderCountdown(param)}</div>)
    );
  };

  return <div data-test="alertContainer">{renderAlert()}</div>;
};

TankAlert.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default TankAlert;
