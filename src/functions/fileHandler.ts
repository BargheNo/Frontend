export default async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    // You can set the mime type if you know it, or use blob.type
    return new File([blob], filename, { type: blob.type });
}