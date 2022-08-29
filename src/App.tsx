import { FormEvent } from 'react';
import './App.css';

function App() {
  function handleConvertSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (evt.currentTarget instanceof HTMLFormElement) {
      const mdInputElt = evt.currentTarget.elements.namedItem('md');
      const htmlOutputElt = evt.currentTarget.elements.namedItem('html');

      if (!(mdInputElt instanceof HTMLTextAreaElement)) {
        throw new Error('Input field not found.');
      }
      if (!(htmlOutputElt instanceof HTMLOutputElement)) {
        throw new Error('Output field not found.');
      }

      const mdInput = mdInputElt.value;
      htmlOutputElt.value = mdInput;
    }
  }

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
      <form className='mdToHTMLForm' onSubmit={handleConvertSubmit}>
        <textarea name='md' cols={80} rows={20}>
          {'# Sample Markdown\n\n' +
            '1. Enter some content here ...\n' +
            "2. ... and it'll be converted to HTML."}
        </textarea>
        <button type='submit'>Convert</button>
        <output name='html' />
      </form>
    </>
  );
}

export default App;
