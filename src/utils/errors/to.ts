export async function to<T, E = Error>(
  promise: Promise<T>,
): Promise<[null, T] | [E, null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}
