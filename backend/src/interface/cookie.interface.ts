import { Session, User } from "better-auth/types";

interface cookieInterface {
  session: Session;
  user: User;
}

export default cookieInterface;
