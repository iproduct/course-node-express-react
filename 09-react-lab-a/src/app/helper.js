import Remarkable from 'remarkable';

const markdown = new Remarkable();

export function getMarkdown(markdownMarkup) { 
    return {__html: markdown.render(markdownMarkup.toString())};
}

