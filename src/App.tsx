import { FormEvent } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import './App.css';

function convertMDToHTML(md: string, doHighlighting = true): string {
  function highlight(str: string, lang: string) {
    if (!lang || !hljs.getLanguage(lang)) {
      return '';
    }

    try {
      return (
        `<pre class="hljs"><code class="language-${lang}">` +
        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
        '</code></pre>'
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const parserRenderer = new MarkdownIt({
    xhtmlOut: true,
    highlight: doHighlighting ? highlight : null,
  });

  const htmlOutput = parserRenderer.render(md);

  return htmlOutput;
}

function App() {
  function handleConvertSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    if (evt.currentTarget instanceof HTMLFormElement) {
      const mdInputElt = evt.currentTarget.elements.namedItem('md');
      const htmlOutputElt = evt.currentTarget.elements.namedItem('html');
      const highlightElt = evt.currentTarget.elements.namedItem('highlight');

      if (!(mdInputElt instanceof HTMLTextAreaElement)) {
        throw new Error('Input field not found.');
      }
      if (!(htmlOutputElt instanceof HTMLOutputElement)) {
        throw new Error('Output field not found.');
      }
      if (
        !(
          highlightElt instanceof HTMLInputElement &&
          highlightElt.type === 'checkbox'
        )
      ) {
        throw new Error('Highlight checkbox not found.');
      }

      const mdInput = mdInputElt.value;
      htmlOutputElt.value = convertMDToHTML(mdInput, highlightElt.checked);
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
        <textarea
          name='md'
          cols={80}
          rows={20}
          defaultValue={
            '# Sample Markdown\n\n' +
            '1. Enter some content here ...\n' +
            "2. ... and it'll be converted to HTML.\n\n" +
            '```ts\n' +
            'function sayHi(name: string): string {\n' +
            // eslint-disable-next-line no-template-curly-in-string
            '  return `Hi, ${name}.`;\n' +
            '}\n\n' +
            "console.log(sayHi('Person'));\n" +
            '```\n'
          }
        />
        <input
          type='checkbox'
          name='highlight'
          id='highlight'
          defaultChecked={true}
        />
        <label htmlFor='highlight'>Highlight syntax in code blocks</label>
        <button type='submit'>Convert</button>
        <pre>
          <code>
            <output name='html' />
          </code>
        </pre>
      </form>
    </>
  );
}

export default App;
