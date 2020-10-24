import React, {useState} from 'react'
import {AppBar, Tabs, Tab} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const panelStyles=makeStyles(theme=>{
    return {
        root:{
            padding:theme.spacing(2,0)
        }
    }
})

function TabPanel(props){
    const classes=panelStyles()
    const {children, index, value, ...other}=props

    return <div className={classes.root} role="tabpanel" hidden={value!==index} id={`tab-panel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
        {value===index && children}
    </div>
}

TabPanel.propTypes={
children:PropTypes.node,
index:PropTypes.any.isRequired,
value:PropTypes.any.isRequired
}

function allyProps(index){
    return {
        id:`tab-${index}`,
        'aria-controls':`tabpanel-${index}`
    }
}

const useStyles=makeStyles(theme=>{
    return {
        root:{
            // flexGrow:1,
            // backgroundColor:theme.palette.background.paper
        }
    }
})

export default function CustomTabs(props){
    const classes=useStyles()
const [value, setValue]=useState(0)

const handleChange=(event, newValue)=>{
    setValue(newValue)
}

const {dataArray}=props

return <div className={classes.root}>
<AppBar position="relative">
    <Tabs value={value} onChange={handleChange} arial-label="tabs">
{dataArray.map((data, index)=>{
    return <Tab key={index} label={data.label} {...allyProps(index)} />
})}
{/* <Tab label="Item 2" {...allyProps(1)} />
<Tab label="Item 3" {...allyProps(2)} /> */}
    </Tabs>
</AppBar>
{dataArray.map((data, index)=>{
    return <TabPanel key={index} value={value} index={index} >
       {data.component}
    </TabPanel>
})}
{/* <TabPanel value={value} index={0}>
    <p>Tab panel 1</p>
</TabPanel>
<TabPanel value={value} index={1}>
    <p>Tab panel 2</p>
</TabPanel>
<TabPanel value={value} index={2}>
    <p>Tab panel 3</p>
</TabPanel> */}
</div>
}

CustomTabs.propTypes={
    dataArray:PropTypes.arrayOf(PropTypes.shape({
        label:PropTypes.string.isRequired,
        component:PropTypes.node.isRequired
    })),
    
}