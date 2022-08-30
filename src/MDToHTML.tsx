import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { type FormEvent, useState, ChangeEvent } from 'react';
import './MDToHTML.css';

const DEFAULT_INPUT =
  '# Sample Markdown\n\n' +
  '1. Enter some content here ...\n' +
  "2. ... and it'll be converted to HTML.\n\n" +
  '```ts\n' +
  'function sayHi(name: string): string {\n' +
  // eslint-disable-next-line no-template-curly-in-string
  '  return `Hi, ${name}.`;\n' +
  '}\n\n' +
  "console.log(sayHi('Person'));\n" +
  '```\n';

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

function MDToHTML() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [doHighlighting, setDoHighlighting] = useState(true);
  const [output, setOutput] = useState('');

  function handleInputMDChange(evt: ChangeEvent<HTMLTextAreaElement>): void {
    setInput(evt.currentTarget.value);
  }

  function handleDoHighlightingChange(
    evt: ChangeEvent<HTMLInputElement>
  ): void {
    setDoHighlighting(!doHighlighting);
  }

  function handleConvertSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault();

    const htmlOutput = convertMDToHTML(input, doHighlighting);
    setOutput(htmlOutput);
  }

  return (
    <form className='mdToHTMLForm' onSubmit={handleConvertSubmit}>
      <label htmlFor='inputMD'>Input (Markdown):</label>
      <textarea
        name='inputMD'
        value={input}
        onChange={handleInputMDChange}
        cols={80}
        rows={20}
        id='inputMD'
      />
      <input
        name='highlight'
        type='checkbox'
        checked={doHighlighting}
        onChange={handleDoHighlightingChange}
        id='highlight'
      />
      <label htmlFor='highlight'>Highlight syntax in code blocks</label>
      <button type='submit'>Convert</button>
      <label htmlFor='outputHTML'>Output (HTML):</label>
      <pre>
        <code>
          <output name='outputHTML' id='outputHTML'>
            {output}
          </output>
        </code>
      </pre>
    </form>
  );
}

export default MDToHTML;
