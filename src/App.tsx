import MDToHTML from './MDToHTML';

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

      <MDToHTML />
    </>
  );
}

export default App;
