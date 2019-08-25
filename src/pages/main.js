import React from 'react'
import { Grid, Header, } from 'semantic-ui-react'


const MainPage = () => {
  return (
    <Grid
      style={{ width: '100%', margin: '0px', padding: '0px 20%', height: "100vh" }}
      textAlign='center'
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Main page
        </Header>
      </Grid.Column>
    </Grid>
  )
}


export default MainPage