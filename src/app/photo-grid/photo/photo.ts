export class Photo {
  id: string = '';
  description: string = '';
  url: string = '';

  constructor(id: string, description: string, url: string) {
    this.id = id;
    this.description = description;
    this.url = url;
  }
}
