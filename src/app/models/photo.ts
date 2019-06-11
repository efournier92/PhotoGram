export class Photo {
  id: string = '';
  ownerId: string = '';
  description: string = '';
  url: string = '';
  path: string = '';

  constructor(id?: string, description?: string, url?: string) {
    this.id = id;
    this.description = description;
    this.url = url;
  }
}
