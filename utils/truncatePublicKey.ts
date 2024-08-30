export function truncatePublicKey(
  publicKey: string,
  startLength = 4,
  endLength = 4
): string {
  if (publicKey.length <= startLength + endLength) {
    return publicKey;
  }
  return `${publicKey.slice(0, startLength)}...${publicKey.slice(-endLength)}`;
}
