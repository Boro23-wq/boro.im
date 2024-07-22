export function estimateReadingTime(content: string): string {
  const wordCount = getWordCount(content);
  const wordsPerMinute = 200; // Average reading speed
  const minutes = wordCount / wordsPerMinute;
  const roundedMinutes = Math.ceil(minutes); // Round up to the next whole minute

  return `${roundedMinutes} min read`;
}

function getWordCount(content: string): number {
  const words = content.trim().split(/\s+/);
  return words.length;
}
