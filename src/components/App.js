import React from 'react'

class App extends React.Component {
  isLogged = true;
  render() {
    if (!this.isLogged && this.props.location.pathname !== '/login') {
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/login?returnUrl='+this.props.location.pathname)
        } else {
            this.props.history.push('/login')
        }
        return <div></div>
    } else {
        return <div></div>
    }
  }
}
export default App