export function findMatch(originalText, inputText) {
  const text = originalText.toLowerCase();
  let match = inputText.toLowerCase();
  let index = text.indexOf(match);

  let highlightedText = (
    <strong style={{ backgroundColor: "yellow" }}>
      {originalText.slice(index, index + match.length)}
    </strong>
  );
  let result = (
    <>
      {originalText.slice(0, index)}
      {highlightedText}
      {originalText.slice(index + match.length, originalText.length)}
    </>
  );

  return result;
}
