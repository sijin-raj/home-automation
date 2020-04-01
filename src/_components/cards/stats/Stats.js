import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AdbIcon from '@material-ui/icons/Adb';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  cursor: {
    cursor: 'pointer',
  },
}));
const Stats = props => {
  const classes = useStyles();
  const allLogs = useSelector(state => state.log && state.log.logs);
  const thisLogs = allLogs.filter(log => log.deviceId === props.deviceId);
  return (
    <CardContent className={classes.cardContent}>
      <List className={classes.root} subheader={<li />}>
        {thisLogs &&
          thisLogs.length &&
          thisLogs.map((log, index) => (
            <ListItem key={`${props.deviceId}-log-${index}`}>
              {log.triggeredByDevice && (
                <ListItemIcon className={classes.cursor}>
                  <Tooltip title="Action performed automatically by system">
                    <AdbIcon />
                  </Tooltip>
                </ListItemIcon>
              )}
              {!log.triggeredByDevice && (
                <ListItemIcon className={classes.cursor}>
                  <Tooltip title="Action performed manually by user">
                    <PermIdentityIcon />
                  </Tooltip>
                </ListItemIcon>
              )}
              <Typography key={log.id} component="div" color="textPrimary" variant="caption">
                {log.logDescription} by {log.triggeredByDevice ? 'system' : log.userName} <br /> -{' '}
                {moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss A')}
              </Typography>
            </ListItem>
          ))}
      </List>
    </CardContent>
  );
};

export default Stats;
