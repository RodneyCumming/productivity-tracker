import React, { useState } from "react";

import styled from 'styled-components';

import "./App.css";

// Pages
import TodoList from "./pages/TodoList";
import Goals from "./pages/Goals";
import ProductivityForm from "./pages/ProductivityForm";
import PushNotifications from "./pages/PushNotifications";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
// import Link from '@material-ui/core/Link';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const StyledListItem = styled(ListItem)`
  &:hover {
    background: #3f4461;
  }
`;


const drawerWidth = 240;

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#1869aa',
    padding: '0px 20px',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    background: '#1e2a3a',
    color: 'white',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    background: '#1e2a3a',
    color: 'white',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    width: `100%`,
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Router>
       <CssBaseline />
       <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            // color="white"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon style={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Productivity Hub
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div 
        className={classes.drawerHeader}
        >
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon  style={{ color: 'white' }}/> : <ChevronRightIcon  />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{
            linkPath: '/dashboard',
            label: 'Dashboard'
            }, {
            linkPath: '/productivityForm',
            label: 'Habits'
            }, {
            linkPath: '/todo',
            label: 'Todo List'
            }, {
            linkPath: '/goals',
            label: 'Goals'
            }, {
            linkPath: '/pushNotifications',
            label: 'Notifications'
            }
            ].map(({label, linkPath}, index) => (
            <Link to={linkPath} key={label}>
              <StyledListItem button >
                <ListItemIcon style={{ color: 'white' }}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={label} />
              </StyledListItem>
            </Link>
          ))}
        </List>
  
      </Drawer>


        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
          style={{left: '240px', marginTop: '64px', padding: '0'}}
        >
        <Switch>
          <Route path="/pushNotifications">
            <PushNotifications />
          </Route>
          <Route path="/todo">
            <TodoList />
          </Route>
          <Route path="/goals">
            <Goals />
          </Route>
          <Route path="/productivityForm">
            <ProductivityForm />
          </Route>
        </Switch>
        </main>

    </Router>
  );
}

export default App;


// Todo: Add gym routine generator
// Todo: Home lights
// Todo: Month in review
// Book, Audiobook, TV, Movies
// News and videos feed
// Blog / research