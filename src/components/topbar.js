/**
 * Created by clementmondion on 17/12/2017.
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
    Sidebar,
    Segment,
    Menu,
    Icon,
    Header,
    Image,
    Input,
    Select,
    Button,
} from 'semantic-ui-react'

class TopBar extends Component {
    render() {
        return (
            <Sidebar as={Menu} animation='push' direction='top' visible={true} inverted color="blue">
                <Menu.Item header style={{width: 150}} as={Link} to='/'>
                    <Header textAlign="center" style={{width: 150}} as="h4">
                        CALLISTO
                    </Header>
                </Menu.Item>
                <Menu.Item name='projects' as={Link} to='/projects'>
                    <Icon name='cubes'/>
                    Projects
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item name='messages'>
                        <Input size='mini' icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item name='messages' as={Link} to='/messages'>
                        <Icon name='mail outline'/>
                    </Menu.Item>
                    <Menu.Item style={{padding: "0px 16px"}} name='user' as={Link} to='/profile'>
                        <Image src="user.png" size="mini" circular/>
                        Frank
                    </Menu.Item>
                </Menu.Menu>
            </Sidebar>
        )
    }
}

export default TopBar