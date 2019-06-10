export interface AuthRoles {
  user: boolean;
  admin?: boolean;
  super?: boolean;
}

export class User {
  id: string;
  name: string;
  email: string;
  roles: AuthRoles;
  dateRegistered: Date = new Date();
  isEditable: boolean;

  constructor(authData: any) {
    this.id = authData.uid;
    this.name = authData.displayName;
    this.email = authData.email;
    this.roles = { user: true };
  }
}
