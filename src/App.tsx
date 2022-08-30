import MDToHTML from './MDToHTML';
import './App.css';

function App() {
  return (
    <>
      <hgroup>
        <h1>md2html</h1>
        <p>
          A markdown-to-HTML transpiler that support code block syntax
          highlighting.
        </p>
      </hgroup>
      <p>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Here's a placeholder paragraph with an <a href='#'>example link</a>.
      </p>
      <MDToHTML />
    </>
  );
}

export default App;
