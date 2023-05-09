export function getSummary(text: string, maxLength: number) {
    let summary = text.slice(0, maxLength - 3);
    const lastSpaceIndex = summary.lastIndexOf(' ');
    summary = summary.slice(0, lastSpaceIndex);
    if(summary.length !== text.length) {
        summary += ' ...';
    }
    return summary;
}