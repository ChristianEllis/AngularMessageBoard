//Data representation of a message (front end); mirrors backend
export class Message {
  constructor(public content: string,
              public username: string,
              public messageId?: string,
              public userId?: string) {
  }
}
