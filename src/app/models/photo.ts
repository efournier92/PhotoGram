export class Photo {
  id: string = '';
  ownerId: string = '';
  description: string = '';
  url: string = '';
  path: string = '';

  constructor(id?: string, ownerId?: string, description?: string, url?: string, path?: string) {
    this.id = id;
    this.ownerId = ownerId;
    this.description = description;
    this.url = url;
    this.path = path;
    this.path = path;
  }
}
