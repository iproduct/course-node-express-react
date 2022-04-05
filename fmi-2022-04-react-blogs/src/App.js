// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------
import './App.css';
import { useEffect, useState } from 'react';
import blogsApiClient from './service/blogs-api-client'

function App() {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState();
  const [errors, setErrors] = useState();
  useEffect(() => {
    (async () => {
      const fetchedPosts = await blogsApiClient.fetchPosts();
      setPosts(fetchedPosts);
    })();
  }, [])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router posts={posts} />
    </ThemeConfig>

  );
}

export default App;
