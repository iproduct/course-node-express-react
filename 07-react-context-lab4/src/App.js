import React, { useContext } from 'react';
import './App.css';
import { ThemeContext, themes } from './theme-context';
import { UserContext } from './user-context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.dark,
      user: { name: 'Site Admin' },
    };
  }
  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  };

  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      //2. Provide value
      <React.Fragment>
        <UserContext.Provider value={this.state.user}>
          <ThemeContext.Provider value={this.state.theme}>
            <Toolbar changeTheme={this.toggleTheme} />
          </ThemeContext.Provider>
        </UserContext.Provider>

        <Toolbar changeTheme={this.toggleTheme} />
      </React.Fragment>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ThemeContext.Consumer>
          {(theme) => (
            <React.Fragment>
              <h3>
                Theme: {theme.name}, Logged User: {user.name}
              </h3>
              <ThemedButton onClick={props.changeTheme}>
                Change Theme
              </ThemedButton>
              ;
            </React.Fragment>
          )}
        </ThemeContext.Consumer>
      )}
    </UserContext.Consumer>
  );
}

// class ThemedButton extends React.Component {
//   // 3.1. Inject depency declarativrely using static property
//   // Assign a contextType to read the current theme context.
//   // React will find the closest theme Provider above and use its value.
//   // In this example, the current theme is "dark".
//   // static contextType = ThemeContext;
//   render() {
//     let props = this.props;
//     // let theme = this.context;
//     return (
//       // 3.2. DI using <ContextName.Consumer>
//       <ThemeContext.Consumer>
//         { theme => <button {...props} style={{ color: theme.foreground, backgroundColor: theme.background }} />}
//       </ThemeContext.Consumer>
//     );
//   }
// }

export const ThemedButton = (props) => {
  // 3.3. DI using useContext()
  const theme = useContext(ThemeContext);
  return (
    <button
      {...props}
      style={{ color: theme.foreground, backgroundColor: theme.background }}
    />
  );
};

export default App;
