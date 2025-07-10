export function getParam(searchParams: URLSearchParams, defaultValue: string = "HomeScreen"): string {
  return searchParams.get("page") || defaultValue;
}