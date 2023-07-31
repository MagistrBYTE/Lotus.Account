export const openUrlToAnotherTab = (url: string) => 
{
  window.open(url, '_blank');
}

export const redirect = (url: string, openInNewTab = false) =>
{
  window.open(url, openInNewTab ? '_blank' : '_self');
} 
