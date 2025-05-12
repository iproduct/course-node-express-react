import React, { useContext, type ReactNode } from 'react';
import './App.css';
import { ThemeContext, themes, type Theme } from './theme-context';
import { UserContext, type LoggedUser } from './user-context';

interface AppState {
  theme: Theme,
  user: LoggedUser
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
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
interface ToolbarProps {
  changeTheme: () => void
}

function Toolbar(props: ToolbarProps) {
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

interface ThemedButtonProps {
  onClick: () => void
  children: ReactNode
}

export const ThemedButton = ({onClick, children}: ThemedButtonProps) => {
  // 3.3. DI using useContext()
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  return (
    <button
      onClick={onClick}
      style={{ color: theme.foreground, backgroundColor: theme.background }}
    >{children} for {user.name} </button>
  );
};

export default App;
