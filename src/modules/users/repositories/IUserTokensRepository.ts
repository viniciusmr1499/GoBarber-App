import { Generated } from "typeorm"
import UserToken from "../infra/typeorm/entities/UserToken";

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
    generate(user_id: string): Promise<UserToken>;
}
