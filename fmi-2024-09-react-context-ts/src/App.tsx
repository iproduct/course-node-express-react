import React, { MouseEventHandler, PropsWithChildren, useContext } from 'react';
import './App.css';
import { ThemeContext, ThemeContextInterface, themes } from './context/theme-context';

type AppState = {
  theme: ThemeContextInterface;
};

class App extends React.Component<{}, AppState> {
  state: Readonly<AppState> = {
    theme: themes.dark,
  };
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
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>

        <Toolbar changeTheme={this.toggleTheme} />
      </>
    );
  }
}

type ToolbarProps = {
  changeTheme: () => void
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props: ToolbarProps) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <React.Fragment>
          <h3>
            Theme: {theme.name}
          </h3>
          <ThemedButton onClick={props.changeTheme}>
            Change Theme
          </ThemedButton>
          ;
        </React.Fragment>
      )}
    </ThemeContext.Consumer>
  )
}


type ThemedButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ThemedButton = ({ onClick, children }: PropsWithChildren<ThemedButtonProps>) => {
  // 3.3. DI using useContext()
  const theme = useContext(ThemeContext);
  return (
    <button
      onClick={onClick}
      style={{ color: theme.foreground, backgroundColor: theme.background }}
    >{children}</button>
  );
};

export default App;
